import {productDrafts} from './product-drafts.mjs';
import {filterProducts} from './shop-catalog.mjs';
const grid = document.querySelector('#shop-products');
const search = document.querySelector('#shop-search');
const category = document.querySelector('#shop-category');
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
function guidePrice(amount) {
  return element('p','Richtpreis · CHF '+amount.toFixed(2),'shop-price');
}
function render() {
  const visible = filterProducts(productDrafts, search.value, category.value);
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
    const target=groups.get(product.type);
    if (product.displayVariants) {
      const row = element('div','','shop-variant-row');
      row.style.gridTemplateColumns='repeat('+product.displayVariants.length+',minmax(0,1fr))';
      row.setAttribute('role','group');
      row.setAttribute('aria-label',product.title+' – alle Grössen');
      product.displayVariants.forEach(variant => {
        const card = element('article','','shop-card');
        const media = photo(variant.photo,product.title+' · '+variant.label);
        if (variant.imageScale) media.querySelector('img').style.transform='scale('+variant.imageScale+')';
        card.append(media,element('h3',product.title,'shop-product-title'),
          element('p',variant.label,'shop-variant-size'));
        if (variant.previewPrice != null) card.append(guidePrice(variant.previewPrice));
        else card.append(element('p','Preis wird bestätigt','shop-price-pending'));
        row.append(card);
      });
      target.append(row);
      return;
    }
    const article = element('article', '', 'shop-card');
    if (product.type === 'Geschenksharassen') article.classList.add('shop-card--gift');
    article.append(photo(product.photos[0],product.title,index > 2),element('h3',product.title,'shop-product-title'));
    let mobileDetails = null;
    if (product.previewPrices) {
      product.sizes.forEach((size,index)=>article.append(element('p',size+' · Richtpreis CHF '+product.previewPrices[index].toFixed(2),'shop-variant-size')));
    } else if (product.sizes) article.append(element('p',product.sizes.join(' · '),'shop-sizes'));
    if (product.previewPrice != null) article.append(guidePrice(product.previewPrice));
    else article.append(element('p','Preis wird bestätigt','shop-price-pending'));
    if (product.description) {
      article.append(element('p',product.description,'shop-description'));
      if (product.type === 'Geschenksharassen' && product.includedProducts?.length) {
        mobileDetails = element('details','','shop-mobile-details');
        mobileDetails.append(element('summary','Mengen & Produktdetails'),element('p',product.description,'shop-description'));
      }
    }
    if (product.includedProducts?.length) {
      const contents = element('section','','shop-contents');
      contents.setAttribute('aria-label','Enthaltene Produkte');
      contents.append(element('h4','Enthaltene Produkte','shop-contents-heading'));
      const list = element('ul','','shop-contents-grid');
      product.includedProducts.forEach(content => {
        const item = element('li','','shop-content-item');
        const includedProduct = content.productTitle && productDrafts.find(candidate => candidate.title === content.productTitle);
        if (includedProduct?.photos?.[0]) item.append(photo(includedProduct.photos[0],content.label));
        else item.append(element('div','Foto folgt','shop-content-photo-placeholder'));
        item.append(element('p',content.label,'shop-content-label'));
        list.append(item);
      });
      contents.append(list);
      article.append(contents);
    }
    if (mobileDetails) article.append(mobileDetails);
    if (product.photos.length > 1) {
      const details = element('details');
      const images = element('div','','shop-extra-photos');
      const sizePhotos=product.sizes && product.sizes.length===product.photos.length;
      details.append(element('summary',sizePhotos ? 'Grössen ansehen' : 'Weitere Ansichten'));
      product.photos.slice(1).forEach((filename,i)=>images.append(photo(filename, product.title + (sizePhotos ? ' · '+product.sizes[i+1] : ' · Ansicht '+(i+2)))));
      details.append(images);
      article.append(details);
    }
    target.append(article);
  });
  if (!visible.length) fragment.append(element('p','Keine passenden Produkte gefunden.'));
  grid.replaceChildren(fragment);
  count.textContent = visible.length + ' von ' + productDrafts.length + ' Produkten';
  for(const button of categoryNav.querySelectorAll('button')) button.setAttribute('aria-pressed',String(button.dataset.category===category.value));
}
const categoryOrder=['Essig & Balsamico','Säfte','Dörrfrüchte','Spezialitäten','Backwaren','Geschenksharassen'];
const categoryNav=document.querySelector('#shop-categories');
categoryOrder.forEach(type=>category.add(new Option(type,type)));
for(const type of ['',...categoryOrder]) {
  const button=element('button',type||'Alles');button.type='button';button.dataset.category=type;
  button.addEventListener('click',()=>{category.value=type;render();});categoryNav.append(button);
}
const requestedCategory=new URLSearchParams(location.search).get('kategorie');
if(categoryOrder.includes(requestedCategory)) category.value=requestedCategory;
search.addEventListener('input',render);
category.addEventListener('change',render);
render();


