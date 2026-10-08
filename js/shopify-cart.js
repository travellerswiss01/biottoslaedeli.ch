(function(window){
  "use strict";

  /*
   * Shopify migration gate. Native Shopify pickup was signed off with the
   * marked QA order #1003. The branch preview may now route product CTAs to
   * the Shopify cart; live publication and Formspree removal stay separate.
   */
  var config=Object.freeze({
    enabled:true,
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
    var base=config.storeUrl.replace(/\/+$/,'');
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
