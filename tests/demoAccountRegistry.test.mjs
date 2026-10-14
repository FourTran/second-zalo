import assert from 'node:assert/strict';
import { test } from 'node:test';
import { DemoAccountRegistry } from '../src/core/demoAccountRegistry.ts';
import { UnavailableSessionAdapter } from '../src/core/sessionAdapter.ts';

test('creates multiple clearly synthetic demo accounts', () => {
  const accounts = new DemoAccountRegistry(['B', 'C']);
  assert.deepEqual(accounts.list().map(a => a.label), ['B', 'C']);
  assert.ok(accounts.list().every(a => a.status === 'simulation-only' && a.origin === 'synthetic'));
});

test('removing B leaves C unchanged', () => {
  const accounts = new DemoAccountRegistry(['B', 'C']);
  const [b, c] = accounts.list();
  assert.equal(accounts.remove(b.id), true);
  assert.deepEqual(accounts.list(), [c]);
  assert.equal(accounts.remove(b.id), false);
});

test('rejects native Account A, empty and duplicate labels', () => {
  const accounts = new DemoAccountRegistry(['B']);
  assert.throws(() => accounts.add('A'), /native Zalo/);
  assert.throws(() => accounts.add('a'), /native Zalo/);
  assert.throws(() => accounts.add('  '), /label/);
  assert.throws(() => accounts.add(' b '), /already exists/);
  assert.throws(() => accounts.add('x'.repeat(41)), /label/);
});

test('records returned by list cannot mutate registry', () => {
  const accounts = new DemoAccountRegistry(['B']);
  accounts.list()[0].label = 'Changed';
  assert.equal(accounts.list()[0].label, 'B');
});

test('new IDs are not recycled after removing demo accounts', () => {
  const accounts = new DemoAccountRegistry(['B', 'C']);
  const bId = accounts.list()[0].id;
  accounts.remove(bId);
  assert.notEqual(accounts.add('D').id, bId);
});

test('applies the fixed upper bound to demo accounts', () => {
  const accounts = new DemoAccountRegistry();
  for (let i = 0; i < 16; i++) accounts.add(`Extra ${i}`);
  assert.throws(() => accounts.add('More'), /limit reached/);
});

test('unverified adapter rejects authentication and remains unavailable', async () => {
  const adapter = new UnavailableSessionAdapter('webview');
  assert.equal((await adapter.feasibility('ios')).independentlyIsolatedStorage, 'unverified');
  assert.equal((await adapter.feasibility('android')).officialLoginSupported, 'unverified');
  await assert.rejects(adapter.connect('B'), /No verified supported/);
  assert.equal((await adapter.getStatus('B')).state, 'unavailable');
});
