import test from 'node:test';
import assert from 'node:assert/strict';
import {createCartBridge} from '../js/shopify-cart.js';

function setup(saved=null,blocked=false){
  const state=new Map(saved===null?[]:[['biottos-cart-v1',saved]]),assigned=[];
  const storage={getItem:key=>state.get(key)??null,setItem:(key,value)=>state.set(key,value)};
  const window={location:{assign:url=>assigned.push(url)}};
  Object.defineProperty(window,'localStorage',{get(){if(blocked)throw new Error('Storage denied');return storage}});
  const bridge=createCartBridge(window);
  return {bridge,state,assigned};
}

test('all published Shopify variants use their current IDs and CHF prices',()=>{
  const {bridge}=setup();
  assert.equal(bridge.products.length,22);
  assert.equal(new Set(bridge.products.map(product=>product.key)).size,22);
  for(const [key,price] of [['chili',2900],['fein',3900],['gross',7490],['apfelessig-33-sorten',1500],['suessmost-10l',2300],['traubensaft-1l',900]]) {
    const product=bridge.products.find(item=>item.key===key);
    assert.ok(product,key);assert.equal(product.unitCents,price,key);
    assert.ok(bridge.buildCartUrl(key,1),key);
  }
  assert.equal(bridge.buildCartUrl('chili',1),'https://biottoslaedeli.myshopify.com/cart/53868017549578:1?storefront=true');
});

test('mixed cart retains quantities across page loads and builds a direct Shopify checkout link',()=>{
  const a=setup();assert.equal(a.bridge.addToCart('chili',2),true);assert.equal(a.bridge.addToCart('gross',1),true);assert.equal(a.bridge.addToCart('chili',1),true);
  const b=setup(a.state.get('biottos-cart-v1'));
  assert.equal(b.bridge.buildMixedCartUrl(b.bridge.getCart()),'https://biottoslaedeli.myshopify.com/cart/53868017549578:3,53868017647882:1');
  assert.equal(b.bridge.setQuantity('gross',4),true);b.bridge.removeFromCart('chili');
  assert.equal(b.bridge.buildMixedCartUrl(b.bridge.getCart()),'https://biottoslaedeli.myshopify.com/cart/53868017647882:4');
});

test('unlisted variants, untrusted keys and invalid quantities cannot enter checkout',()=>{
  const {bridge}=setup();
  const giftOnly=bridge.products.filter(product=>['chili','fein','gross'].includes(product.key));
  const restricted=createCartBridge({location:{assign(){}}},giftOnly);
  for(const key of ['apfelessig-33-sorten','suessmost-3l','traubensaft-05l','__proto__'])assert.equal(restricted.addToCart(key,1),false);
  for(const key of ['unknown-product','__proto__'])assert.equal(bridge.addToCart(key,1),false);
  for(const items of [[],null,[{key:'photo-draft-1',quantity:1}],[{key:'__proto__',quantity:1}],[{key:'gross',quantity:0}],[{key:'gross',quantity:1.5}],[{key:'gross',quantity:1000}],[{key:'gross',quantity:999},{key:'gross',quantity:1}]])assert.equal(bridge.buildMixedCartUrl(items),null);
  assert.equal(bridge.addToCart('gross',999),true);assert.equal(bridge.addToCart('gross',1),false);assert.equal(bridge.setQuantity('gross',-2),false);
});

test('corrupted saved carts never inject prices, images, or unsupported products',()=>{
  assert.equal(setup('not JSON').bridge.getCart().length,0);
  const {bridge}=setup(JSON.stringify({version:1,items:[{key:'evil',quantity:1},{key:'chili',quantity:2,unitCents:1,photo:'javascript:alert(1)'}]}));
  assert.equal(bridge.getCart().length,1);assert.equal(bridge.products.find(product=>product.key==='chili').unitCents,2900);
  assert.equal(bridge.getCart()[0].unitCents,undefined);
});

test('storage denial retains the cart in memory and navigates directly to Shopify',()=>{
  const {bridge,assigned}=setup(null,true);assert.equal(bridge.addToCart('chili',1),true);assert.equal(bridge.getCart().length,1);assert.equal(bridge.storageAvailable(),false);
  assert.equal(bridge.openCart('gross',1),true);assert.equal(assigned[0],bridge.buildMixedCartUrl(bridge.getCart()));
});

test('product links use the shared cart and do not create an order',()=>{
  const {bridge,assigned}=setup();assert.equal(bridge.openCart('fein',1),true);assert.deepEqual(assigned,['warenkorb.html']);assert.equal(bridge.getCart()[0].key,'fein');
});

test('failed storage writes preserve selected items in memory',()=>{
  const window={localStorage:{getItem(){return JSON.stringify({version:1,items:[{key:'chili',quantity:1}]})},setItem(){throw new Error('Quota exceeded')}},location:{assign(){}}};
  const bridge=createCartBridge(window);
  assert.equal(bridge.addToCart('gross',1),true);assert.equal(bridge.getCart().length,2);assert.equal(bridge.storageAvailable(),false);
});
