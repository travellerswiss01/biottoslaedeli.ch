import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync(new URL('../js/shopify-cart.js',import.meta.url),'utf8');
function setup(saved=null,blocked=false){
  const state=new Map(saved===null?[]:[['biottos-cart-v1',saved]]),assigned=[];
  const storage={getItem:k=>state.get(k)??null,setItem:(k,v)=>state.set(k,v)};
  const window={location:{assign:url=>assigned.push(url)}};
  Object.defineProperty(window,'localStorage',{get(){if(blocked)throw new Error('Storage denied');return storage}});
  vm.runInNewContext(source,{window});return {bridge:window.BiottosShopify,state,assigned};
}
test('mixed cart retains quantities across page loads and builds one confirmed Shopify cart',()=>{
  const a=setup();assert.equal(a.bridge.addToCart('chili',2),true);assert.equal(a.bridge.addToCart('gross',1),true);assert.equal(a.bridge.addToCart('chili',1),true);
  const b=setup(a.state.get('biottos-cart-v1'));
  assert.equal(b.bridge.buildMixedCartUrl(b.bridge.getCart()),'https://biottoslaedeli.myshopify.com/cart/53868017549578:3,53868017647882:1?storefront=true');
  assert.equal(b.bridge.setQuantity('gross',4),true);b.bridge.removeFromCart('chili');
  assert.equal(b.bridge.buildMixedCartUrl(b.bridge.getCart()),'https://biottoslaedeli.myshopify.com/cart/53868017647882:4?storefront=true');
});
test('checkout rejects draft products, untrusted variants and invalid or excessive quantities',()=>{
  const {bridge}=setup();
  for(const items of [[],null,[{key:'photo-draft-1',quantity:1}],[{key:'__proto__',quantity:1}],[{key:'gross',quantity:0}],[{key:'gross',quantity:1.5}],[{key:'gross',quantity:1000}],[{key:'gross',quantity:999},{key:'gross',quantity:1}]])assert.equal(bridge.buildMixedCartUrl(items),null);
  assert.equal(bridge.addToCart('gross',999),true);assert.equal(bridge.addToCart('gross',1),false);assert.equal(bridge.setQuantity('gross',-2),false);
});
test('corrupted saved carts never inject prices, images, or unsupported products',()=>{
  assert.equal(setup('not JSON').bridge.getCart().length,0);
  const {bridge}=setup(JSON.stringify({version:1,items:[{key:'evil',quantity:1},{key:'chili',quantity:2,unitCents:1,photo:'javascript:alert(1)'}]}));
  assert.equal(bridge.getCart().length,1);assert.equal(bridge.products[0].unitCents,1995);
  assert.equal(bridge.getCart()[0].unitCents,undefined);
});
test('storage denial retains an in-page cart and preserves direct Shopify navigation fallback',()=>{
  const {bridge,assigned}=setup(null,true);assert.equal(bridge.addToCart('chili',1),true);assert.equal(bridge.getCart().length,1);assert.equal(bridge.storageAvailable(),false);
  assert.equal(bridge.openCart('gross',1),true);assert.equal(assigned[0],bridge.buildMixedCartUrl(bridge.getCart()));
});
test('regular product selection goes through the shared cart without creating a Shopify order',()=>{
  const {bridge,assigned}=setup();assert.equal(bridge.openCart('fein',1),true);assert.deepEqual(assigned,['warenkorb.html']);assert.equal(bridge.getCart()[0].key,'fein');
});

test('failed storage writes preserve all selected items within the current page',()=>{
  const window={localStorage:{getItem(){return JSON.stringify({version:1,items:[{key:'chili',quantity:1}]})},setItem(){throw new Error('Quota exceeded')}},location:{assign(){}}};
  vm.runInNewContext(source,{window});const bridge=window.BiottosShopify;
  assert.equal(bridge.addToCart('gross',1),true);assert.equal(bridge.getCart().length,2);assert.equal(bridge.storageAvailable(),false);
});
