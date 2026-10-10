import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
test('local preview serves JavaScript modules and images with correct MIME types',async t=>{
  const child=spawn(process.execPath,['scripts/serve.mjs'],{cwd:fileURLToPath(new URL('..',import.meta.url)),stdio:['ignore','pipe','pipe']});
  t.after(()=>child.kill());
  await new Promise((resolve,reject)=>{
    const timer=setTimeout(()=>reject(new Error('Preview server did not start')),5000);
    child.stdout.once('data',()=>{clearTimeout(timer);resolve()});
    child.once('error',error=>{clearTimeout(timer);reject(error)});
    child.once('exit',code=>{clearTimeout(timer);if(code)reject(new Error('Preview server exited: '+code))});
  });
  for(const [path,type] of [['js/shop-preview.mjs','text/javascript'],['img/Birnenweggen.png','image/png'],['img/Birnenweggen.png.webp','image/webp']]){
    const response=await fetch('http://127.0.0.1:8080/'+path,{method:'HEAD'});
    assert.equal(response.status,200);assert.ok(response.headers.get('content-type').startsWith(type));
  }
});
