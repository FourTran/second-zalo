import assert from 'node:assert/strict';
import {test} from 'node:test';
import {assessRemoteDesktopProof, PROOF_STEPS, validateRemoteDesktopUrl} from '../src/feasibility/remoteDesktopProof.ts';

test('must configure a private HTTPS desktop before claiming access',()=>{
  const a=assessRemoteDesktopProof({results:{}});
  assert.equal(a.stage,'host-required');
  assert.equal(a.privateDesktopAvailable,false);
  assert.equal(a.realZaloIntegrationEnabled,false);
});
test('remote endpoint cannot contain credentials, app schemes, token query or local URL',()=>{
  for(const url of [
    'http://desktop.example.com/', 'https://user:secret@desktop.example.com/',
    'https://desktop.example.com/?token=secret','https://desktop.example.com/path',
    'https://127.0.0.1/','https://desktop.local/','zalo://launch','not-a-url',
  ]) assert.equal(validateRemoteDesktopUrl(url),null);
  assert.equal(validateRemoteDesktopUrl('https://desktop.example.com/'),'https://desktop.example.com/');
});
test('login attempts remain blocked until hosting, Zalo policy and MFA are reviewed',()=>{
  const r=assessRemoteDesktopProof({accessUrl:'https://desktop.example.com/',results:{
    'private-host-provisioned':'pass','trusted-https-and-mfa':'pass'
  }});
  assert.equal(r.stage,'security-required');
  assert.equal(r.privateDesktopAvailable,false);
  assert.equal(r.missingSteps.includes('zalo-usage-reviewed'),true);
});
test('even a complete hypothetical checklist never enables live messaging or push',()=>{
  const record={accessUrl:'https://desktop.example.com/',results:
    Object.fromEntries(PROOF_STEPS.map(step=>[step,'pass']))};
  const r=assessRemoteDesktopProof(record);
  assert.equal(r.stage,'evidence-review-needed');
  assert.equal(r.privateDesktopAvailable,true);
  assert.equal(r.realZaloIntegrationEnabled,false);
  assert.equal(r.notificationIntegrationEnabled,false);
});
test('manual failure and untested are not silently upgraded',()=>{
  const r=assessRemoteDesktopProof({accessUrl:'https://desktop.example.com/',results:{
    'zalo-usage-reviewed':'pass','private-host-provisioned':'pass',
    'trusted-https-and-mfa':'pass','official-desktop-login':'fail',
    'iphone-desktop-access':'untested'
  }});
  assert.equal(r.stage,'feasibility-untested');
  assert.equal(r.missingSteps.includes('official-desktop-login'),true);
});
