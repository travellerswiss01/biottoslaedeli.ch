// Shopify catalog snapshot checked on 2026-10-09.
// All 19 active Shopify products are published to Online Store.
// Prices and variant IDs are copied from Shopify. Stock is intentionally not
// used here because product and location totals disagree for crates.
export const shopifyProducts = Object.freeze([
  {title:'Apfelessig · 33 Sorten',id:'gid://shopify/Product/10662550634762',published:true,photo:'img/Biottos Apfelessig 33 Sorten.png',variants:[{key:'apfelessig-33-sorten',variantId:'53884956311818',priceCents:1500}]},
  {title:'Birnenessig',id:'gid://shopify/Product/10662550667530',published:true,photo:'img/Birnenessig.png',variants:[{key:'birnenessig',variantId:'53884956344586',priceCents:850}]},
  {title:'Birnen-Balsamico',id:'gid://shopify/Product/10662550700298',published:true,photo:'img/Birnen-Balsamico.png',variants:[{key:'birnen-balsamico',variantId:'53884956377354',priceCents:1450}]},
  {title:'Kirschen-Birnen-Essig',id:'gid://shopify/Product/10662550733066',published:true,photo:'img/Kirschen-Birnen-Essig.png',variants:[{key:'kirschen-birnen-essig',variantId:'53884956410122',priceCents:950}]},
  {title:'Holunderblütenessig',id:'gid://shopify/Product/10662550798602',published:true,photo:'img/Holunderblütenessig.png',variants:[{key:'holunderbluetenessig',variantId:'53884956475658',priceCents:1050}]},
  {title:'Kirschessig',id:'gid://shopify/Product/10662550831370',published:true,photo:'img/Kirschessig.png',variants:[{key:'kirschessig',variantId:'53884956508426',priceCents:950}]},
  {title:'Birnel',id:'gid://shopify/Product/10662550864138',published:true,photo:'img/Birnel.png',variants:[{key:'birnel',variantId:'53884956541194',priceCents:1050}]},
  {title:'Tomatensauce',id:'gid://shopify/Product/10662550896906',published:true,photo:'img/Tomatensauce.png',variants:[{key:'tomatensauce',variantId:'53884956573962',priceCents:650}]},
  {title:'Dessertzwetschgen',id:'gid://shopify/Product/10662550929674',published:true,photo:'img/Dessertzwetschgen.png',variants:[{key:'dessertzwetschgen',variantId:'53884956606730',priceCents:750}]},
  {title:'Gedörrte Birnen · ganz',id:'gid://shopify/Product/10662550962442',published:true,photo:'img/Cellophanetüte mit ganzen getrockneten Birnen.png',variants:[{key:'gedoerrte-birnen-ganz',variantId:'53884956672266',priceCents:600}]},
  {title:'Gedörrte Birnen · halb',id:'gid://shopify/Product/10662550995210',published:true,photo:'img/Gedörrte Birnen halb Becher.jpg',variants:[{key:'gedoerrte-birnen-halb',variantId:'53884956803338',priceCents:350}]},
  {title:'Gedörrte Zwetschgen',id:'gid://shopify/Product/10662551027978',published:true,photo:'img/Gedörrte Zwetschgen Becher.png',variants:[{key:'gedoerrte-zwetschgen',variantId:'53884956836106',priceCents:400}]},
  {title:'Süssmost',id:'gid://shopify/Product/10662551060746',published:true,photo:'img/Süssmost3Liter.png',variants:[
    {label:'3 Liter',key:'suessmost-3l',photo:'img/Süssmost3Liter.png',variantId:'53884956868874',priceCents:850},
    {label:'5 Liter',key:'suessmost-5l',photo:'img/Süssmost Bag in Box 5Liter.png',variantId:'53884956901642',priceCents:1300},
    {label:'10 Liter',key:'suessmost-10l',photo:'img/Süssmost pasteurisiert 10 Liter.png',variantId:'53884956934410',priceCents:2300}
  ]},
  {title:'Traubensaft',id:'gid://shopify/Product/10662551093514',published:true,photo:'img/TraubensafthalbLiter.png',variants:[
    {label:'0.5 Liter',key:'traubensaft-05l',photo:'img/TraubensafthalbLiter.png',variantId:'53884956967178',priceCents:500},
    {label:'1 Liter',key:'traubensaft-1l',photo:'img/Traubensaft1Liter.png',variantId:'53884956999946',priceCents:900}
  ]},
  {title:'Birnenweggen',id:'gid://shopify/Product/10662551126282',published:true,photo:'img/Birnenweggen.png',variants:[{key:'birnenweggen',variantId:'53884957032714',priceCents:1100}]},
  {title:'Himbeeressig',id:'gid://shopify/Product/10662551159050',published:true,photo:'img/Himbeeressig.png',variants:[{key:'himbeeressig',variantId:'53884957065482',priceCents:990}]},
  {title:'Es Tröpfli Heimat',id:'gid://shopify/Product/10659082797322',published:true,photo:'img/Essigharassli.png',variants:[{key:'chili',variantId:'53868017549578',priceCents:2900}]},
  {title:'Geschenksharassli · mittel',displayTitle:'Maischhauser Harass',id:'gid://shopify/Product/10659082830090',published:true,photo:'img/Geschenkharassli mittel.png',variants:[{key:'fein',variantId:'53868017582346',priceCents:3900}]},
  {title:'Geschenksharass · gross',displayTitle:'Guntershauser Harass',id:'gid://shopify/Product/10659082895626',published:true,photo:'img/Geschenksharass-gross-komplett.webp',variants:[{key:'gross',variantId:'53868017647882',priceCents:7490}]}
].map(product=>Object.freeze({...product,variants:Object.freeze(product.variants.map(variant=>Object.freeze(variant)))})));

export const cartProducts = Object.freeze(shopifyProducts.flatMap(product=>product.variants
  .filter(variant=>product.published===true)
  .map(variant=>Object.freeze({key:variant.key,title:product.title,displayTitle:product.displayTitle||product.title,unitCents:variant.priceCents,
    variantLabel:variant.label||null,unitLabel:['chili','fein','gross'].includes(variant.key)?'pro Harass':variant.label?'pro '+variant.label:'pro Stück',
    photo:variant.photo||product.photo,variantId:variant.variantId,productId:product.id}))));
