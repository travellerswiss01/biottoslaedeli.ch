import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {productDrafts} from '../js/product-drafts.mjs';

test('all uploaded product photos are grouped once and exist at their original paths',()=>{
  const photos=productDrafts.flatMap(product=>product.photos);
  assert.equal(productDrafts.length,17);
  assert.equal(photos.length,24);
  assert.equal(new Set(photos).size,24);
  for(const filename of photos) assert.ok(fs.existsSync(new URL('../img/'+encodeURIComponent(filename),import.meta.url)),filename);
});
test('draft products have no fabricated prices, stock or Shopify IDs',()=>{
  for(const product of productDrafts) {
    assert.equal(product.price,null);assert.equal(product.stock,null);
    assert.equal(product.shopifyProductId,null);assert.equal(product.confirmed,false);
    if(product.sizes) assert.equal(product.sizes.length,product.photos.length);
  }
});
