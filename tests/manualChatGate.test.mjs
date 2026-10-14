import assert from 'node:assert/strict';
import { test } from 'node:test';
import { manualChatEligibility, validCompanionAccountRoute } from '../src/messaging/manualChatGate.ts';

const account={id:'hub-B',label:'B',state:'authenticated'};
const proof={platform:'ios',officialLoginSupported:true,manualMessagingSupported:true,independentlyIsolatedStorage:true};
test('accepts only companion account route identifiers',()=>{
  assert.equal(validCompanionAccountRoute('hub-B'),true);
  assert.equal(validCompanionAccountRoute('hub-Z'),true);
  for(const input of ['hub-A','hub-AA','hub-b','../hub-B','hub-B/chat','other','hub-B?token=1','']) {
    assert.equal(validCompanionAccountRoute(input),false);
  }
});
test('cannot enter personal chat for unknown or native account',()=>{
  assert.equal(manualChatEligibility({platform:'ios',supportedViewerRegistered:false,feasibility:proof}), 'unknown-account');
  assert.equal(manualChatEligibility({account:{...account,id:'hub-A'},platform:'ios',supportedViewerRegistered:false,feasibility:proof}), 'unknown-account');
});
test('unauthenticated account cannot display chat',()=>{
  for(const state of ['disconnected','unavailable','expired','authenticating']) {
    assert.equal(manualChatEligibility({account:{...account,state},platform:'ios',feasibility:proof,supportedViewerRegistered:true}),'not-authenticated');
  }
});
test('an unverified capability cannot unlock real messaging',()=>{
  assert.equal(manualChatEligibility({account,platform:'ios',supportedViewerRegistered:true}),'adapter-unverified');
  assert.equal(manualChatEligibility({account,platform:'ios',feasibility:{...proof,manualMessagingSupported:'unverified'},supportedViewerRegistered:true}),'adapter-unverified');
  assert.equal(manualChatEligibility({account,platform:'android',feasibility:proof,supportedViewerRegistered:true}),'adapter-unverified');
});
test('even verified metadata cannot display chat without registered supported viewer',()=>{
  assert.equal(manualChatEligibility({account,platform:'ios',feasibility:proof,supportedViewerRegistered:false}),'viewer-unavailable');
});
test('eligible requires every independent gate true (unit fixture only)',()=>{
  assert.equal(manualChatEligibility({account,platform:'ios',feasibility:proof,supportedViewerRegistered:true}),'eligible');
});
