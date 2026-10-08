// Photo grouping for the owner's review, not a published Shopify catalog.
// Names and size labels are provisional, based on the uploaded filenames.
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
  {title:'Süssmost',type:'Säfte',photos:['Süssmost3Liter.png','Süssmost Bag in Box 5Liter.png'],ingredients:'Reiner Apfelsaft aus 15 verschiedenen Apfelsorten',displayVariants:[
    {label:'3 Liter',photo:'Süssmost3Liter.png',stock:25},
    {label:'5 Liter',photo:'Süssmost Bag in Box 5Liter.png',stock:50},
    {label:'10 Liter',photo:'Süssmost Bag in Box 5Liter.png',stock:25}
  ]},
  {title:'Traubensaft',type:'Säfte',photos:['TraubensafthalbLiter.png','Traubensaft1Liter.png'],sizes:['0.5 Liter','1 Liter']},
  {title:'Essigharassli',type:'Geschenksharassen',photos:['Essigharassli.png']},
  {title:'Geschenksharassli · mittel',type:'Geschenksharassen',photos:['Geschenkharassli mittel.png']},
  {title:'Geschenksharass · gross',type:'Geschenksharassen',photos:['Geschenksharass gross.png']}
].map((product, index) => Object.freeze({...product,id:'photo-draft-'+(index+1),
  description:'',price:null,stock:null,shopifyProductId:null,confirmed:false}));
