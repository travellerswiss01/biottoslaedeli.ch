import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const cards = [...html.matchAll(/<article class="korb-card ([^"]+)">([\s\S]*?)<\/article>/g)];

test('three published gift crates show their Shopify names, prices and complete contents', () => {
  assert.equal(cards.length, 3);
  const expected = [
    {name: 'Es Tröpfli Heimat', count: 3, price: 'CHF 29.00', key: 'chili', items: ['Himbeeressig · 250 ml', 'Birnen-Balsamico · 250 ml', 'Kirschessig · 250 ml']},
    {name: 'Maischhauser Harass', count: 5, price: 'CHF 39.00', key: 'fein', items: ['Tomatensauce · 250 ml', 'Kirschen-Birnen-Essig · 250 ml', 'Kirschessig · 250 ml', 'Dessertzwetschgen · 250 ml', 'Halb gedörrte Birnen · 100 g']},
    {name: 'Guntershauser Harass', count: 7, price: 'CHF 74.90', key: 'gross', items: ['Kirschen-Birnen-Essig · 250 ml', 'Halb gedörrte Birnen · 100 g', 'Dessertzwetschgen · 250 ml', 'Tomatensauce · 250 ml', 'Birnen-Balsamico · 250 ml', 'Birnenweggen · 360 g', 'Himbeeressig · 250 ml']},
  ];
  cards.forEach(([, size, card], index) => {
    const item = expected[index];
    assert.match(card, new RegExp(`<h3>${item.name}<\\/h3>`));
    assert.ok(card.includes(item.price));
    assert.match(card, new RegExp(`${item.count} (?:Spezialitäten|Fläschchen à 250 ml)`, 'i'));
    const contents = card.match(/<section class="korb-card-contents"[^>]*>([\s\S]*?)<\/section>/);
    assert.ok(contents, item.name);
    const listed = [...contents[1].matchAll(/<li>(.*?)<\/li>/g)].map(([, value]) => value.replace(/<[^>]*>/g, '').trim());
    assert.deepEqual(listed, item.items, item.name);
    assert.match(card, new RegExp(`data-open="${item.key}"`));
    assert.match(card, /<img[^>]+role="button"[^>]+tabindex="0"[^>]+aria-haspopup="dialog"/);
  });
});

test('basket overview keeps its plain-language heading and enlargable Shopify photos', () => {
  assert.equal((html.match(/class="korb-card-link"[^>]*>Korb wählen/g) || []).length, 3);
  assert.ok(html.includes('<h2>Ein Stück Thurgau zum Verschenken</h2>'));
  const overview = html.match(/<div class="korb-picker-grid">([\s\S]*?)<section class="order-guide"/);
  assert.ok(overview);
  const photos=[...overview[1].matchAll(/<img\b([^>]+)>/g)];
  assert.equal(photos.length, 3);
  assert.ok(photos.every(([,attributes])=>/role="button"/.test(attributes)&&/tabindex="0"/.test(attributes)&&/aria-haspopup="dialog"/.test(attributes)));
  assert.match(html, /<div class="lb" id="lb"[^>]+role="dialog"/);
});
