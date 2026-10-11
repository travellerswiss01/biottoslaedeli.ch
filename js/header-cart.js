const badge=document.getElementById('headerCartCount');
const bridge=window.BiottosShopify;
function updateCount(){if(!badge||!bridge||typeof bridge.getCart!=='function')return;const count=bridge.getCart().reduce((total,item)=>total+item.quantity,0);badge.textContent=String(count);badge.setAttribute('aria-label',count===1?'1 Artikel im Warenkorb':count+' Artikel im Warenkorb');}
if(badge){updateCount();window.addEventListener('pageshow',updateCount);window.addEventListener('storage',event=>{if(event.key==='biottos-cart-v1'||event.key===null)updateCount()});window.addEventListener('biottos:cart-updated',updateCount);}
const searchLink=document.querySelector('[data-focus-search]');
if(searchLink){searchLink.addEventListener('click',()=>{window.setTimeout(()=>document.getElementById('shop-search')?.focus({preventScroll:true}),0);});}
