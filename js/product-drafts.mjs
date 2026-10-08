// Operator-confirmed facts from the handover, 2026-10-09 Europe/Zurich.
// Reported stock is NOT live Shopify inventory. Unknown food data stays null.
const confirmedFacts = {
  "Apfelessig · 33 Sorten": {
    "netVolumeMl": 500,
    "reportedStock": 5,
    "ingredients": "Vergorener Apfelsaft mit Essigmutter",
    "operatorNotes": "33 Apfelsorten aus eigener Ernte, 2025; Herstellung durch Helena"
  },
  "Birnenessig": {
    "netVolumeMl": 500,
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
  "Birnel": {
    "netVolumeMl": 180,
    "reportedStock": 10,
    "ingredients": "Ausschliesslich eingekochter Birnensaft",
    "operatorNotes": "Birnendicksaft"
  },
  "Tomatensauce": {
    "netVolumeMl": 180,
    "reportedStock": 20,
    "ingredients": "Sonnengereifte Tomaten aus eigenem Garten, Salz",
    "operatorNotes": ""
  },
  "Dessertzwetschgen": {
    "netVolumeMl": 180,
    "reportedStock": 10,
    "ingredients": "Zwetschgen, Zucker, Zimt",
    "operatorNotes": ""
  }
};

// Photo grouping for the owner's review, not a published Shopify catalog.
// Photo-only records remain provisional; confirmedFacts records the operator statements.
// Null is unknown; it must never become a zero price or available stock.
export const productDrafts = [
  {title:'Apfelessig · 33 Sorten',type:'Essig & Balsamico',photos:['Biottos Apfelessig 33 Sorten.png']},
  {title:'Birnenessig',type:'Essig & Balsamico',photos:['Birnenessig.png']},
  {title:'Birnen-Balsamico',type:'Essig & Balsamico',photos:['Birnen-Balsamico.png']},
  {title:'Holunderblütenessig',type:'Essig & Balsamico',photos:['Holunderblütenessig.png']},
  {title:'Kirschen-Birnen-Essig',type:'Essig & Balsamico',photos:['Kirschen-Birnen-Essig.png']},
  {title:'Kirschessig',type:'Essig & Balsamico',photos:['Kirschessig.png']},
  {title:'Birnel',type:'Spezialitäten',photos:['Birnel.png']},
  {title:'Tomatensauce',type:'Spezialitäten',photos:['Tomatensauce.png']},
  {title:'Dessertzwetschgen',type:'Spezialitäten',photos:['Dessertzwetschgen.png']},
  {title:'Gedörrte Birnen · ganz',type:'Dörrfrüchte',photos:['Cellophanetüte mit ganzen getrockneten Birnen.png','Verpackte Dörrbirnen ganz mit Probierteller.png','Gedörrte Birne einzel Keramikschälchen.png']},
  {title:'Gedörrte Birnen · halb',type:'Dörrfrüchte',photos:['Gedörrte Birnen halb Becher.jpg','Gedörrte Birnen halb  Becher und im Keramikschälchen.png']},
  {title:'Gedörrte Zwetschgen',type:'Dörrfrüchte',photos:['Gedörrte Zwetschgen Becher.png','Gedörrte Zwetschgen halb Becher ausgelegt.png','Gedörrte Zwetschge einzel.png']},
  {title:'Süssmost',type:'Säfte',photos:['Süssmost3Liter.png','Süssmost Bag in Box 5Liter.png','Süssmost pasteurisiert 10 Liter.png'],ingredients:'Reiner Apfelsaft aus 15 verschiedenen Apfelsorten',displayVariants:[
    {label:'3 Liter',photo:'Süssmost3Liter.png',reportedStock:25,netVolumeMl:3000,packaging:'Beutel'},
    {label:'5 Liter',photo:'Süssmost Bag in Box 5Liter.png',reportedStock:50,netVolumeMl:5000,packaging:'Bag-in-Box'},
    {label:'10 Liter',photo:'Süssmost pasteurisiert 10 Liter.png',reportedStock:25,netVolumeMl:10000,packaging:'Bag-in-Box'}
  ]},
  {title:'Traubensaft',type:'Säfte',photos:['TraubensafthalbLiter.png','Traubensaft1Liter.png'],sizes:['0.5 Liter','1 Liter']},
  {title:'Essigharassli',type:'Geschenksharassen',photos:['Essigharassli.png']},
  {title:'Geschenksharassli · mittel',type:'Geschenksharassen',photos:['Geschenkharassli mittel.png']},
  {title:'Geschenksharass · gross',type:'Geschenksharassen',photos:['Geschenksharass gross.png']}
].map((product, index) => Object.freeze({...product,...confirmedFacts[product.title],id:'photo-draft-'+(index+1),
  description:'',price:null,stock:null,shopifyProductId:null,confirmed:false,
  allergens:null,storage:null,shelfLife:null,
  factsSource:confirmedFacts[product.title] || product.title === 'Süssmost' ? 'Betreiberangaben, Übergabe 2026-10-09' : null}));

