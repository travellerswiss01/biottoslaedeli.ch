import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { checkSite } from './check-site.mjs';
function fixture(t, files) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'biottos-check-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  for (const [name, content] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(root, name)), { recursive: true });
    fs.writeFileSync(path.join(root, name), content);
  }
  return root;
}
test('detects missing story, preview and CSS images', (t) => {
  const root = fixture(t, {
    'index.html':
      '<meta property="og:image" content="https://biottoslaedeli.ch/img/Mostaufstuhl.jpeg">',
    'js/app.js': 'var story=["img/obstbäume.jpeg","img/laden-fruechte.jpg"];',
    'css/style.css': 'body{background:url(../img/background.jpg)}',
  });
  const errors = checkSite(root).errors;
  for (const name of [
    'Mostaufstuhl.jpeg',
    'obstbäume.jpeg',
    'laden-fruechte.jpg',
    'background.jpg',
  ])
    assert.ok(
      errors.some((e) => e.includes(name)),
      name,
    );
});
test('accepts encoded assets, queries, own-domain URLs, anchors, external and data URLs', (t) => {
  const root = fixture(t, {
    'index.html':
      '<div id="korb"></div><a href="#korb">Korb</a><img src="img/%C3%A4pfel.jpg?v=1"><img src="data:image/png;base64,AAAA"><a href="https://example.com/missing">Extern</a><meta property="og:url" content="https://biottoslaedeli.ch/">',
    'img/äpfel.jpg': '',
    'js/app.js': 'var photo="img/äpfel.jpg";',
    'css/style.css': 'body{background:url(../img/%C3%A4pfel.jpg)}',
  });
  assert.deepEqual(checkSite(root).errors, []);
});
test('detects invalid anchors, duplicate IDs and invalid structured data', (t) => {
  const root = fixture(t, {
    'index.html':
      '<div id="a"></div><div id="a"></div><a href="#absent">Link</a><script type="application/ld+json">{oops}</script>',
  });
  assert.equal(checkSite(root).errors.length, 3);
});


test('routes valid product CTAs through the Shopify cart bridge', () => {
  const helperPath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../js/shopify-cart.js',
  );
  const assigned = [];
  const context = { window: { location: { assign(url) { assigned.push(url); } } } };
  vm.runInNewContext(fs.readFileSync(helperPath, 'utf8'), context);
  const bridge = context.window.BiottosShopify;
  assert.equal(bridge.enabled, true);
  for (const [key, variant] of Object.entries({
    gross: '53868017647882',
    fein: '53868017582346',
    chili: '53868017549578',
  })) {
    assert.equal(
      bridge.buildCartUrl(key, 1),
      `https://biottoslaedeli.myshopify.com/cart/${variant}:1?storefront=true`,
    );
  }
  for (const quantity of [0, -1, 1.5, NaN, Infinity]) {
    assert.equal(bridge.buildCartUrl('chili', quantity), null);
  }
  assert.equal(bridge.buildCartUrl('unknown', 1), null);
  assert.equal(bridge.openCart('chili', 1), true);
  assert.deepEqual(assigned, [
    'https://biottoslaedeli.myshopify.com/cart/53868017549578:1?storefront=true',
  ]);
});

test('keeps the Formspree fallback and all product CTAs wired', () => {
  const indexPath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../index.html',
  );
  const html = fs.readFileSync(indexPath, 'utf8');
  assert.match(html, /action="https:\/\/formspree\.io\/f\/xvkgydoe"/);
  assert.ok(html.indexOf('js/shopify-cart.js') < html.indexOf('js/app.js'));
  for (const key of ['chili', 'fein', 'gross']) {
    assert.match(html, new RegExp(`data-open="${key}"`));
  }
});
