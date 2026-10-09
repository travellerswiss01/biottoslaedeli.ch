import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const cards = [...html.matchAll(/<article class="korb-card ([^"]+)">([\s\S]*?)<\/article>/g)];

test('three basket cards show official names, prices and every item before optional details', () => {
  assert.equal(cards.length, 3);
  const expected = [
    {name: 'Chli &amp; Fii', count: 3, price: 'CHF 19.95', open: 'chili', items: ['Biottos Himbeeressig', 'Gedörrte Zwetschgen', 'Biottos Birnen-Balsamico']},
    {name: 'Fein &amp; Guet', count: 5, price: 'CHF 29.95', open: 'fein', items: ['Biottos Tomatensauce', 'Biottos Birnenessig', 'Biottos Kirschenbalsamico', 'Biottos Dessertzwetschgen', 'Biottos Dörrbirnen']},
    {name: 'Gross &amp; Guet', count: 6, price: 'CHF 49.95', open: 'gross', items: ['Biottos Goldmelissensirup', 'Biottos Tomatensauce', 'Biottos Birnenweggen', 'Biottos Birnel', 'Biottos Dörrzwetschgen', 'Biottos Himbeeressig']},
  ];
  cards.forEach(([, size, card], index) => {
    const item = expected[index];
    assert.match(card, new RegExp(`<h3>${item.name}<\\/h3>`));
    assert.ok(card.includes(item.price));
    assert.match(card, new RegExp(`${item.count} Spezialitäten im Korb`));
    const contents = card.match(/<section class="korb-card-contents"[^>]*>([\s\S]*?)<\/section>/);
    assert.ok(contents, item.name);
    assert.ok(card.indexOf(contents[0]) < card.indexOf('<details class="korb-card-more">'), 'contents remain visible before the optional photo disclosure');
    const listed = [...contents[1].matchAll(/<li>(.*?)<\/li>/g)].map(([, value]) => value);
    assert.deepEqual(listed, item.items, item.name);
    assert.match(card, new RegExp(`data-open="${item.open}"`));
    assert.match(card, /<img[^>]+role="button"[^>]+tabindex="0"[^>]+aria-haspopup="dialog"/);
  });
});

test('basket overview keeps its plain-language heading and all six photos', () => {
  assert.match(html, /<h2>Geschenkskörbe auf einen Blick<\/h2>/);
  const overview = html.match(/<div class="korb-picker-grid">([\s\S]*?)<section class="order-guide"/);
  assert.ok(overview);
  const photos=[...overview[1].matchAll(/<img\b([^>]+)>/g)];
  assert.equal(photos.length, 6);
  assert.ok(photos.every(([,attributes])=>/role="button"/.test(attributes)&&/tabindex="0"/.test(attributes)&&/aria-haspopup="dialog"/.test(attributes)));
  assert.match(html, /<div class="lb" id="lb"[^>]+role="dialog"/);
});
