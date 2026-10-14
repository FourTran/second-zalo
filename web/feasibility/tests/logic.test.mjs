import assert from 'node:assert/strict';
import {test} from 'node:test';
import {createState,recordOutcome,selectPlatform,formatReport,summarize,OFFICIAL_WEB_URL,OUTCOMES} from '../logic.mjs';

test('only official Zalo Web URL is used as the manual test target',()=>{
 assert.equal(OFFICIAL_WEB_URL,'https://chat.zalo.me/');
 assert.equal(OUTCOMES.some(o=>o.id==='verified'),false);
});
test('records per-account observations without claiming connected sessions',()=>{
 const s=createState();const b=recordOutcome(s,'B','login-screen');
 const c=recordOutcome(b,'C','store-redirect');
 assert.equal(s.observations.B,'not-tested');
 assert.equal(c.observations.B,'login-screen');
 assert.equal(c.observations.C,'store-redirect');
 assert.match(summarize(c).conclusion,/unverified/);
});
test('changing device resets prior observations',()=>{
 const s=recordOutcome(createState(),'B','manual-chat');
 const changed=selectPlatform(s,'android-chrome');
 assert.equal(changed.observations.B,'not-tested');
 assert.equal(changed.platform,'android-chrome');
});
test('anonymous report never contains credentials or a claimed account session',()=>{
 const report=formatReport(recordOutcome(createState(),'B','manual-chat'));
 assert.match(report,/SELF-REPORTED/);
 assert.match(report,/Isolation: NOT VERIFIED/);
 assert.doesNotMatch(report,/password|cookie|token/i);
});
test('rejects unsupported account labels, outcomes, and devices',()=>{
 assert.throws(()=>recordOutcome(createState(),'A','login-screen'),/Invalid/);
 assert.throws(()=>recordOutcome(createState(),'B','authenticated-and-verified'),/Invalid/);
 assert.throws(()=>createState('unknown-device'),/Invalid/);
});

test('known iPhone B redirect is pre-recorded rather than requesting repeat testing',()=>{
 for(const platform of ['iphone-safari','iphone-chrome']) {
  const state=createState(platform);
  assert.equal(state.observations.B,'store-redirect');
  assert.equal(state.observations.C,'not-tested');
  assert.match(formatReport(state),/Redirected to app or store/);
 }
 assert.equal(createState('desktop-browser').observations.B,'not-tested');
});
