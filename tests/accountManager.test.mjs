import assert from 'node:assert/strict';
import { test } from 'node:test';
import { AccountManager, MemoryAccountMetadataStore, SessionNotVerifiedError } from '../src/sessions/accountManager.ts';
import { UnavailableSessionAdapter } from '../src/core/sessionAdapter.ts';

async function manager(platform='ios', adapter=new UnavailableSessionAdapter('webview'), store=new MemoryAccountMetadataStore()) {
  const x=new AccountManager(platform,adapter,store);
  await x.initialize();
  return x;
}
function provenAdapter(overrides={}) {
  const states=new Map();
  const calls=[];
  return {
    kind:'remote-browser', states,calls,
    async feasibility(platform) { return { platform, officialLoginSupported:true, manualMessagingSupported:true, independentlyIsolatedStorage:true, ...overrides }; },
    async connect(id) { calls.push(['connect',id]); states.set(id,'authenticated'); return { accountId:id, state:'authenticated', lastCheckedAt:new Date().toISOString() }; },
    async getStatus(id) { return {accountId:id,state:states.get(id)||'disconnected',lastCheckedAt:new Date().toISOString()}; },
    async disconnect(id) { calls.push(['disconnect',id]); states.set(id,'disconnected'); },
    async destroy(id) { calls.push(['destroy',id]); states.delete(id); },
  };
}

test('requires initialization before reads and writes',async()=>{
  const a=new AccountManager('ios'); assert.throws(()=>a.list(),/Initialize/);
  await assert.rejects(a.add('B'),/Initialize/);
});
test('creates B, C independently and prevents native Account A',async()=>{
  const a=await manager(); await a.add('B'); await a.add('c');
  assert.deepEqual(a.list().map(x=>x.id),['hub-B','hub-C']);
  assert.ok(a.list().every(x=>x.state==='unavailable'));
  await assert.rejects(a.add('A'),/B through Z/);
  await assert.rejects(a.add('C'),/already exists/);
});
test('does not expose mutable internal state',async()=>{
  const a=await manager();await a.add('B');a.list()[0].label='Injected';
  assert.equal(a.get('hub-B').label,'B');
});
test('fail-closed adapters cannot connect on iOS or Android',async()=>{
  for(const platform of ['ios','android']) {
    const a=await manager(platform);await a.add('B');
    await assert.rejects(a.connect('hub-B'),SessionNotVerifiedError);
    assert.equal(a.get('hub-B').state,'unavailable');
  }
});
test('partial capability proof never calls connect',async()=>{
  const adapter=provenAdapter({independentlyIsolatedStorage:'unverified'});
  const a=await manager('ios',adapter); await a.add('B');
  await assert.rejects(a.connect('hub-B'),SessionNotVerifiedError);
  assert.deepEqual(adapter.calls,[]);
});
test('authorized test adapter keeps B and C separate on disconnect',async()=>{
  const adapter=provenAdapter();const a=await manager('android',adapter);
  await a.add('B');await a.add('C');await a.connect('hub-B');await a.connect('hub-C');
  await a.disconnect('hub-B');
  assert.equal(a.get('hub-B').state,'disconnected');
  assert.equal(a.get('hub-C').state,'authenticated');
  assert.deepEqual(adapter.calls.slice(-1),[['disconnect','hub-B']]);
});
test('delete B does not touch C; metadata is removed only after session destruction',async()=>{
  const adapter=provenAdapter(); const store=new MemoryAccountMetadataStore();
  const a=await manager('ios',adapter,store);
  await a.add('B');await a.add('C');await a.remove('hub-B');
  assert.deepEqual(a.list().map(x=>x.id),['hub-C']);
  assert.deepEqual((await store.list()).map(x=>x.id),['hub-C']);
  assert.deepEqual(adapter.calls,[['destroy','hub-B']]);
});
test('failed destruction keeps account metadata for recovery',async()=>{
  const adapter=provenAdapter(); adapter.destroy=async()=>{throw new Error('cleanup failed');};
  const store=new MemoryAccountMetadataStore(); const a=await manager('ios',adapter,store);
  await a.add('B');await assert.rejects(a.remove('hub-B'),/cleanup failed/);
  assert.equal(a.list().length,1);assert.equal((await store.list()).length,1);
});
test('startup restores labels only, never claims authenticated session',async()=>{
  const store=new MemoryAccountMetadataStore();
  const first=await manager('ios',provenAdapter(),store);
  await first.add('B');await first.connect('hub-B');
  const restored=await manager('ios',provenAdapter(),store);
  assert.equal(restored.get('hub-B').state,'unavailable');
});
test('bad adapter cannot authenticate an account with mismatched identity',async()=>{
  const adapter=provenAdapter();
  adapter.connect=async id=>({accountId:'hub-C',state:'authenticated',lastCheckedAt:''});
  const a=await manager('ios',adapter); await a.add('B');
  await assert.rejects(a.connect('hub-B'),/requested account/);
  assert.equal(a.get('hub-B').state,'unavailable');
});
test('refresh status cannot trust an unverified adapter',async()=>{
  const a=await manager();await a.add('B');
  assert.equal((await a.refreshStatus('hub-B')).state,'unavailable');
});
test('unknown account operations are rejected',async()=>{
  const a=await manager();
  await assert.rejects(a.connect('hub-A'),/Unknown/);
  await assert.rejects(a.remove('hub-A'),/Unknown/);
});
test('serializes operations on the same account',async()=>{
  let resolve;
  const adapter=provenAdapter();
  adapter.connect=async id=>new Promise(r=>{resolve=()=>r({accountId:id,state:'authenticated',lastCheckedAt:''});});
  const a=await manager('android',adapter); await a.add('B');
  const pending=a.connect('hub-B');
  await assert.rejects(a.remove('hub-B'),/already in progress/);
  await new Promise(setImmediate); resolve();await pending; assert.equal(a.get('hub-B').state,'authenticated');
});
