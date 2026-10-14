import assert from 'node:assert/strict';
import { test } from 'node:test';
import { acceptSyntheticNotice, livePersonalSourceSupported, SyntheticEventLedger } from '../src/events/sourceGate.ts';
const demo = (id='event_00001',accountId='hub-B')=>({type:'synthetic_message',source:'synthetic-test',id,accountId,occurredAt:12345});
test('personal Zalo event source is permanently unavailable in this build',()=>{
  assert.equal(livePersonalSourceSupported(),false);
  assert.equal(livePersonalSourceSupported({source:'personal-zalo',documentedInterface:true,platformVerified:true,authorizedByOwner:true}),false);
});
test('synthetic notice must be strictly account-scoped and content-free',()=>{
  assert.deepEqual(acceptSyntheticNotice(demo()),demo());
  for(const item of [
    {...demo(),accountId:'hub-A'}, {...demo(),accountId:'hub-B/path'},
    {...demo(),source:'personal-zalo'}, {...demo(),type:'incoming_message'},
    {...demo(),body:'SECRET'}, {...demo(),occurredAt:Infinity}, {...demo(),id:'bad'}
  ])assert.equal(acceptSyntheticNotice(item),null);
});
test('ledger deduplicates synthetic identifiers and isolates accounts',()=>{
  const l=new SyntheticEventLedger(3);
  assert.equal(l.ingest(demo()),'accepted');
  assert.equal(l.ingest(demo()),'duplicate');
  assert.equal(l.ingest(demo('event_00002','hub-C')),'accepted');
  assert.deepEqual(l.byAccount('hub-B').map(e=>e.id),['event_00001']);
  l.clearAccount('hub-B');
  assert.equal(l.byAccount('hub-C').length,1);
  assert.equal(l.byAccount('hub-B').length,0);
});
test('bounded ledger evicts oldest and rejects invalid source input',()=>{
  const l=new SyntheticEventLedger(2);
  assert.equal(l.ingest({foo:'bar'}),'rejected');
  l.ingest(demo('event_00001'));
  l.ingest(demo('event_00002'));
  l.ingest(demo('event_00003'));
  assert.deepEqual(l.byAccount('hub-B').map(e=>e.id),['event_00002','event_00003']);
  assert.equal(l.ingest(demo('event_00001')),'accepted');
  assert.throws(()=>new SyntheticEventLedger(0),/capacity/);
});
