import assert from 'node:assert/strict';
import { test } from 'node:test';
import { classifyWebNavigation } from '../src/feasibility/webNavigationPolicy.ts';

test('permits only the known official Zalo web origin and subdomains', () => {
  assert.deepEqual(classifyWebNavigation('https://chat.zalo.me/'), { kind:'official-site', hostname:'chat.zalo.me', allow:true });
  assert.equal(classifyWebNavigation('https://id.zalo.me/').allow, true);
  assert.equal(classifyWebNavigation('https://zalo.me/').allow, true);
});
test('recognizes known App Store and Google Play redirects without following them', () => {
  for (const url of ['https://apps.apple.com/app/id123','https://itunes.apple.com/app/id123','https://play.google.com/store/apps/details?id=com.zalo']) {
    const result = classifyWebNavigation(url);
    assert.equal(result.kind, 'store-redirect');
    assert.equal(result.allow, false);
  }
});
test('blocks lookalike domains and arbitrary external links', () => {
  for (const url of ['https://zalo.me.evil.test/','https://chat.zalo.me.attacker.test/','https://another-site.com/','https://evil.test@other.test/']) {
    assert.deepEqual(classifyWebNavigation(url).allow, false);
  }
});
test('never permits app schemes, intent links, local files or insecure HTTP', () => {
  for (const url of ['zalo://home','intent://chat','#fragment','file:///etc/passwd','javascript:alert(1)','http://chat.zalo.me/']) {
    assert.equal(classifyWebNavigation(url).allow, false);
  }
});
test('rejects embedded credentials and nonstandard ports', () => {
  assert.equal(classifyWebNavigation('https://user:secret@chat.zalo.me/').allow, false);
  assert.equal(classifyWebNavigation('https://chat.zalo.me:444/path').allow, false);
});
test('returns origin hostname only, never sensitive path/query/fragment', () => {
  const result = classifyWebNavigation('https://chat.zalo.me/sensitive/path?token=SECRET#PRIVATE');
  const repr = JSON.stringify(result);
  assert.equal(result.kind, 'official-site');
  assert.equal(repr.includes('SECRET'), false);
  assert.equal(repr.includes('PRIVATE'), false);
  assert.equal(repr.includes('sensitive'), false);
});
test('rejects malformed URLs without throwing', () => {
  assert.deepEqual(classifyWebNavigation('not a url'), {kind:'invalid-url',hostname:null,allow:false});
});
