// Current storefront UI regression checks. All external services are blocked;
// this suite never submits an actual order, payment or notification.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const {chromium}=createRequire(import.meta.url)('playwright');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=process.env.QA_OUTPUT_DIR||path.join(os.tmpdir(),'biottos-browser-qa');
fs.mkdirSync(out,{recursive:true});
const types={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp'};
const server=http.createServer((req,res)=>{
  let name;try{name=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400);res.end();return}
  const file=path.resolve(root,'.'+(name==='/'?'/index.html':name));
  if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end();return}
  res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin='http://127.0.0.1:'+server.address().port;
let browser,page,checks=0,photoChecks=0;const errors=[];
try{
  browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
  const context=await browser.newContext({timezoneId:'Europe/Zurich'});
  await context.route('**/*',route=>route.request().url().startsWith(origin)?route.continue():route.abort());
  page=await context.newPage();page.setDefaultTimeout(10000);
  page.on('pageerror',error=>errors.push(error.message));
  page.on('response',response=>{if(response.url().startsWith(origin)&&response.status()>=400)errors.push(response.status()+' '+response.url())});
  async function layout(){
    console.log('Layout '+await page.url());
    const result=await page.evaluate(async()=>{
      const images=[...document.querySelectorAll('img[src]')].filter(i=>i.getClientRects().length);
      for(const image of images){image.loading='eager';try{await Promise.race([image.decode(),new Promise((_,reject)=>setTimeout(()=>reject(new Error('Image decode timed out: '+image.src)),5000))])}catch{}}
      return {overflow:document.documentElement.scrollWidth>innerWidth+1,broken:images.filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),footer:[...document.querySelectorAll('footer a')].filter(e=>e.getClientRects().length).map(e=>({size:parseFloat(getComputedStyle(e).fontSize),height:e.getBoundingClientRect().height})),color:getComputedStyle(document.body).color};
    });
    assert.equal(result.overflow,false,page.url());assert.deepEqual(result.broken,[],page.url());
    assert.ok(result.footer.every(link=>link.size>=16&&link.height>=44),page.url()+' '+JSON.stringify(result.footer));checks++;
  }
  async function checkBasketOverview(width){
    const cards=page.locator('#koerbe .korb-card');
    assert.equal(await cards.count(),3);
    assert.equal(await page.locator('#koerbe h2').innerText(),'Geschenkskörbe auf einen Blick');
    const expected=[['Chli & Fii',3,'CHF 19.95','chili'],['Fein & Guet',5,'CHF 29.95','fein'],['Gross & Guet',6,'CHF 49.95','gross']];
    for(let i=0;i<expected.length;i++){
      const card=cards.nth(i),[name,count,price,variant]=expected[i];
      assert.equal(await card.locator('h3').innerText(),name);
      assert.equal(await card.locator('.korb-card-contents li').count(),count);
      assert.equal(await card.locator('.korb-card-contents').isVisible(),true);
      assert.equal((await card.locator('.korb-card-price').innerText()).trim(),price);
      const choice=card.locator('.korb-card-link');
      assert.equal(await choice.innerText(),'Diesen Korb auswählen');
      assert.equal(await choice.getAttribute('data-open'),variant);
      assert.ok(await choice.evaluate(e=>e.getBoundingClientRect().height>=44));
      assert.equal(await card.locator('.korb-card-photo img').getAttribute('tabindex'),'0');
      const headingStyle=await card.locator('h3').evaluate(e=>({color:getComputedStyle(e).color,weight:Number(getComputedStyle(e).fontWeight),size:parseFloat(getComputedStyle(e).fontSize)}));
      assert.equal(headingStyle.color,'rgb(0, 0, 0)');assert.ok(headingStyle.weight>=700&&headingStyle.size>=20);
      const listStyle=await card.locator('.korb-card-contents li').first().evaluate(e=>parseFloat(getComputedStyle(e).fontSize));assert.ok(listStyle>=14);
    }
    if(width<=720){const y=await cards.evaluateAll(es=>es.map(e=>e.getBoundingClientRect().top));assert.ok(y[0]<y[1]&&y[1]<y[2],JSON.stringify(y))}
    checks++;
    if(width===390){
      const photo=cards.first().locator('.korb-card-photo img');
      await photo.press('Enter');assert.equal(await page.locator('#lb').evaluate(e=>e.classList.contains('on')),true);
      assert.ok(await page.locator('#li').evaluate(img=>img.naturalWidth>0));
      await page.keyboard.press('Escape');assert.equal(await page.locator('#lb').evaluate(e=>e.classList.contains('on')),false);
      assert.equal(await photo.evaluate(e=>e===document.activeElement),true);checks++;
      const details=cards.first().locator('.korb-card-more');await details.locator('summary').click();
      const second=details.locator('.korb-card-second-foto img');await second.press('Enter');
      assert.equal(await page.locator('#lb').evaluate(e=>e.classList.contains('on')),true);
      await page.getByRole('button',{name:'Schliessen',exact:true}).click();
      assert.equal(await page.locator('#lb').evaluate(e=>e.classList.contains('on')),false);checks++;
    }
  }
  const views=['start','koerbe','gartenprodukte','traubensaft','suessmost','essig','doerrfruechte','tee','ueber-uns','laedeli','lucia-kocht','otto-garten','abholung','faq','kontakt'];
  for(const width of [320,360,390,768,1440]){
    await page.setViewportSize({width,height:900});await page.emulateMedia({colorScheme:'dark'});
    for(const view of views){await page.goto(origin+'/index.html#'+view);await page.waitForFunction(v=>document.body.dataset.currentView===v,view);await layout();if(view==='koerbe')await checkBasketOverview(width)}
    for(const file of ['geschenkskoerbe.html','firmengeschenke.html','warenkorb.html','404.html']){await page.goto(origin+'/'+file);await layout()}
    await page.goto(origin+'/shop-vorschau.html');await page.locator('.shop-card').first().waitFor();await layout();
    assert.equal(await page.locator('h1').innerText(),'Feines aus unserem Lädeli');
    assert.equal(await page.locator('.shop-section-title').count(),6);
    assert.equal(await page.locator('#shop-count').innerText(),'19 von 19 Produkten');
    const titleStyles=await page.locator('.shop-product-title').evaluateAll(elements=>elements.map(e=>({color:getComputedStyle(e).color,weight:getComputedStyle(e).fontWeight,size:parseFloat(getComputedStyle(e).fontSize)})));
    assert.ok(titleStyles.every(s=>s.color==='rgb(0, 0, 0)'&&Number(s.weight)>=700&&s.size>=16));checks++;
    if(width<=600){
      for(const details of await page.locator('.shop-mobile-details').all()){
        assert.equal(await details.isVisible(),true);await details.locator('summary').click();assert.equal(await details.locator('.shop-description').isVisible(),true);await details.locator('summary').click();checks++;
      }
    }
    for(const button of await page.locator('.shop-photo-open').all()){
      if(!await button.isVisible())continue;
      await button.click();await page.locator('.shop-photo-viewer img').evaluate(img=>Promise.race([img.decode(),new Promise((_,reject)=>setTimeout(()=>reject(new Error('Photo decode timed out: '+img.src)),5000))]));
      assert.ok(await page.locator('.shop-photo-viewer img').evaluate(img=>img.naturalWidth>0));
      await page.getByRole('button',{name:'Foto schliessen',exact:true}).click();photoChecks++;console.log('Photo checks: '+photoChecks);
    }
    for(const extra of await page.locator('.shop-card>details:not(.shop-mobile-details)').all()){
      await extra.locator('summary').click();
      for(const button of await extra.locator('.shop-photo-open').all()){await button.click();await page.locator('.shop-photo-viewer img').evaluate(img=>Promise.race([img.decode(),new Promise((_,reject)=>setTimeout(()=>reject(new Error('Photo decode timed out: '+img.src)),5000))]));await page.getByRole('button',{name:'Foto schliessen',exact:true}).click();photoChecks++}
      await extra.locator('summary').click();
    }
    const first=page.locator('.shop-photo-open').first();await first.click();await page.keyboard.press('Escape');assert.equal(await page.locator('.shop-photo-viewer').evaluate(e=>e.open),false);assert.equal(await first.evaluate(e=>e===document.activeElement),true);checks++;
    await page.getByLabel('Produkt suchen',{exact:true}).fill('himbeer');assert.equal(await page.locator('#shop-count').innerText(),'3 von 19 Produkten');
    await page.getByLabel('Produkt suchen',{exact:true}).fill('zzzzkeinprodukt');assert.match(await page.locator('#shop-products').innerText(),/Keine passenden Produkte/);
    await page.getByLabel('Produkt suchen',{exact:true}).fill('');await page.locator('#shop-category').selectOption('Essig & Balsamico');assert.equal(await page.locator('#shop-count').innerText(),'7 von 19 Produkten');assert.deepEqual(await page.locator('.shop-sizes').allTextContents(),Array(7).fill('250 ml'));checks++;
    await page.goto(origin+'/shop-vorschau.html?kategorie=Geschenksharassen');await page.locator('.shop-card').first().waitFor();assert.equal(await page.locator('.shop-card--gift').count(),3);await layout();
    await page.screenshot({path:path.join(out,'geschenksharassen-'+width+'.png'),fullPage:true});
    await page.goto(origin+'/shop-vorschau.html');await page.locator('.shop-card').first().waitFor();await page.screenshot({path:path.join(out,'sortiment-'+width+'.png'),fullPage:true});
  }
  await page.goto(origin+'/warenkorb.html');await page.getByRole('button',{name:'Chli & Fii hinzufügen',exact:true}).click();await page.getByRole('button',{name:'Gross & Guet hinzufügen',exact:true}).click();
  assert.match(await page.locator('#cart-checkout').getAttribute('href'),/53868017549578:1,53868017647882:1/);assert.equal(await page.locator('#cart-total').innerText(),'Zwischensumme · CHF 69.90');checks++;
  await page.getByLabel('Anzahl Chli & Fii',{exact:true}).fill('2');await page.getByLabel('Anzahl Chli & Fii',{exact:true}).press('Tab');assert.equal(await page.locator('#cart-total').innerText(),'Zwischensumme · CHF 89.85');await page.reload();assert.equal(await page.getByLabel('Anzahl Chli & Fii',{exact:true}).inputValue(),'2');checks++;
  await page.getByRole('button',{name:'Gross & Guet entfernen',exact:true}).click();assert.equal(await page.locator('#cart-total').innerText(),'Zwischensumme · CHF 39.90');await layout();
  await page.screenshot({path:path.join(out,'warenkorb.png'),fullPage:true});
  await page.goto(origin+'/index.html#l-impressum');await page.locator('#lgx').waitFor({state:'visible'});await page.keyboard.press('Escape');assert.equal(await page.locator('#lg').getAttribute('aria-hidden'),'true');checks++;
  const noJs=await browser.newContext({javaScriptEnabled:false});await noJs.route('**/*',r=>r.request().url().startsWith(origin)?r.continue():r.abort());const fallback=await noJs.newPage();await fallback.goto(origin+'/shop-vorschau.html');assert.match(await fallback.locator('noscript').innerText(),/Apfelessig/);await noJs.close();checks++;
  assert.deepEqual(errors,[]);const result={checks,photoChecks,errors,screenshots:out};fs.writeFileSync(path.join(out,'result.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
}catch(error){if(page)await page.screenshot({path:path.join(out,'failure.png'),fullPage:true}).catch(()=>{});throw error}finally{await browser?.close();await new Promise(resolve=>server.close(resolve))}
