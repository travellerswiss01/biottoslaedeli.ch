// Operator-confirmed facts from the handover, 2026-10-09 Europe/Zurich.
// Reported stock is NOT live Shopify inventory. Unknown food data stays null.
const confirmedFacts = {
  "Apfelessig · 33 Sorten": {
    "netVolumeMl": 250,
    "reportedStock": 5,
    "ingredients": "Vergorener Apfelsaft mit Essigmutter",
    "operatorNotes": "33 Apfelsorten aus eigener Ernte, 2025; Herstellung durch Helena"
  },
  "Birnenessig": {
    "netVolumeMl": 250,
    "reportedStock": 10,
    "ingredients": "Vergorener Birnensaft mit Essigmutter, keine weiteren Zutaten",
    "operatorNotes": "Herstellung durch Helena"
  },
  "Birnen-Balsamico": {
    "netVolumeMl": 250,
    "reportedStock": 5,
    "ingredients": "Wie Birnenessig: vergorener Birnensaft mit Essigmutter",
    "operatorNotes": "Sehr kräftig; Herstellung durch Helena"
  },
  "Holunderblütenessig": {
    "netVolumeMl": 250,
    "reportedStock": 5,
    "ingredients": "Apfelessig und Holunderblüten",
    "operatorNotes": "Herstellung durch Helena"
  },
  "Kirschen-Birnen-Essig": {
    "netVolumeMl": 250,
    "reportedStock": 5,
    "ingredients": "Birnenessig und Kirschen",
    "operatorNotes": "Eigene Produktion; Herstellung durch Helena"
  },
  "Kirschessig": {
    "netVolumeMl": 250,
    "reportedStock": 5,
    "ingredients": "Apfelessig und Kirschen",
    "operatorNotes": "Herstellung durch Helena"
  },
  "Himbeeressig": {
    "netVolumeMl": 250
  },
  "Birnel": {
    "netVolumeMl": 250,
    "reportedStock": 10,
    "ingredients": "Ausschliesslich eingekochter Birnensaft",
    "operatorNotes": "Birnendicksaft"
  },
  "Tomatensauce": {
    "netVolumeMl": 250,
    "reportedStock": 20,
    "ingredients": "Sonnengereifte Tomaten aus eigenem Garten, Salz",
    "operatorNotes": ""
  },
  "Dessertzwetschgen": {
    "netVolumeMl": 250,
    "reportedStock": 10,
    "ingredients": "Zwetschgen, Zucker, Zimt",
    "operatorNotes": ""
  }
};

// Local photo and description grouping joined to the Shopify snapshot below.
// Shopify remains authoritative for product IDs, prices, and publication state.
import {shopifyProducts} from './shopify-product-data.mjs';
const shopifyByTitle=new Map(shopifyProducts.map(product=>[product.title,product]));
export const productDrafts = [
  {title:'Apfelessig · 33 Sorten',type:'Essig & Balsamico',photos:['Biottos Apfelessig 33 Sorten.png'],sizes:['250 ml']},
  {title:'Birnenessig',type:'Essig & Balsamico',photos:['Birnenessig.png'],sizes:['250 ml']},
  {title:'Birnen-Balsamico',type:'Essig & Balsamico',photos:['Birnen-Balsamico.png'],sizes:['250 ml']},
  {title:'Holunderblütenessig',type:'Essig & Balsamico',photos:['Holunderblütenessig.png'],sizes:['250 ml']},
  {title:'Kirschen-Birnen-Essig',type:'Essig & Balsamico',photos:['Kirschen-Birnen-Essig.png'],sizes:['250 ml']},
  {title:'Kirschessig',type:'Essig & Balsamico',photos:['Kirschessig.png'],sizes:['250 ml']},
  {title:'Birnel',type:'Spezialitäten',photos:['Birnel.png'],sizes:['250 ml']},
  {title:'Tomatensauce',type:'Spezialitäten',photos:['Tomatensauce.png'],sizes:['250 ml']},
  {title:'Dessertzwetschgen',type:'Spezialitäten',photos:['Dessertzwetschgen.png'],sizes:['250 ml']},
  {title:'Gedörrte Birnen · ganz',type:'Dörrfrüchte',photos:['Cellophanetüte mit ganzen getrockneten Birnen.png','Verpackte Dörrbirnen ganz mit Probierteller.png'],sizes:['250 g']},
  {title:'Gedörrte Birnen · halb',type:'Dörrfrüchte',photos:['Gedörrte Birnen halb Becher.jpg','Gedörrte Birnen halb  Becher und im Keramikschälchen.png'],sizes:['100 g']},
  {title:'Gedörrte Zwetschgen',type:'Dörrfrüchte',photos:['Gedörrte Zwetschgen Becher.png','Gedörrte Zwetschgen halb Becher ausgelegt.png'],sizes:['100 g']},
  {title:'Süssmost',type:'Säfte',photos:['Süssmost3Liter.png','Süssmost Bag in Box 5Liter.png','Süssmost pasteurisiert 10 Liter.png'],ingredients:'Reiner Apfelsaft aus bis zu 33 verschiedenen Thurgauer Apfelsorten',displayVariants:[
    {label:'3 Liter',photo:'Süssmost3Liter.png',reportedStock:25,netVolumeMl:3000,packaging:'Beutel',imageScale:0.68},
    {label:'5 Liter',photo:'Süssmost Bag in Box 5Liter.png',reportedStock:50,netVolumeMl:5000,packaging:'Bag-in-Box',imageScale:0.78},
    {label:'10 Liter',photo:'Süssmost pasteurisiert 10 Liter.png',reportedStock:25,netVolumeMl:10000,packaging:'Bag-in-Box',imageScale:1}
  ]},
  {title:'Traubensaft',type:'Säfte',photos:['TraubensafthalbLiter.png','Traubensaft1Liter.png'],displayVariants:[
    {label:'0.5 Liter',photo:'TraubensafthalbLiter.png'},
    {label:'1 Liter',photo:'Traubensaft1Liter.png'}
  ]},
  {title:'Birnenweggen',type:'Backwaren',photos:['Birnenweggen.png']},
  {title:'Himbeeressig',type:'Essig & Balsamico',photos:['Himbeeressig.png'],sizes:['250 ml']},
  {title:'Es Tröpfli Heimat',type:'Geschenksharassen',photos:['Essigharassli.png'],description:'Drei Fläschchen à 250 ml: Himbeeressig, Birnen-Balsamico und Kirschessig. Im kleinen Holzharassli mit Masche.',includedProducts:[{label:'Himbeeressig',productTitle:'Himbeeressig'},{label:'Birnen-Balsamico',productTitle:'Birnen-Balsamico'},{label:'Kirschessig',productTitle:'Kirschessig'}]},
  {title:'Geschenksharassli · mittel',displayTitle:'Maischhauser Harass',type:'Geschenksharassen',photos:['Geschenkharassli mittel.png'],description:'Mit Tomatensauce (250 ml), Kirschen-Birnen-Essig (250 ml), Kirschessig (250 ml), Dessertzwetschgen (250 ml) und halben gedörrten Birnen (100 g).',includedProducts:[{label:'Tomatensauce',productTitle:'Tomatensauce'},{label:'Kirschen-Birnen-Essig',productTitle:'Kirschen-Birnen-Essig'},{label:'Kirschessig',productTitle:'Kirschessig'},{label:'Dessertzwetschgen',productTitle:'Dessertzwetschgen'},{label:'Halb gedörrte Birnen',productTitle:'Gedörrte Birnen · halb'}]},
  {title:'Geschenksharass · gross',displayTitle:'Guntershauser Harass',type:'Geschenksharassen',photos:['Geschenksharass-gross-komplett.webp'],description:'Enthält: Kirschen-Birnen-Essig (250 ml), halb gedörrte Birnen (100 g), Dessertzwetschgen (250 ml), Tomatensauce (250 ml), Birnen-Balsamico (250 ml), Himbeeressig (250 ml) und Birnenweggen.',includedProducts:[{label:'Kirschen-Birnen-Essig',productTitle:'Kirschen-Birnen-Essig'},{label:'Halb gedörrte Birnen',productTitle:'Gedörrte Birnen · halb'},{label:'Dessertzwetschgen',productTitle:'Dessertzwetschgen'},{label:'Tomatensauce',productTitle:'Tomatensauce'},{label:'Birnen-Balsamico',productTitle:'Birnen-Balsamico'},{label:'Birnenweggen',productTitle:'Birnenweggen'},{label:'Himbeeressig',productTitle:'Himbeeressig'}]}
].map((product, index) => {
  const shopify=shopifyByTitle.get(product.title);
  return Object.freeze({...product,...confirmedFacts[product.title],id:'shopify-product-'+(index+1),
  description:product.description ?? '',shopifyProductId:shopify?.id||null,
  shopifyVariants:shopify?.variants||[],shopifyPublished:shopify?.published===true,
  shopifyPriceCents:shopify?.variants.length===1?shopify.variants[0].priceCents:null,
  confirmed:Boolean(shopify),
  allergens:null,storage:null,shelfLife:null,
  factsSource:confirmedFacts[product.title] || product.title === 'Süssmost' ? 'Betreiberangaben, Übergabe 2026-10-09' : null});
});


