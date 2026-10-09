import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {productDrafts} from '../js/product-drafts.mjs';

test('all uploaded product photos are grouped once and exist at their original paths',()=>{
  const photos=productDrafts.flatMap(product=>product.photos);
  assert.equal(productDrafts.length,19);
  assert.equal(photos.length,25);
  assert.equal(new Set(photos).size,25);
  for(const filename of photos) {
    const original=new URL('../img/'+encodeURIComponent(filename),import.meta.url);
    assert.ok(fs.statSync(original).size>0,filename);
    const optimized=filename.endsWith('.webp')?original:new URL('../img/'+encodeURIComponent(filename+'.webp'),import.meta.url);
    const bytes=fs.readFileSync(optimized);
    assert.equal(bytes.subarray(0,4).toString(),'RIFF',filename);
    assert.equal(bytes.subarray(8,12).toString(),'WEBP',filename);
  }
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
  const appleJuice=byTitle.Süssmost.displayVariants;
  const fiveL=appleJuice.find(variant=>variant.label==='5 Liter');
  const tenL=appleJuice.find(variant=>variant.label==='10 Liter');
  assert.ok(tenL.imageScale > fiveL.imageScale);
  assert.equal(tenL.imageScaleX, undefined);
  assert.equal(tenL.imageScaleY, undefined);
  assert.equal(byTitle['Geschenksharassli · mittel'].description.includes('halben gedörrten Birnen (100 g)'),true);
  assert.equal(byTitle['Geschenksharass · gross'].previewPrice,undefined);
  for (const ingredient of ['Kirschen-Birnen-Essig (250 ml)', 'halb gedörrte Birnen (100 g)', 'Dessertzwetschgen (250 ml)', 'Tomatensauce (250 ml)', 'Birnen-Balsamico (250 ml)', 'Himbeeressig (250 ml)', 'Birnenweggen']) assert.ok(byTitle['Geschenksharass · gross'].description.includes(ingredient),ingredient);
});


test('every vinegar and balsamic product is confirmed as 250 ml',()=>{
  const vinegars=productDrafts.filter(product=>product.type==='Essig & Balsamico');
  assert.equal(vinegars.length,7);
  for(const product of vinegars) {
    assert.equal(product.netVolumeMl,250,product.title);
    assert.deepEqual(product.sizes,['250 ml'],product.title);
  }
});

test('gift crates link included products to their available photos',()=>{
  const byTitle=Object.fromEntries(productDrafts.map(product=>[product.title,product]));
  for(const title of ['Es Tröpfli Heimat','Geschenksharassli · mittel','Geschenksharass · gross']) {
    const items=byTitle[title].includedProducts;
    assert.ok(items.length>0,title);
    for(const item of items) {
      assert.ok(item.productTitle,`${title}: ${item.label} has no product photo link`);
      assert.ok(byTitle[item.productTitle]?.photos?.length,item.label);
    }
  }
  assert.deepEqual(byTitle['Geschenksharass · gross'].includedProducts.slice(-2).map(item=>item.label),['Birnenweggen','Himbeeressig']);
  assert.equal(byTitle['Es Tröpfli Heimat'].description,'Drei Fläschchen à 250 ml: Himbeeressig, Birnen-Balsamico und Kirschessig. Im kleinen Holzharassli mit Masche.');
  assert.deepEqual(byTitle['Es Tröpfli Heimat'].includedProducts[0],{label:'Himbeeressig',productTitle:'Himbeeressig'});
});

