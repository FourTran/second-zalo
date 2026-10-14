import assert from 'node:assert/strict';
import { test } from 'node:test';
import worker from '../src/backend/syntheticWorker.ts';

const TOKEN = 'development-only-placeholder-token-min32';
function req(data, auth=TOKEN, pathname='/v1/dev/synthetic-events') {
  return new Request('https://localhost'+pathname, {
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization':'Bearer '+auth},
    body:JSON.stringify(data),
  });
}
const good = {eventId:'evt_example_0001',accountId:'demo-B',kind:'synthetic_message'};
function fakeDb() {
  const recorded=[];
  return {recorded,prepare(sql) {
    assert.match(sql,/INSERT OR IGNORE INTO synthetic_events/);
    return {bind(...values) { return {run: async()=> {recorded.push(values);return {success:true};}};}};
  }};
}
const dev=(db=fakeDb())=>({ENVIRONMENT:'development',SYNTHETIC_EVENTS_ENABLED:'true',DEV_TEST_TOKEN:TOKEN,DB:db});

test('health reports real Zalo and push disabled',async()=>{
  const r=await worker.fetch(new Request('https://localhost/health'),{});
  assert.equal(r.status,200);
  assert.equal((await r.json()).liveZaloConnected,false);
});

test('write route fails closed by default and under production environment',async()=>{
  assert.equal((await worker.fetch(req(good),{})).status,403);
  assert.equal((await worker.fetch(req(good),{...dev(),ENVIRONMENT:'production'})).status,403);
  assert.equal((await worker.fetch(req(good),{...dev(),SYNTHETIC_EVENTS_ENABLED:'false'})).status,403);
});
test('requires a long secret and valid authorization',async()=>{
  assert.equal((await worker.fetch(req(good,'incorrect'),dev())).status,401);
  assert.equal((await worker.fetch(req(good),{...dev(),DEV_TEST_TOKEN:'tiny'})).status,401);
});
test('allows synthetic event only, never message bodies or real account IDs',async()=>{
  const env=dev();const bad=[{...good, accountId:'real-B'},{...good,kind:'zalo_message'},{...good,message:'private'},{...good,eventId:'x'}];
  for(const data of bad) assert.equal((await worker.fetch(req(data),env)).status,400);
  assert.equal(env.DB.recorded.length,0);
});
test('inserts only synthetic metadata into D1 adapter',async()=>{
  const db=fakeDb();
  const response=await worker.fetch(req(good),dev(db));
  assert.equal(response.status,202);
  assert.deepEqual(db.recorded,[['evt_example_0001','demo-B','synthetic_message']]);
  assert.equal((await response.json()).synthetic,true);
});
test('rejects missing storage, wrong content type and unknown paths',async()=>{
  assert.equal((await worker.fetch(req(good),{...dev(),DB:undefined})).status,503);
  const textReq=new Request('https://localhost/v1/dev/synthetic-events',{method:'POST',headers:{'Authorization':'Bearer '+TOKEN},body:'plaintext'});
  assert.equal((await worker.fetch(textReq,dev())).status,415);
  assert.equal((await worker.fetch(req(good,TOKEN,'/other'),dev())).status,404);
});
