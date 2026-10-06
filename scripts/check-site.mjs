import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ignored = new Set([".git", "node_modules", ".vercel"]);
const errors = [];
const htmlFiles = [];
const jsFiles = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignored.has(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.isFile()) {
      const relative = path.relative(root, fullPath).split(path.sep).join("/");
      if (entry.name.endsWith(".html")) htmlFiles.push(relative);
      if (entry.name.endsWith(".js")) jsFiles.push(relative);
    }
  }
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function decode(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

walk(root);
const htmlInfo = new Map();

for (const file of htmlFiles) {
  const source = read(file);
  const ids = new Set();
  const idPattern = /\bid\s*=\s*(["'])(.*?)\1/gi;
  const namePattern = /\bname\s*=\s*(["'])(.*?)\1/gi;

  for (const match of source.matchAll(idPattern)) {
    const id = match[2];
    if (ids.has(id)) errors.push(`${file}: duplicate id "${id}"`);
    ids.add(id);
  }
  for (const match of source.matchAll(namePattern)) ids.add(match[2]);
  htmlInfo.set(file, { source, ids });
}

for (const file of htmlFiles) {
  const { source } = htmlInfo.get(file);
  const attrPattern = /\b(?:href|src|poster|action)\s*=\s*(["'])(.*?)\1/gi;

  for (const match of source.matchAll(attrPattern)) {
    const raw = match[2].trim();
    if (!raw || /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(raw)) continue;

    const hashIndex = raw.indexOf("#");
    const queryIndex = raw.indexOf("?");
    let end = raw.length;
    if (hashIndex !== -1) end = Math.min(end, hashIndex);
    if (queryIndex !== -1) end = Math.min(end, queryIndex);
    const pathname = decode(raw.slice(0, end));
    const hash = hashIndex === -1 ? "" : decode(raw.slice(hashIndex + 1).split("?")[0]);

    let target;
    if (!pathname) {
      target = path.resolve(root, file);
    } else if (pathname.startsWith("/")) {
      target = path.join(root, pathname.slice(1));
    } else {
      target = path.resolve(root, path.dirname(file), pathname);
    }

    if (pathname.endsWith("/")) target = path.join(target, "index.html");
    if (!path.extname(target) && fs.existsSync(target) && fs.statSync(target).isDirectory()) {
      target = path.join(target, "index.html");
    }

    if (!target.startsWith(root + path.sep) && target !== root) {
      errors.push(`${file}: reference escapes site root: ${raw}`);
      continue;
    }

    if (!fs.existsSync(target)) {
      errors.push(`${file}: missing local target "${raw}"`);
      continue;
    }

    if (hash && target.endsWith(".html")) {
      const targetRelative = path.relative(root, target).split(path.sep).join("/");
      const targetInfo = htmlInfo.get(targetRelative);
      if (targetInfo && !targetInfo.ids.has(hash)) {
        errors.push(`${file}: missing anchor "#${hash}" in "${targetRelative}"`);
      }
    }
  }
}

for (const file of jsFiles) {
  const result = spawnSync(process.execPath, ["--check", path.join(root, file)], {
    encoding: "utf8"
  });
  if (result.status !== 0) {
    errors.push(`${file}: JavaScript syntax check failed\n${result.stderr || result.stdout}`);
  }
}

if (errors.length) {
  console.error(`Site checks failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Site checks passed: ${htmlFiles.length} HTML file(s), ${jsFiles.length} JavaScript file(s), local references and anchors checked.`);
}
