import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
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
