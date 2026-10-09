(function(window){
  'use strict';
  // Only confirmed existing Shopify variants belong here. Draft assortment
  // items deliberately have no mapping until product data and prices are approved.
  var config=Object.freeze({enabled:true,storeUrl:'https://biottoslaedeli.myshopify.com',storefront:true,variants:Object.freeze({gross:'53868017647882',fein:'53868017582346',chili:'53868017549578'})});
  var products=Object.freeze([
    Object.freeze({key:'chili',title:'Chli & Fii',unitCents:1995,photo:'img/chili-vorne.jpg'}),
    Object.freeze({key:'fein',title:'Fein & Guet',unitCents:2995,photo:'img/fein-vorne.jpg'}),
    Object.freeze({key:'gross',title:'Gross & Guet',unitCents:4995,photo:'img/gross-vorne.jpg'})
  ]);
  var storageKey='biottos-cart-v1',memoryCart=[],storageAvailable=true;
  function validKey(key){return Object.prototype.hasOwnProperty.call(config.variants,key)}
  function validQuantity(quantity){return Number.isSafeInteger(quantity)&&quantity>=1&&quantity<=999}
  function buildCartUrl(key,quantity){
    if(!validKey(key))return null;
    var count=Number(quantity);
    if(!validQuantity(count))return null;
    return config.storeUrl+'/cart/'+config.variants[key]+':'+count+'?storefront=true';
  }
  function buildMixedCartUrl(items){
    if(!Array.isArray(items)||!items.length)return null;
    var totals=Object.create(null);
    for(var item of items){
      if(!item||!validKey(item.key)||!validQuantity(item.quantity))return null;
      totals[item.key]=(totals[item.key]||0)+item.quantity;
      if(!validQuantity(totals[item.key]))return null;
    }
    return config.storeUrl+'/cart/'+Object.keys(totals).map(function(key){return config.variants[key]+':'+totals[key]}).join(',')+'?storefront=true';
  }
  function sanitize(items){
    if(!Array.isArray(items))return [];
    var result=[];
    for(var item of items){
      if(!item||!validKey(item.key)||!validQuantity(item.quantity))continue;
      var existing=result.find(function(row){return row.key===item.key});
      if(existing)existing.quantity=Math.min(999,existing.quantity+item.quantity);
      else result.push({key:item.key,quantity:item.quantity});
    }
    return result;
  }
  function getCart(){
    try{
      if(window.localStorage){
        var saved=window.localStorage.getItem(storageKey);
        if(saved!==null){var payload=JSON.parse(saved);memoryCart=payload.version===1?sanitize(payload.items):[]}
      }else storageAvailable=false;
    }catch(_){storageAvailable=false}
    return memoryCart.map(function(item){return {key:item.key,quantity:item.quantity}});
  }
  function saveCart(items){
    memoryCart=sanitize(items);
    try{if(window.localStorage)window.localStorage.setItem(storageKey,JSON.stringify({version:1,items:memoryCart}));else storageAvailable=false}catch(_){storageAvailable=false}
    return getCart();
  }
  function addToCart(key,quantity){
    var count=Number(quantity);
    if(!validKey(key)||!validQuantity(count))return false;
    var items=getCart(),existing=items.find(function(item){return item.key===key});
    if(existing){if(existing.quantity+count>999)return false;existing.quantity+=count}
    else items.push({key:key,quantity:count});
    saveCart(items);return true;
  }
  function setQuantity(key,quantity){
    if(!validKey(key)||!validQuantity(quantity))return false;
    var items=getCart(),item=items.find(function(row){return row.key===key});
    if(!item)return false;
    item.quantity=quantity;saveCart(items);return true;
  }
  function removeFromCart(key){saveCart(getCart().filter(function(item){return item.key!==key}))}
  var bridge={enabled:config.enabled,products:products,buildCartUrl:buildCartUrl,buildMixedCartUrl:buildMixedCartUrl,getCart:getCart,addToCart:addToCart,setQuantity:setQuantity,removeFromCart:removeFromCart,storageAvailable:function(){return storageAvailable},openCart:function(key,quantity){
    if(!config.enabled)return false;
    var url=buildCartUrl(key,quantity);if(!url)return false;
    if(addToCart(key,Number(quantity))&&storageAvailable)window.location.assign('warenkorb.html');
    else window.location.assign(url);
    return true;
  }};
  window.BiottosShopify=bridge;
  var document=window.document;
  function bindProductLinks(){
    if(!config.enabled)return;
    document.querySelectorAll('a[data-shopify-cart]').forEach(function(link){
      if(validKey(link.dataset.shopifyCart))link.href='warenkorb.html?korb='+encodeURIComponent(link.dataset.shopifyCart);
    });
  }
  if(document){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindProductLinks,{once:true});else bindProductLinks()}
})(window);
