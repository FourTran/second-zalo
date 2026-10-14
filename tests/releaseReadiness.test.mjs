import assert from 'node:assert/strict';
import {test} from 'node:test';
import {assessReleaseReadiness, MANDATORY_RELEASE_GATES} from '../src/release/releaseReadiness.ts';

test('prototype is blocked for production by default',()=>{
  const r=assessReleaseReadiness();
  assert.equal(r.status,'blocked');
  assert.equal(r.missing.length,MANDATORY_RELEASE_GATES.length);
  assert.equal(r.liveFeaturesEnabled,false);
});
test('all asserted passed gates still cannot release a build with no real integration',()=>{
  const evidence=MANDATORY_RELEASE_GATES.map(gate=>({gate,state:'passed',evidenceUrl:'https://example.org/test'}));
  const r=assessReleaseReadiness(evidence);
  assert.equal(r.status,'blocked');
  assert.equal(r.cause,'real-zalo-integration-not-implemented');
  assert.equal(r.liveFeaturesEnabled,false);
});
test('unverified gates and non-https evidence cannot count as checked',()=>{
  const r=assessReleaseReadiness([
    {gate:'ios-signed-device-build',state:'passed',evidenceUrl:'http://insecure.invalid'},
    {gate:'android-signed-device-build',state:'unverified',evidenceUrl:'https://example.org/a'},
  ]);
  assert.equal(r.missing.includes('ios-signed-device-build'),true);
  assert.equal(r.missing.includes('android-signed-device-build'),true);
});
