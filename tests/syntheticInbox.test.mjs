import assert from 'node:assert/strict';
import {test} from 'node:test';
import {routeSyntheticNotice,SyntheticInbox} from '../src/notifications/syntheticInbox.ts';
const event=(id='sample_00001',accountId='hub-B')=>({id,accountId,source:'synthetic-test',type:'synthetic_message',occurredAt:12345});
test('routes synthetic account B/C to local app only',()=>{
  assert.deepEqual(routeSyntheticNotice(event()),{pathname:'/accounts/[accountId]',params:{accountId:'hub-B'}});
  assert.deepEqual(routeSyntheticNotice(event('sample_00002','hub-C')).params,{accountId:'hub-C'});
});
test('rejects account A and live event sources',()=>{
  for(const v of [event('sample_00001','hub-A'),{...event(),source:'personal-zalo'},{...event(),url:'zalo://open'},'invalid']) {
    if(typeof v==='object'&&v!==null&&'url'in v) { // additional fields must not authorize external routing
      assert.equal(routeSyntheticNotice(v).pathname,'/accounts/[accountId]');
    } else assert.equal(routeSyntheticNotice(v),null);
  }
});
test('inbox independently acknowledges and removes account-scoped mock alerts',()=>{
  const box=new SyntheticInbox();
  assert.equal(box.add(event()),true);assert.equal(box.add(event()),false);
  box.add(event('sample_00002','hub-C'));
  assert.equal(box.markViewed('sample_00001'),true);
  assert.equal(box.list('hub-C')[0].viewed,false);
  box.clearAccount('hub-B');
  assert.deepEqual(box.list().map(x=>x.accountId),['hub-C']);
});
test('bounded memory and defensive copies',()=>{
  const box=new SyntheticInbox(2);
  for(let i=1;i<=3;i++)box.add(event('sample_0000'+i));
  assert.deepEqual(box.list().map(x=>x.id),['sample_00003','sample_00002']);
  box.list()[0].viewed=true;
  assert.equal(box.list()[0].viewed,false);
  assert.throws(()=>new SyntheticInbox(0),/limit/);
});
