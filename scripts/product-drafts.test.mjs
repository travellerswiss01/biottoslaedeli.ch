import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {productDrafts} from '../js/product-drafts.mjs';
import {shopifyProducts} from '../js/shopify-product-data.mjs';

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
test('all preview products are joined to a current Shopify product and variant',()=>{
  for(const product of productDrafts) {
    assert.match(product.shopifyProductId,/^gid:\/\/shopify\/Product\/\d+$/);
    assert.equal(product.confirmed,true);
    assert.ok(product.shopifyVariants.length>0,product.title);
    assert.ok(product.shopifyVariants.every(variant=>Number.isSafeInteger(variant.priceCents)),product.title);
    if(product.displayVariants) {
      for(const variant of product.displayVariants) assert.ok(product.photos.includes(variant.photo));
    }
  }
});
test('confirmed prices and juice sizes match the Shopify snapshot',()=>{
  const byTitle=Object.fromEntries(productDrafts.map(product=>[product.title,product]));
  for(const [title,price] of [
    ['Tomatensauce',650],['Birnel',1050],['Dessertzwetschgen',750],
    ['Gedörrte Birnen · ganz',600],['Gedörrte Birnen · halb',350],
    ['Gedörrte Zwetschgen',400],['Apfelessig · 33 Sorten',1500],
    ['Kirschen-Birnen-Essig',950],['Es Tröpfli Heimat',2900],
    ['Geschenksharassli · mittel',3900],['Geschenksharass · gross',7490]
  ]) assert.equal(byTitle[title].shopifyPriceCents,price,title);
  assert.deepEqual(byTitle.Traubensaft.shopifyVariants.map(({label,priceCents})=>[label,priceCents]),[['0.5 Liter',500],['1 Liter',900]]);
  const appleJuice=byTitle.Süssmost.displayVariants;
  const fiveL=appleJuice.find(variant=>variant.label==='5 Liter');
  const tenL=appleJuice.find(variant=>variant.label==='10 Liter');
  assert.ok(tenL.imageScale > fiveL.imageScale);
  assert.equal(tenL.imageScaleX, undefined);
  assert.equal(tenL.imageScaleY, undefined);
  assert.equal(byTitle['Geschenksharassli · mittel'].description.includes('halben gedörrten Birnen (100 g)'),true);
  assert.equal(byTitle['Geschenksharass · gross'].shopifyPriceCents,7490);
  for (const ingredient of ['Kirschen-Birnen-Essig (250 ml)', 'halb gedörrte Birnen (100 g)', 'Dessertzwetschgen (250 ml)', 'Tomatensauce (250 ml)', 'Birnen-Balsamico (250 ml)', 'Himbeeressig (250 ml)', 'Birnenweggen']) assert.ok(byTitle['Geschenksharass · gross'].description.includes(ingredient),ingredient);
});

test('all 19 active products are published and mapped for checkout',()=>{
  assert.equal(shopifyProducts.length,19);
  assert.equal(new Set(shopifyProducts.map(product=>product.id)).size,19);
  assert.ok(shopifyProducts.every(product=>product.published===true));
  assert.ok(shopifyProducts.every(product=>product.variants.every(variant=>variant.key && variant.variantId && Number.isSafeInteger(variant.priceCents))));
});


test('every vinegar and balsamic product is confirmed as 250 ml',()=>{
  const vinegars=productDrafts.filter(product=>product.type==='Essig & Balsamico');
  assert.equal(vinegars.length,7);
  for(const product of vinegars) {
    assert.equal(product.netVolumeMl,250,product.title);
    assert.deepEqual(product.sizes,['250 ml'],product.title);
  }
});

test('gift crate preview names differ from the unchanged Shopify product titles',()=>{
  const byTitle=Object.fromEntries(productDrafts.map(product=>[product.title,product]));
  assert.equal(byTitle['Geschenksharassli · mittel'].displayTitle,'Maischhauser Harass');
  assert.equal(byTitle['Geschenksharass · gross'].displayTitle,'Guntershauser Harass');
  assert.equal(shopifyProducts.find(product=>product.title==='Geschenksharassli · mittel')?.title,'Geschenksharassli · mittel');
  assert.equal(shopifyProducts.find(product=>product.title==='Geschenksharass · gross')?.title,'Geschenksharass · gross');
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

