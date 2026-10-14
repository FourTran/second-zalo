import assert from 'node:assert/strict';
import {test} from 'node:test';
import {RELEASE_FEATURES,safeDiagnosticCode,validatePublicAccountMetadata,safeErrorSummary} from '../src/security/securityPolicy.ts';

test('real message and native Zalo features remain hard-disabled',()=>{
  for(const value of Object.values(RELEASE_FEATURES))assert.equal(value,false);
  assert.equal(Object.isFrozen(RELEASE_FEATURES),true);
});
test('only safe diagnostic categories are exposed',()=>{
  assert.equal(safeDiagnosticCode('redirect-blocked'),'redirect-blocked');
  assert.equal(safeDiagnosticCode('token=private'),'unknown');
  assert.equal(safeDiagnosticCode({password:'secret'}),'unknown');
  assert.equal(safeErrorSummary({credentials:'private'}).includes('private'),false);
});
test('metadata schema refuses credentials, cookies or message contents',()=>{
  assert.deepEqual(validatePublicAccountMetadata({id:'hub-B',label:'B'}),{id:'hub-B',label:'B'});
  for(const candidate of [
    {id:'hub-A',label:'A'}, {id:'hub-B',label:'B',cookie:'secret'},
    {id:'hub-B',label:'B',password:'secret'}, {id:'hub-B',label:'C'},
    {id:'hub-B',label:'B',message:'hello'}, null
  ])assert.equal(validatePublicAccountMetadata(candidate),null);
});
