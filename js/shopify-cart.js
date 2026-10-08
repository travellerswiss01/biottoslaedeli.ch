(function(window){
  "use strict";

  /*
   * Shopify migration gate. Keep this disabled until the target storefront
   * theme loads Pickeasy from a fresh session and the checkout/no-show tests
   * are signed off. This keeps the existing Formspree order path intact.
   */
  var config=Object.freeze({
    enabled:false,
    storeUrl:"https://biottoslaedeli.myshopify.com",
    storefront:true,
    variants:Object.freeze({
      gross:"53868017647882",
      fein:"53868017582346",
      chili:"53868017549578"
    })
  });

  function buildCartUrl(key,quantity){
    var variant=config.variants[key],count=Number(quantity);
    if(!variant||!Number.isInteger(count)||count<1)return null;
    var base=config.storeUrl.replace(/\\/+$/,'');
    return base+"/cart/"+variant+":"+count+(config.storefront?"?storefront=true":"");
  }

  window.BiottosShopify={
    enabled:config.enabled,
    buildCartUrl:buildCartUrl,
    openCart:function(key,quantity){
      if(!config.enabled)return false;
      var url=buildCartUrl(key,quantity);
      if(!url)return false;
      window.location.assign(url);
      return true;
    }
  };
})(window);
