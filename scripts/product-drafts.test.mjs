import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {productDrafts} from '../js/product-drafts.mjs';

test('all uploaded product photos are grouped once and exist at their original paths',()=>{
  const photos=productDrafts.flatMap(product=>product.photos);
  assert.equal(productDrafts.length,17);
  assert.equal(photos.length,23);
  assert.equal(new Set(photos).size,23);
  for(const filename of photos) assert.ok(fs.existsSync(new URL('../img/'+encodeURIComponent(filename),import.meta.url)),filename);
});
test('draft products keep preview guide prices separate from Shopify prices and stock',()=>{
  for(const product of productDrafts) {
    assert.equal(product.price,null);assert.equal(product.stock,null);
    assert.equal(product.shopifyProductId,null);assert.equal(product.confirmed,false);
    if(product.previewPrices) assert.equal(product.previewPrices.length,product.sizes.length);
    if(product.previewPrice != null) assert.ok(Number.isFinite(product.previewPrice) && product.previewPrice > 0);
    if(product.displayVariants) {
      for(const variant of product.displayVariants) assert.ok(product.photos.includes(variant.photo));
    }
  }
});
test('agreed guide prices appear in the assortment preview',()=>{
  const byTitle=Object.fromEntries(productDrafts.map(product=>[product.title,product]));
  for(const [title,price] of [
    ['Tomatensauce',6.5],['Birnel',10.5],['Dessertzwetschgen',7.5],
    ['Gedörrte Birnen · ganz',6],['Gedörrte Birnen · halb',3.5],
    ['Gedörrte Zwetschgen',4],['Apfelessig · 33 Sorten',15],
    ['Kirschen-Birnen-Essig',9.5],['Es Tröpfli Heimat',29],
    ['Geschenksharassli · mittel',39]
  ]) assert.equal(byTitle[title].previewPrice,price,title);
  assert.deepEqual(byTitle.Traubensaft.displayVariants.map(({label,previewPrice})=>[label,previewPrice]),[['0.5 Liter',5],['1 Liter',9]]);
  assert.equal(byTitle['Geschenksharass · gross'].previewPrice,undefined);
});

