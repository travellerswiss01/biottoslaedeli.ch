// Shopify catalog snapshot checked on 2026-10-09.
// Only the three gift-crate products are published to Online Store today.
// Prices and variant IDs are copied from Shopify; stock is intentionally not
// used by the preview because product and location totals disagree for crates.
export const shopifyProducts = Object.freeze([
  {title:'Apfelessig · 33 Sorten',id:'gid://shopify/Product/10662550634762',variants:[{variantId:'53884956311818',priceCents:1500}]},
  {title:'Birnenessig',id:'gid://shopify/Product/10662550667530',variants:[{variantId:'53884956344586',priceCents:850}]},
  {title:'Birnen-Balsamico',id:'gid://shopify/Product/10662550700298',variants:[{variantId:'53884956377354',priceCents:1450}]},
  {title:'Kirschen-Birnen-Essig',id:'gid://shopify/Product/10662550733066',variants:[{variantId:'53884956410122',priceCents:950}]},
  {title:'Holunderblütenessig',id:'gid://shopify/Product/10662550798602',variants:[{variantId:'53884956475658',priceCents:1050}]},
  {title:'Kirschessig',id:'gid://shopify/Product/10662550831370',variants:[{variantId:'53884956508426',priceCents:950}]},
  {title:'Birnel',id:'gid://shopify/Product/10662550864138',variants:[{variantId:'53884956541194',priceCents:1050}]},
  {title:'Tomatensauce',id:'gid://shopify/Product/10662550896906',variants:[{variantId:'53884956573962',priceCents:650}]},
  {title:'Dessertzwetschgen',id:'gid://shopify/Product/10662550929674',variants:[{variantId:'53884956606730',priceCents:750}]},
  {title:'Gedörrte Birnen · ganz',id:'gid://shopify/Product/10662550962442',variants:[{variantId:'53884956672266',priceCents:600}]},
  {title:'Gedörrte Birnen · halb',id:'gid://shopify/Product/10662550995210',variants:[{variantId:'53884956803338',priceCents:350}]},
  {title:'Gedörrte Zwetschgen',id:'gid://shopify/Product/10662551027978',variants:[{variantId:'53884956836106',priceCents:400}]},
  {title:'Süssmost',id:'gid://shopify/Product/10662551060746',variants:[
    {label:'3 Liter',key:'suessmost-3l',variantId:'53884956868874',priceCents:850},
    {label:'5 Liter',key:'suessmost-5l',variantId:'53884956901642',priceCents:1300},
    {label:'10 Liter',key:'suessmost-10l',variantId:'53884956934410',priceCents:2300}
  ]},
  {title:'Traubensaft',id:'gid://shopify/Product/10662551093514',variants:[
    {label:'0.5 Liter',key:'traubensaft-05l',variantId:'53884956967178',priceCents:500},
    {label:'1 Liter',key:'traubensaft-1l',variantId:'53884956999946',priceCents:900}
  ]},
  {title:'Birnenweggen',id:'gid://shopify/Product/10662551126282',variants:[{variantId:'53884957032714',priceCents:1100}]},
  {title:'Himbeeressig',id:'gid://shopify/Product/10662551159050',variants:[{variantId:'53884957065482',priceCents:990}]},
  {title:'Es Tröpfli Heimat',id:'gid://shopify/Product/10659082797322',published:true,photo:'Essigharassli.png',variants:[{key:'chili',variantId:'53868017549578',priceCents:2900}]},
  {title:'Geschenksharassli · mittel',displayTitle:'Maischhauser Harass',id:'gid://shopify/Product/10659082830090',published:true,photo:'Geschenkharassli mittel.png',variants:[{key:'fein',variantId:'53868017582346',priceCents:3900}]},
  {title:'Geschenksharass · gross',displayTitle:'Guntershauser Harass',id:'gid://shopify/Product/10659082895626',published:true,photo:'Geschenksharass-gross-komplett.webp',variants:[{key:'gross',variantId:'53868017647882',priceCents:7490}]}
].map(product=>Object.freeze({...product,variants:Object.freeze(product.variants.map(variant=>Object.freeze(variant)))})));

export const cartProducts = Object.freeze(shopifyProducts.flatMap(product=>product.variants
  .filter(variant=>product.published===true)
  .map(variant=>Object.freeze({key:variant.key,title:product.title,displayTitle:product.displayTitle||product.title,unitCents:variant.priceCents,
    photo:variant.photo||product.photo,variantId:variant.variantId,productId:product.id}))));
