import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const origin = 'https://biottoslaedeli.ch';
const decode = (v) => {
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
};
export function checkSite(root) {
  root = path.resolve(root);
  const files = [],
    errors = [],
    html = new Map();
  function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (
        e.isDirectory() &&
        ['.git', 'node_modules', '.vercel'].includes(e.name)
      )
        continue;
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (/\.(html|css|js|mjs|xml)$/.test(e.name))
        files.push(path.relative(root, full));
    }
  }
  walk(root);
  for (const file of files.filter((f) => f.endsWith('.html'))) {
    const source = fs.readFileSync(path.join(root, file), 'utf8'),
      ids = new Set();
    for (const m of source.matchAll(/\bid\s*=\s*(["'])(.*?)\1/gi)) {
      if (ids.has(m[2])) errors.push(`${file}: duplicate id "${m[2]}"`);
      ids.add(m[2]);
    }
    html.set(file, { source, ids });
  }
  function reference(file, raw, fromRoot = false) {
    raw = raw.trim().replace(/&amp;/g, '&');
    if (!raw) return;
    let url;
    try {
      url = new URL(
        raw,
        `${origin}/${fromRoot ? 'index.html' : file.split(path.sep).join('/')}`,
      );
    } catch {
      errors.push(`${file}: invalid reference "${raw}"`);
      return;
    }
    if (url.origin !== origin) return;
    const pathname = decode(url.pathname);
    let target = path.resolve(root, '.' + pathname);
    if (target !== root && !target.startsWith(root + path.sep)) {
      errors.push(`${file}: reference escapes site root "${raw}"`);
      return;
    }
    if (
      pathname.endsWith('/') ||
      (fs.existsSync(target) && fs.statSync(target).isDirectory())
    )
      target = path.join(target, 'index.html');
    if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
      errors.push(`${file}: missing local target "${raw}"`);
      return;
    }
    if (/\.(png|jpe?g|webp|avif|svg)$/i.test(target) && fs.statSync(target).size === 0) errors.push(`${file}: empty image target "${raw}"`);
    const info = html.get(path.relative(root, target));
    if (url.hash && info && !info.ids.has(decode(url.hash.slice(1))))
      errors.push(
        `${file}: missing anchor "${url.hash}" in "${path.relative(root, target)}"`,
      );
  }
  function jsonRefs(file, v) {
    if (Array.isArray(v)) v.forEach((x) => jsonRefs(file, x));
    else if (v && typeof v === 'object')
      Object.entries(v).forEach(([k, x]) => {
        if (['url', 'image', 'contentUrl'].includes(k) && typeof x === 'string')
          reference(file, x);
        else jsonRefs(file, x);
      });
  }
  for (const file of files) {
    const source = fs.readFileSync(path.join(root, file), 'utf8');
    if (file.endsWith('.html')) {
      for (const m of source.matchAll(
        /\b(?:href|src|poster|action)\s*=\s*(["'])(.*?)\1/gi,
      ))
        reference(file, m[2]);
      for (const m of source.matchAll(/\bsrcset\s*=\s*(["'])(.*?)\1/gi))
        if (!m[2].startsWith('data:'))
          m[2]
            .split(',')
            .forEach((v) => reference(file, v.trim().split(/\s+/)[0]));
      for (const m of source.matchAll(/<meta\b[^>]*>/gi)) {
        const a = Object.fromEntries(
          [...m[0].matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/g)].map((x) => [
            x[1].toLowerCase(),
            x[3],
          ]),
        );
        if (
          /^(og:(image|url)|twitter:image)$/.test(a.property || a.name || '') &&
          a.content
        )
          reference(file, a.content);
      }
      for (const m of source.matchAll(
        /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
      )) {
        try {
          jsonRefs(file, JSON.parse(m[1]));
        } catch {
          errors.push(`${file}: invalid structured-data JSON`);
        }
      }
    }
    if (file.endsWith('.css') || file.endsWith('.html')) {
      for (const m of source.matchAll(/url\(\s*(["']?)([^)'"\s]+)\1\s*\)/gi))
        reference(file, m[2]);
      if (file.endsWith('.css'))
        for (const m of source.matchAll(/@import\s+(["'])(.*?)\1/gi))
          reference(file, m[2]);
    }
    // Browser asset paths resolve against the document, not js/app.js.
    // Keep complete literal paths: dynamic concatenation is not evaluated.
    if ((file.endsWith('.js') || file.endsWith('.mjs')) && !file.startsWith('scripts' + path.sep))
      for (const m of source.matchAll(
        /(["'`])((?:\.?\/?img\/|https?:\/\/biottoslaedeli\.ch\/)[^"'`]+)\1/g,
      ))
        reference(file, m[2], true);
    if (file.endsWith('.xml'))
      for (const m of source.matchAll(/<loc>(.*?)<\/loc>/g))
        reference(file, m[1]);
    if (/\.(js|mjs)$/.test(file)) {
      const r = spawnSync(
        process.execPath,
        ['--check', path.join(root, file)],
        { encoding: 'utf8' },
      );
      if (r.status !== 0)
        errors.push(
          `${file}: JavaScript syntax check failed\n${r.stderr || r.stdout}`,
        );
    }
  }
  return { errors: [...new Set(errors)], files: files.length };
}
if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const r = checkSite(
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'),
  );
  if (r.errors.length) {
    console.error(
      `Site checks failed with ${r.errors.length} issue(s):\n${r.errors.map((e) => '- ' + e).join('\n')}`,
    );
    process.exitCode = 1;
  } else
    console.log(
      `Site checks passed: ${r.files} source files; HTML, CSS, literal JS assets, metadata, sitemap, anchors and JavaScript syntax checked.`,
    );
}

