import {productDrafts} from './product-drafts.mjs';
import {filterProducts} from './shop-catalog.mjs';
const grid = document.querySelector('#shop-products');
const search = document.querySelector('#shop-search');
const searchExamples=['Essig','Süssmost','Birnenessig'];
const reduceSearchMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
let searchAnimationTimer=null,searchExampleIndex=0,searchExampleText='',searchAnimationStopped=false;
function clearSearchAnimation(){
  window.clearTimeout(searchAnimationTimer);
  searchAnimationTimer=null;
}
function typeSearchExample(){
  if(searchAnimationStopped||search.value||document.activeElement===search||reduceSearchMotion.matches)return;
  const example=searchExamples[searchExampleIndex];
  if(searchExampleText.length<example.length){
    searchExampleText=example.slice(0,searchExampleText.length+1);
    search.placeholder=searchExampleText;
    searchAnimationTimer=window.setTimeout(typeSearchExample,115);
    return;
  }
  searchAnimationTimer=window.setTimeout(eraseSearchExample,1100);
}
function eraseSearchExample(){
  if(searchAnimationStopped||search.value||document.activeElement===search||reduceSearchMotion.matches)return;
  if(searchExampleText.length){
    searchExampleText=searchExampleText.slice(0,-1);
    search.placeholder=searchExampleText||' ';
    searchAnimationTimer=window.setTimeout(eraseSearchExample,55);
    return;
  }
  search.placeholder='z. B. Essig';
  searchExampleIndex=(searchExampleIndex+1)%searchExamples.length;
  searchAnimationTimer=window.setTimeout(typeSearchExample,450);
}
function startSearchAnimation(){
  clearSearchAnimation();
  if(search.value||document.activeElement===search)return;
  searchAnimationStopped=false;
  searchExampleText='';
  search.placeholder=reduceSearchMotion.matches?'z. B. Essig':'';
  if(!reduceSearchMotion.matches)searchAnimationTimer=window.setTimeout(typeSearchExample,250);
}
function stopSearchAnimation(){
  searchAnimationStopped=true;
  clearSearchAnimation();
  search.placeholder=search.value?'':'';
}
search.addEventListener('focus',stopSearchAnimation);
search.addEventListener('input',()=>{if(search.value)stopSearchAnimation();render();});
search.addEventListener('blur',()=>{if(!search.value)searchAnimationTimer=window.setTimeout(startSearchAnimation,450);});
reduceSearchMotion.addEventListener?.('change',startSearchAnimation);
startSearchAnimation();
let selectedCategory = '';
const count = document.querySelector('#shop-count');
function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
}
const photoViewer = document.createElement('dialog');
photoViewer.className = 'shop-photo-viewer';
photoViewer.setAttribute('aria-label','Produktfoto in Grossansicht');
const photoViewerClose = element('button','','shop-photo-viewer-close');
const closeIcon=element('span','×'); closeIcon.setAttribute('aria-hidden','true');
photoViewerClose.append(closeIcon,element('span','Schliessen'));
photoViewerClose.type = 'button';
photoViewerClose.setAttribute('aria-label','Foto schliessen');
photoViewerClose.title = 'Schliessen';
let lastPhotoTrigger=null;
photoViewer.addEventListener('close',()=>{lastPhotoTrigger?.focus();photoViewerImage.removeAttribute('src');});
const photoViewerImage = element('img');
const photoViewerCaption = element('p');
photoViewer.append(photoViewerClose,photoViewerImage,photoViewerCaption);
document.body.append(photoViewer);
photoViewerClose.addEventListener('click',()=>photoViewer.close());
photoViewer.addEventListener('click',event=>{if(event.target===photoViewer)photoViewer.close()});
function photo(filename, title, lazy = true) {
  const media = element('div', '', 'shop-photo');
  const button = element('button','','shop-photo-open');
  button.type = 'button';
  button.setAttribute('aria-label','Foto vergrössern: '+title);
  button.title = 'Foto vergrössern';
  const img = element('img');
  const picture = element('picture');
  const source = element('source');
  source.type = 'image/webp';
  if (!filename.toLowerCase().endsWith('.webp')) {
    source.srcset = 'img/' + encodeURIComponent(filename + '.webp');
    picture.append(source);
  }
  img.src = 'img/' + encodeURIComponent(filename);
  img.alt = title;
  img.loading = lazy ? 'lazy' : 'eager';
  img.width = 600; img.height = 600;
  img.addEventListener('error', () => {
    if (source.hasAttribute('srcset') && !img.dataset.fallbackAttempted) {
      img.dataset.fallbackAttempted = 'true';
      source.removeAttribute('srcset');
      img.src = 'img/' + encodeURIComponent(filename);
      return;
    }
    media.replaceChildren(element('span', 'Bild derzeit nicht verfügbar'));
  });
  picture.append(img);
  button.append(picture);
  media.append(button);
  button.addEventListener('click',()=>{
    lastPhotoTrigger=button;
    photoViewerImage.src=img.src;
    photoViewerImage.alt=title;
    photoViewerCaption.textContent=title;
    photoViewer.showModal();
  });
  return media;
}
function shopifyPrice(cents) {
  return element('p','CHF '+(cents/100).toFixed(2),'shop-price');
}
function addToCartLink(product,variant) {
  if(!product.shopifyPublished||!variant?.key)return null;
  const link=element('a','In den Warenkorb','btn shop-add-to-cart');
  link.href='warenkorb.html?korb='+encodeURIComponent(variant.key);
  link.dataset.shopifyCart=variant.key;
  return link;
}
function render() {
  const visible = filterProducts(productDrafts, search.value, selectedCategory);
  const fragment = document.createDocumentFragment();
  const groups=new Map();
  for(const type of categoryOrder) {
    if(!visible.some(product=>product.type===type)) continue;
    const section=element('section','','shop-category-section');
    const heading=element('h2',type,'shop-section-title');
    heading.id='category-'+categoryOrder.indexOf(type);
    section.setAttribute('aria-labelledby',heading.id);
    const cards=element('div','','shop-grid');
    section.append(heading,cards);fragment.append(section);groups.set(type,cards);
  }
  visible.forEach((product,index) => {
    const displayName=product.displayTitle||product.title;
    const target=groups.get(product.type);
    if (product.displayVariants) {
      const row = element('div','','shop-variant-row');
      row.style.gridTemplateColumns='repeat('+product.displayVariants.length+',minmax(0,1fr))';
      row.setAttribute('role','group');
      row.setAttribute('aria-label',displayName+' – alle Grössen');
      product.displayVariants.forEach(variant => {
        const card = element('article','','shop-card');
        const media = photo(variant.photo,displayName+' · '+variant.label);
        if (variant.imageScale) media.querySelector('img').style.transform='scale('+variant.imageScale+')';
        card.append(media,element('h3',displayName,'shop-product-title'),
          element('p',variant.label,'shop-variant-size'));
        const storeVariant=product.shopifyVariants.find(candidate=>candidate.label===variant.label);
        if(storeVariant)card.append(shopifyPrice(storeVariant.priceCents));
        const cartLink=addToCartLink(product,storeVariant);if(cartLink)card.append(cartLink);
        row.append(card);
      });
      target.append(row);
      return;
    }
    const article = element('article', '', 'shop-card');
    if (product.type === 'Geschenksharassen') article.classList.add('shop-card--gift');
    article.append(photo(product.photos[0],displayName,index > 2),element('h3',displayName,'shop-product-title'));
    if (product.sizes) article.append(element('p',product.sizes.join(' · '),'shop-sizes'));
    if (product.shopifyPriceCents!=null) article.append(shopifyPrice(product.shopifyPriceCents));

    // Keep the primary order action visible before long product or gift contents.
    const cartLink=addToCartLink(product,product.shopifyVariants[0]);
    if(cartLink)article.append(cartLink);

    if(product.includedProducts?.length) {
      const contents=element('section','','shop-contents');
      contents.setAttribute('aria-label','Enthaltene Spezialitäten');
      const preview=element('ul','','shop-contents-preview');
      product.includedProducts.slice(0,3).forEach(content=>{
        const item=element('li','','shop-content-item');
        const includedProduct=content.productTitle&&productDrafts.find(candidate=>candidate.title===content.productTitle);
        if(includedProduct?.photos?.[0])item.append(photo(includedProduct.photos[0],content.label));
        item.append(element('p',content.label,'shop-content-label'));
        preview.append(item);
      });
      if(product.includedProducts.length>3) {
        preview.append(element('li','+'+(product.includedProducts.length-3)+' weitere','shop-contents-more'));
      }
      contents.append(preview);
      const details=element('details','','shop-contents-details');
      details.append(element('summary','Inhalt ansehen ('+product.includedProducts.length+' Produkte)'));
      if(product.description)details.append(element('p',product.description,'shop-description'));
      const list=element('ul','','shop-contents-grid');
      product.includedProducts.forEach(content=>{
        const item=element('li','','shop-content-item');
        const includedProduct=content.productTitle&&productDrafts.find(candidate=>candidate.title===content.productTitle);
        if(includedProduct?.photos?.[0])item.append(photo(includedProduct.photos[0],content.label));
        else item.append(element('div','Foto folgt','shop-content-photo-placeholder'));
        item.append(element('p',content.label,'shop-content-label'));
        list.append(item);
      });
      details.append(list);
      contents.append(details);
      article.append(contents);
    } else if(product.description) {
      const details=element('details','','shop-product-details');
      details.append(element('summary','Produktdetails ansehen'),element('p',product.description,'shop-description'));
      article.append(details);
    }
    if (product.photos.length > 1) {
      const details = element('details');
      const images = element('div','','shop-extra-photos');
      const sizePhotos=product.sizes && product.sizes.length===product.photos.length;
      details.append(element('summary',sizePhotos ? 'Grössen ansehen' : 'Weitere Ansichten'));
      product.photos.slice(1).forEach((filename,i)=>images.append(photo(filename, displayName + (sizePhotos ? ' · '+product.sizes[i+1] : ' · Ansicht '+(i+2)))));
      details.append(images);
      article.append(details);
    }
    target.append(article);
  });
  if (!visible.length) fragment.append(element('p','Keine passenden Produkte gefunden.'));
  grid.replaceChildren(fragment);
  count.textContent = 'Zeigt ' + visible.length + ' von ' + productDrafts.length + ' Produkten';
  for(const button of categoryNav.querySelectorAll('button')) button.setAttribute('aria-pressed',String(button.dataset.category===selectedCategory));
}
const categoryOrder=['Geschenksharassen','Essig & Balsamico','Säfte','Dörrfrüchte','Spezialitäten','Backwaren'];
const categoryNav=document.querySelector('#shop-categories');
for(const type of ['',...categoryOrder]) {
  const total=type ? productDrafts.filter(product=>product.type===type).length : productDrafts.length;
  const label=type || 'Alle Produkte';
  const button=element('button',label+' ('+total+')');button.type='button';button.dataset.category=type;
  button.setAttribute('aria-controls','shop-products');
  button.addEventListener('click',()=>{selectedCategory=type;render();});categoryNav.append(button);
}
const requestedCategory=new URLSearchParams(location.search).get('kategorie');
if(categoryOrder.includes(requestedCategory)) selectedCategory=requestedCategory;
render();


