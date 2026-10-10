// Read-only Storefront adapter. No credentials, cart writes or checkout actions.
// https://shopify.dev/docs/api/storefront/2026-07/queries/products
export const CATALOG_QUERY = `query ShopCatalog($after: String) {
  products(first: 24, after: $after, sortKey: TITLE) {
    pageInfo { hasNextPage endCursor }
    nodes {
      id title handle productType description availableForSale
      featuredImage { url altText width height }
      priceRange {
        minVariantPrice { amount currencyCode }
        maxVariantPrice { amount currencyCode }
      }
    }
  }
}`;

export function money(value) {
  if (!value || value.currencyCode !== 'CHF' ||
      !/^\d+(?:\.\d{1,2})?$/.test(value.amount)) throw new Error('Invalid CHF price');
  const amount = Number(value.amount);
  if (!Number.isFinite(amount) || !Number.isSafeInteger(Math.round(amount * 100)))
    throw new Error('Invalid CHF price');
  return amount;
}

export function normalizeProduct(product) {
  if (!product || !/^gid:\/\/shopify\/Product\/\d+$/.test(product.id) ||
      typeof product.title !== 'string' || !product.title.trim() ||
      typeof product.handle !== 'string' || !/^[a-z0-9-]+$/.test(product.handle) ||
      typeof product.availableForSale !== 'boolean') throw new Error('Invalid product');
  const min = money(product.priceRange?.minVariantPrice);
  const max = money(product.priceRange?.maxVariantPrice);
  if (min > max) throw new Error('Invalid price range');
  let image = null;
  if (product.featuredImage) {
    const url = new URL(product.featuredImage.url);
    if (url.protocol !== 'https:' || url.hostname !== 'cdn.shopify.com' || url.username || url.password)
      throw new Error('Invalid product image');
    image = {url: url.href, alt: product.featuredImage.altText || product.title};
  }
  return Object.freeze({id: product.id, title: product.title.trim(),
    type: typeof product.productType === 'string' ? product.productType : '',
    description: typeof product.description === 'string' ? product.description : '',
    available: product.availableForSale, min, max, image});
}

export async function loadCatalogPage(after = null, request = fetch) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await request('https://biottoslaedeli.myshopify.com/api/2026-07/graphql.json', {
      method: 'POST', credentials: 'omit', signal: controller.signal,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({query: CATALOG_QUERY, variables: {after}})
    });
    if (!response.ok) throw new Error('Catalog unavailable');
    const body = await response.json();
    if (body.errors?.length) throw new Error('Catalog unavailable');
    const page = body.data?.products;
    if (!Array.isArray(page?.nodes) || typeof page.pageInfo?.hasNextPage !== 'boolean')
      throw new Error('Invalid catalog response');
    if (page.pageInfo.hasNextPage &&
        (typeof page.pageInfo.endCursor !== 'string' || !page.pageInfo.endCursor || page.pageInfo.endCursor === after))
      throw new Error('Invalid catalog cursor');
    return {products: page.nodes.map(normalizeProduct),
      next: page.pageInfo.hasNextPage ? page.pageInfo.endCursor : null};
  } finally {
    clearTimeout(timer);
  }
}

export function filterProducts(products, search, type) {
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('de-CH').trim();
  const needle = normalize(search);
  return products.filter(product => (!type || product.type === type) &&
    normalize(product.title + ' ' + product.description).includes(needle));
}
