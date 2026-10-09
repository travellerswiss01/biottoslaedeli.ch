import {cartProducts} from './shopify-product-data.mjs';

export function createCartBridge(targetWindow, products=cartProducts, options={}) {
  const config=Object.freeze({enabled:options.enabled!==false,storeUrl:'https://biottoslaedeli.myshopify.com',storefront:true});
  const orderable=Object.freeze(products.map(product=>Object.freeze({...product})));
  const byKey=new Map(orderable.map(product=>[product.key,product]));
  const storageKey='biottos-cart-v1';
  let memoryCart=[],storageAvailable=true;
  function validKey(key){return byKey.has(key)}
  function validQuantity(quantity){return Number.isSafeInteger(quantity)&&quantity>=1&&quantity<=999}
  function buildCartUrl(key,quantity){
    if(!validKey(key))return null;
    const count=Number(quantity);
    if(!validQuantity(count))return null;
    const product=byKey.get(key);
    return config.storeUrl+'/cart/'+product.variantId+':'+count+'?storefront=true';
  }
  function buildMixedCartUrl(items){
    if(!Array.isArray(items)||!items.length)return null;
    const totals=new Map();
    for(const item of items){
      if(!item||!validKey(item.key)||!validQuantity(item.quantity))return null;
      totals.set(item.key,(totals.get(item.key)||0)+item.quantity);
      if(!validQuantity(totals.get(item.key)))return null;
    }
    return config.storeUrl+'/cart/'+[...totals].map(([key,quantity])=>byKey.get(key).variantId+':'+quantity).join(',')+'?storefront=true';
  }
  function sanitize(items){
    if(!Array.isArray(items))return [];
    const result=[];
    for(const item of items){
      if(!item||!validKey(item.key)||!validQuantity(item.quantity))continue;
      const existing=result.find(row=>row.key===item.key);
      if(existing)existing.quantity=Math.min(999,existing.quantity+item.quantity);
      else result.push({key:item.key,quantity:item.quantity});
    }
    return result;
  }
  function getCart(){
    if(!storageAvailable)return memoryCart.map(item=>({...item}));
    try{
      if(targetWindow.localStorage){
        const saved=targetWindow.localStorage.getItem(storageKey);
        if(saved!==null){try{const payload=JSON.parse(saved);memoryCart=payload.version===1?sanitize(payload.items):[]}catch{memoryCart=[]}}
      }else storageAvailable=false;
    }catch{storageAvailable=false}
    return memoryCart.map(item=>({...item}));
  }
  function saveCart(items){
    memoryCart=sanitize(items);
    try{if(targetWindow.localStorage)targetWindow.localStorage.setItem(storageKey,JSON.stringify({version:1,items:memoryCart}));else storageAvailable=false}catch{storageAvailable=false}
    return getCart();
  }
  function addToCart(key,quantity){
    const count=Number(quantity);
    if(!validKey(key)||!validQuantity(count))return false;
    const items=getCart(),existing=items.find(item=>item.key===key);
    if(existing){if(existing.quantity+count>999)return false;existing.quantity+=count}
    else items.push({key,quantity:count});
    saveCart(items);return true;
  }
  function setQuantity(key,quantity){
    if(!validKey(key)||!validQuantity(quantity))return false;
    const items=getCart(),item=items.find(row=>row.key===key);
    if(!item)return false;
    item.quantity=quantity;saveCart(items);return true;
  }
  function removeFromCart(key){saveCart(getCart().filter(item=>item.key!==key))}
  const bridge={enabled:config.enabled,products:orderable,buildCartUrl,buildMixedCartUrl,getCart,addToCart,setQuantity,removeFromCart,
    storageAvailable:()=>storageAvailable,openCart(key,quantity){
      if(!config.enabled)return false;
      const url=buildCartUrl(key,quantity);if(!url)return false;
      addToCart(key,Number(quantity));
      targetWindow.location.assign(storageAvailable?'warenkorb.html':buildMixedCartUrl(getCart())||url);
      return true;
    }};
  targetWindow.BiottosShopify=bridge;
  const document=targetWindow.document;
  function bindProductLinks(){
    if(!config.enabled||!document)return;
    document.querySelectorAll('a[data-shopify-cart]').forEach(link=>{
      if(validKey(link.dataset.shopifyCart))link.href='warenkorb.html?korb='+encodeURIComponent(link.dataset.shopifyCart);
    });
  }
  if(document){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindProductLinks,{once:true});else bindProductLinks()}
  return bridge;
}

if(typeof window!=='undefined')createCartBridge(window);
