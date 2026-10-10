import './shopify-cart.js';

(function(){
  'use strict';

  var bridge=window.BiottosShopify;
  var main=document.querySelector('#cart-main');
  var itemsNode=document.querySelector('#cart-items');
  var choices=document.querySelector('#cart-choices');
  var status=document.querySelector('#cart-status');
  var checkout=document.querySelector('#cart-checkout');
  var total=document.querySelector('#cart-total');
  var search=document.querySelector('#cart-search');
  var categoryFilter=document.querySelector('#cart-category-filter');
  var choiceCount=document.querySelector('#cart-choice-count');
  var noResults=document.querySelector('#cart-no-results');
  var pickerTitle=document.querySelector('#cart-choices-title');
  var categoryByKey={
    chili:'harassen',fein:'harassen',gross:'harassen',
    'apfelessig-33-sorten':'vinegar',birnenessig:'vinegar','birnen-balsamico':'vinegar',
    'kirschen-birnen-essig':'vinegar',holunderbluetenessig:'vinegar',kirschessig:'vinegar',himbeeressig:'vinegar',
    'suessmost-3l':'juices','suessmost-5l':'juices','suessmost-10l':'juices','traubensaft-05l':'juices','traubensaft-1l':'juices',
    'gedoerrte-birnen-ganz':'dried','gedoerrte-birnen-halb':'dried','gedoerrte-zwetschgen':'dried',
    birnel:'specialties',tomatensauce:'specialties',dessertzwetschgen:'specialties',birnenweggen:'bakery'
  };
  var activeCategory=bridge.getCart().length?'all':'harassen';

  function node(tag,text,className){var element=document.createElement(tag);if(text)element.textContent=text;if(className)element.className=className;return element}
  function money(cents){return 'CHF '+(cents/100).toFixed(2)}

  function setQuantity(key,value,displayName){
    if(!bridge.setQuantity(key,value)){
      status.textContent='Bitte eine ganze Anzahl von 1 bis 999 eingeben.';
      return false;
    }
    status.textContent='Anzahl für '+displayName+' aktualisiert.';
    render();
    var input=itemsNode.querySelector('[data-cart-key="'+key+'"] .cart-quantity-input');
    if(input)input.focus();
    return true;
  }

  function render(){
    var items=bridge.getCart(),sum=0,fragment=document.createDocumentFragment();
    main.classList.toggle('is-empty',items.length===0);
    pickerTitle.textContent=items.length?'Noch etwas hinzufügen?':'Harassen und Spezialitäten auswählen';

    if(!items.length){
      var empty=node('div','','cart-empty');
      empty.append(node('h2','Dein Warenkorb ist noch leer.'));
      empty.append(node('p','Wähle eine Harass oder stöbere in den Spezialitäten.'));
      var browse=node('a','Harassen mit Fotos ansehen','cart-empty-link');browse.href='#cart-choices';
      empty.append(browse);fragment.append(empty);
    }

    items.forEach(function(item){
      var product=bridge.products.find(function(candidate){return candidate.key===item.key});
      if(!product)return;
      var displayName=(product.displayTitle||product.title)+(product.variantLabel?' · '+product.variantLabel:'');
      sum+=product.unitCents*item.quantity;

      var row=node('article','','cart-item');row.dataset.cartKey=item.key;
      var image=node('img','','cart-item-photo');image.src=product.photo;image.alt=displayName;image.width=88;image.height=88;image.loading='lazy';
      var copy=node('div','','cart-item-copy');
      copy.append(node('h2',displayName),node('p',money(product.unitCents)+' '+product.unitLabel,'cart-item-unit'));

      var actions=node('div','','cart-item-actions');
      var quantityControl=node('div','','cart-quantity');quantityControl.setAttribute('aria-label','Anzahl '+displayName);
      var decrease=node('button','−','cart-quantity-button');decrease.type='button';decrease.disabled=item.quantity<=1;decrease.setAttribute('aria-label',displayName+' um eins verringern');
      decrease.addEventListener('click',function(){setQuantity(item.key,item.quantity-1,displayName)});
      var quantity=node('input','','cart-quantity-input');quantity.type='number';quantity.min='1';quantity.max='999';quantity.step='1';quantity.value=String(item.quantity);quantity.inputMode='numeric';quantity.setAttribute('aria-label','Anzahl '+displayName);
      quantity.addEventListener('change',function(){if(!setQuantity(item.key,Number(quantity.value),displayName))quantity.value=String(item.quantity)});
      var increase=node('button','+','cart-quantity-button');increase.type='button';increase.disabled=item.quantity>=999;increase.setAttribute('aria-label',displayName+' um eins erhöhen');
      increase.addEventListener('click',function(){setQuantity(item.key,item.quantity+1,displayName)});
      quantityControl.append(decrease,quantity,increase);
      actions.append(quantityControl,node('p',money(product.unitCents*item.quantity),'cart-line-total'));

      var remove=node('button','Entfernen','cart-remove');remove.type='button';remove.setAttribute('aria-label',displayName+' entfernen');
      remove.addEventListener('click',function(){bridge.removeFromCart(item.key);status.textContent=displayName+' entfernt.';render()});
      copy.append(remove);row.append(image,copy,actions);fragment.append(row);
    });

    itemsNode.replaceChildren(fragment);
    total.textContent='Zwischensumme · '+money(sum);
    var url=bridge.buildMixedCartUrl(items);
    checkout.hidden=!url;
    if(url)checkout.href=url;else checkout.removeAttribute('href');
    document.querySelector('#cart-storage-note').hidden=bridge.storageAvailable();
  }

  function visibleChoices(){
    var query=search.value.trim().toLocaleLowerCase('de-CH'),visible=0;
    choices.querySelectorAll('.cart-choice').forEach(function(card){
      var matchesCategory=activeCategory==='all'||card.dataset.category===activeCategory;
      var matchesSearch=!query||card.dataset.search.includes(query);
      card.hidden=!(matchesCategory&&matchesSearch);
      if(!card.hidden)visible++;
    });
    choiceCount.textContent=visible+' '+(visible===1?'Artikel':'Artikel');
    noResults.hidden=visible!==0;
  }

  var requested=new URLSearchParams(location.search).get('korb');
  if(requested){
    status.textContent=bridge.addToCart(requested,1)?'Harass im Warenkorb.':'Diese Harass ist nicht verfügbar.';
    history.replaceState(null,'',location.pathname);
  }

  bridge.products.forEach(function(product){
    var displayName=product.displayTitle||product.title;
    var choiceName=displayName+(product.variantLabel?' · '+product.variantLabel:'');
    var card=node('article','','cart-choice');
    card.dataset.category=categoryByKey[product.key]||'specialties';
    card.dataset.search=(choiceName+' '+product.unitLabel).toLocaleLowerCase('de-CH');

    var image=node('img','','cart-choice-photo');image.src=product.photo;image.alt=choiceName;image.width=80;image.height=80;image.loading='lazy';
    var copy=node('div','','cart-choice-copy');copy.append(node('h3',choiceName),node('p',money(product.unitCents)+' '+product.unitLabel));
    var add=node('button','+ Hinzufügen','cart-choice-add');add.type='button';add.setAttribute('aria-label',choiceName+' hinzufügen');
    add.addEventListener('click',function(){
      var added=bridge.addToCart(product.key,1);
      status.textContent=added?choiceName+' hinzugefügt.':'Bitte Anzahl prüfen: maximal 999 pro Artikel.';
      render();
    });
    card.append(image,copy,add);choices.append(card);
  });

  categoryFilter.addEventListener('click',function(event){
    var button=event.target.closest('button[data-category]');
    if(!button)return;
    activeCategory=button.dataset.category;
    categoryFilter.querySelectorAll('button').forEach(function(choice){choice.setAttribute('aria-pressed',String(choice===button))});
    visibleChoices();
  });
  search.addEventListener('input',function(){
    if(search.value.trim())activeCategory='all';
    else if(!bridge.getCart().length)activeCategory='harassen';
    categoryFilter.querySelectorAll('button[data-category]').forEach(function(button){
      button.setAttribute('aria-pressed',String(button.dataset.category===activeCategory));
    });
    visibleChoices();
  });

  categoryFilter.querySelectorAll('button[data-category]').forEach(function(button){
    button.setAttribute('aria-pressed',String(button.dataset.category===activeCategory));
  });
  render();
  visibleChoices();
  window.addEventListener('storage',render);
})();
