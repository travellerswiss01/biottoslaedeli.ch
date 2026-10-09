(function(){
  'use strict';
  var bridge=window.BiottosShopify,itemsNode=document.querySelector('#cart-items'),choices=document.querySelector('#cart-choices'),status=document.querySelector('#cart-status'),checkout=document.querySelector('#cart-checkout'),total=document.querySelector('#cart-total');
  function node(tag,text,className){var e=document.createElement(tag);if(text)e.textContent=text;if(className)e.className=className;return e}
  function money(cents){return 'CHF '+(cents/100).toFixed(2)}
  function render(){
    var items=bridge.getCart(),sum=0,fragment=document.createDocumentFragment();
    if(!items.length)fragment.append(node('p','Dein Warenkorb ist leer. Wähle einen der bestellbaren Körbe unten.'));
    items.forEach(function(item){
      var product=bridge.products.find(function(p){return p.key===item.key});sum+=product.unitCents*item.quantity;
      var row=node('article','','cart-item'),image=node('img');image.src=product.photo;image.alt=product.title;image.width=120;image.height=160;image.loading='lazy';
      var copy=node('div');copy.append(node('h2',product.title),node('p',money(product.unitCents)+' pro Korb'));
      var label=node('label','Anzahl'),quantity=node('input');quantity.type='number';quantity.min='1';quantity.max='999';quantity.step='1';quantity.value=String(item.quantity);quantity.setAttribute('aria-label','Anzahl '+product.title);
      quantity.addEventListener('change',function(){if(!bridge.setQuantity(item.key,Number(quantity.value))){quantity.value=String(item.quantity);status.textContent='Bitte eine ganze Anzahl von 1 bis 999 eingeben.';return}status.textContent='Anzahl aktualisiert.';render();itemsNode.querySelector('[aria-label="Anzahl '+product.title+'"]')?.focus()});label.append(quantity);copy.append(label,node('p',money(product.unitCents*item.quantity),'cart-line-total'));
      var remove=node('button','Entfernen');remove.type='button';remove.setAttribute('aria-label',product.title+' entfernen');remove.addEventListener('click',function(){bridge.removeFromCart(item.key);status.textContent=product.title+' entfernt.';render();checkout.focus()});copy.append(remove);row.append(image,copy);fragment.append(row);
    });
    itemsNode.replaceChildren(fragment);total.textContent='Zwischensumme · '+money(sum);
    var url=bridge.buildMixedCartUrl(items);checkout.hidden=!url;if(url)checkout.href=url;else checkout.removeAttribute('href');
    document.querySelector('#cart-storage-note').hidden=bridge.storageAvailable();
  }
  var requested=new URLSearchParams(location.search).get('korb');
  if(requested){status.textContent=bridge.addToCart(requested,1)?'Korb hinzugefügt.':'Dieser Korb ist nicht verfügbar.';history.replaceState(null,'',location.pathname)}
  bridge.products.forEach(function(product){
    var card=node('article','','cart-choice');card.append(node('h2',product.title),node('p',money(product.unitCents)));
    var add=node('button','Zum Warenkorb hinzufügen');add.type='button';add.setAttribute('aria-label',product.title+' hinzufügen');add.addEventListener('click',function(){status.textContent=bridge.addToCart(product.key,1)?product.title+' hinzugefügt.':'Bitte Anzahl prüfen: maximal 999 pro Korb.';render()});card.append(add);choices.append(card);
  });
  render();window.addEventListener('storage',render);
})();
