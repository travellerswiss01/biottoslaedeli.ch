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
const photoViewerClose = element('button','Schliessen','shop-photo-viewer-close');
photoViewerClose.type = 'button';
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
    photoViewerImage.src=img.currentSrc || img.src;
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
  visible.forEach((product,index) => {
    if (product.displayVariants) {
      const row = element('div','','shop-variant-row');
      row.style.gridTemplateColumns='repeat('+product.displayVariants.length+',minmax(0,1fr))';
      row.setAttribute('role','group');
      row.setAttribute('aria-label',product.title+' – alle Grössen');
      product.displayVariants.forEach(variant => {
        const card = element('article','','shop-card');
        const media = photo(variant.photo,product.title+' · '+variant.label);
        if (variant.imageScaleX || variant.imageScaleY) media.querySelector('img').style.transform='scale('+(variant.imageScaleX ?? 1)+','+(variant.imageScaleY ?? 1)+')';
        card.append(media,element('p',product.type,'shop-category'),element('h2',product.title),
          element('p',variant.label,'shop-variant-size'));
        if (variant.previewPrice != null) card.append(guidePrice(variant.previewPrice));
        row.append(card);
      });
      fragment.append(row);
      return;
    }
    const article = element('article', '', 'shop-card');
    article.append(photo(product.photos[0],product.title,index > 2),element('p',product.type,'shop-category'),element('h2',product.title));
    if (product.previewPrices) {
      product.sizes.forEach((size,index)=>article.append(element('p',size+' · Richtpreis CHF '+product.previewPrices[index].toFixed(2),'shop-variant-size')));
    } else if (product.sizes) article.append(element('p',product.sizes.join(' · '),'shop-sizes'));
    if (product.previewPrice != null) article.append(guidePrice(product.previewPrice));
    if (product.description) article.append(element('p',product.description,'shop-description'));
    if (product.includedProducts?.length) {
      const contents = element('section','','shop-contents');
      contents.setAttribute('aria-label','Enthaltene Produkte');
      contents.append(element('h3','Enthaltene Produkte','shop-contents-heading'));
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
    if (product.photos.length > 1) {
      const details = element('details');
      const images = element('div','','shop-extra-photos');
      const sizePhotos=product.sizes && product.sizes.length===product.photos.length;
      details.append(element('summary',sizePhotos ? 'Grössen ansehen' : 'Weitere Ansichten'));
      product.photos.slice(1).forEach((filename,i)=>images.append(photo(filename, product.title + (sizePhotos ? ' · '+product.sizes[i+1] : ' · Ansicht '+(i+2)))));
      details.append(images);
      article.append(details);
    }
    fragment.append(article);
  });
  if (!visible.length) fragment.append(element('p','Keine passenden Produkte gefunden.'));
  grid.replaceChildren(fragment);
  count.textContent = visible.length + ' von ' + productDrafts.length + ' Produktentwürfen';
}
[...new Set(productDrafts.map(product=>product.type))].sort().forEach(type=>category.add(new Option(type,type)));
search.addEventListener('input',render);
category.addEventListener('change',render);
render();

