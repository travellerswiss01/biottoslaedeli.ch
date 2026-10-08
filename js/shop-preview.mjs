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
function photo(filename, title, lazy = true) {
  const media = element('div', '', 'shop-photo');
  const img = element('img');
  img.src = 'img/' + encodeURIComponent(filename);
  img.alt = title;
  img.loading = lazy ? 'lazy' : 'eager';
  img.width = 600; img.height = 600;
  img.addEventListener('error', () => media.replaceChildren(element('span', 'Bild derzeit nicht verfügbar')), {once:true});
  media.append(img);
  return media;
}
function render() {
  const visible = filterProducts(productDrafts, search.value, category.value);
  const fragment = document.createDocumentFragment();
  visible.forEach((product,index) => {
    if (product.displayVariants) {
      const row = element('div','','shop-variant-row');
      row.setAttribute('role','group');
      row.setAttribute('aria-label',product.title+' – alle Grössen');
      product.displayVariants.forEach(variant => {
        const card = element('article','','shop-card');
        card.append(photo(variant.photo,product.title+' · '+variant.label),
          element('p',product.type,'shop-category'),element('h2',product.title),
          element('p',variant.label,'shop-variant-size'));
        row.append(card);
      });
      fragment.append(row);
      return;
    }
    const article = element('article', '', 'shop-card');
    article.append(photo(product.photos[0],product.title,index > 2),element('p',product.type,'shop-category'),element('h2',product.title));
    if (product.sizes) article.append(element('p',product.sizes.join(' · '),'shop-sizes'));
    if (product.photos.length > 1) {
      const details = element('details');
      const images = element('div','','shop-extra-photos');
      details.append(element('summary',product.sizes ? 'Grössen ansehen' : 'Weitere Ansichten'));
      product.photos.slice(1).forEach((filename,i)=>images.append(photo(filename, product.title + (product.sizes ? ' · '+product.sizes[i+1] : ' · Ansicht '+(i+2)))));
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
