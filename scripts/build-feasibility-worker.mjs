/**
 * Bundle static web feasibility assets into a standalone Cloudflare Worker.
 * No build-time network, Zalo access, account data, cookies or secrets.
 * This generates a file; it NEVER deploys to Cloudflare.
 */
import {readFileSync, mkdirSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
const root=resolve('web/feasibility');
const files=[
  ['index.html','text/html; charset=utf-8'],
  ['style.css','text/css; charset=utf-8'],
  ['logic.mjs','text/javascript; charset=utf-8'],
  ['app.mjs','text/javascript; charset=utf-8'],
];
const assets=Object.fromEntries(files.map(([name,type])=>['/'+name,{type,body:readFileSync(resolve(root,name),'utf8')}]));
assets['/']=assets['/index.html'];
const responseCode=`
const ASSETS=${JSON.stringify(assets)};
addEventListener('fetch',event=>{
  const request=event.request;
  const pathname=new URL(request.url).pathname;
  const asset=ASSETS[pathname];
  const headers={
    'Cache-Control':'no-store',
    'Referrer-Policy':'no-referrer',
    'X-Content-Type-Options':'nosniff',
    'X-Robots-Tag':'noindex, nofollow',
    'Content-Security-Policy':"default-src 'none'; script-src 'self'; style-src 'self'; connect-src 'none'; img-src 'none'; form-action 'none'; base-uri 'none'; object-src 'none'; frame-src 'none'"
  };
  if (!asset) {event.respondWith(new Response('Not found',{status:404,headers}));return;}
  if (!['GET','HEAD'].includes(request.method)) {event.respondWith(new Response('Method not allowed',{status:405,headers}));return;}
  headers['Content-Type']=asset.type;
  event.respondWith(new Response(request.method==='HEAD'?null:asset.body,{status:200,headers}));
});
`;
mkdirSync('dist',{recursive:true});
writeFileSync('dist/zalo-hub-feasibility-worker.js',responseCode,'utf8');
console.log('Generated static feasibility Worker (not deployed), routes:',Object.keys(assets).join(', '));
