import test from 'node:test';
import assert from 'node:assert/strict';
import {money, normalizeProduct, filterProducts, loadCatalogPage, CATALOG_QUERY} from '../js/shop-catalog.mjs';

const product = () => ({id:'gid://shopify/Product/10659082797322', title:'Chli & Fii', handle:'chli-fii',
  productType:'Geschenkskörbe', description:'Gedörrte Zwetschgen', availableForSale:true,
  featuredImage:{url:'https://cdn.shopify.com/s/files/1/photo.jpg', altText:null},
  priceRange:{minVariantPrice:{amount:'19.95',currencyCode:'CHF'},maxVariantPrice:{amount:'19.95',currencyCode:'CHF'}}});
const response = (nodes, next = false, cursor = null) => ({ok:true,json:async()=>({data:{products:{nodes,pageInfo:{hasNextPage:next,endCursor:cursor}}}})});

test('real basket values retain CHF price and actual description', () => {
  const value = normalizeProduct(product());
  assert.equal(value.min,19.95);
  assert.equal(value.description,'Gedörrte Zwetschgen');
  assert.equal(value.image.alt,'Chli & Fii');
});
test('prices reject wrong currency, malformed, negative and unsafe amounts', () => {
  for (const amount of ['-1','19,95','1e2','NaN','Infinity','','9007199254740992','1.234'])
    assert.throws(()=>money({amount,currencyCode:'CHF'}));
  assert.throws(()=>money({amount:'19.95',currencyCode:'EUR'}));
  const p=product();p.priceRange.maxVariantPrice.amount='1';
  assert.throws(()=>normalizeProduct(p));
});
test('missing or broken data never becomes a fabricated price or product', () => {
  for (const field of ['id','title','handle','availableForSale','priceRange']) {
    const p=product();delete p[field];assert.throws(()=>normalizeProduct(p));
  }
  const p=product();p.featuredImage=null;p.availableForSale=false;
  assert.equal(normalizeProduct(p).image,null);
  assert.equal(normalizeProduct(p).available,false);
});
test('image URLs cannot inject a non-Shopify destination or executable scheme', () => {
  for (const url of ['javascript:alert(1)','http://cdn.shopify.com/a.jpg','https://evil.example/a.jpg','https://cdn.shopify.com.evil.example/a.jpg','https://user:pass@cdn.shopify.com/a.jpg']) {
    const p=product();p.featuredImage.url=url;assert.throws(()=>normalizeProduct(p));
  }
});
test('search handles accents and combines with actual category', () => {
  const p=normalizeProduct(product());
  assert.equal(filterProducts([p],' GEDORRTE ','Geschenkskörbe').length,1);
  assert.equal(filterProducts([p],'zwetschgen','Sirup').length,0);
  assert.equal(filterProducts([p],'unbekannt','').length,0);
});
test('catalog request is read-only, paginated and never includes credentials', async () => {
  let calls=0;
  const result=await loadCatalogPage('first-page',async(url,options)=>{
    calls++;
    assert.equal(url,'https://biottoslaedeli.myshopify.com/api/2026-07/graphql.json');
    assert.equal(options.credentials,'omit');
    assert.deepEqual(options.headers,{'Content-Type':'application/json'});
    assert.equal(JSON.parse(options.body).variables.after,'first-page');
    assert.equal(JSON.parse(options.body).query,CATALOG_QUERY);
    assert.ok(!CATALOG_QUERY.includes('mutation'));
    return response([product()],true,'second-page');
  });
  assert.equal(calls,1);assert.equal(result.next,'second-page');assert.equal(result.products.length,1);
});
test('empty catalog is valid but broken and repeated cursors are rejected', async () => {
  assert.deepEqual(await loadCatalogPage(null,async()=>response([])),{products:[],next:null});
  await assert.rejects(loadCatalogPage(null,async()=>response([],true,null)));
  await assert.rejects(loadCatalogPage('same',async()=>response([],true,'same')));
});
test('locked shop, network failures, HTTP errors and partial GraphQL errors fail closed', async () => {
  for(const request of [
    async()=>({ok:false}),
    async()=>{throw new Error('Network disconnected')},
    async()=>({ok:true,json:async()=>{throw new Error('Not JSON')}}),
    async()=>({ok:true,json:async()=>({errors:[{message:'Online Store channel is locked.'}]})}),
    async()=>({ok:true,json:async()=>({errors:[{message:'Partial result'}],data:{products:{nodes:[]}}})}),
    async()=>({ok:true,json:async()=>({data:{products:{nodes:[]}}})})
  ]) await assert.rejects(loadCatalogPage(null,request));
});
