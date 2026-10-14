# M3 — Independent Session Manager (implementation boundary)

The `AccountManager` in `src/sessions/accountManager.ts` provides **real domain logic** for account metadata and per-account lifecycle operations, but NOT real authenticated Zalo sessions.

## Implemented and unit-tested
- Registry for B–Z, excluding A, duplicate prevention, 16-account limit.
- Account-specific locks against overlapping lifecycle operations.
- Adapter-gated connect: capabilities must be explicitly proven `true` per platform for supported login, manual messaging and independent storage. The default adapter always refuses.
- Connect rejects adapter identity mismatches; disconnect/remove affect only selected account in controlled simulated adapters.
- Remove invokes target adapter.destroy before deleting metadata. A failed destroy preserves metadata for retry.
- Restore of account **labels only**; never restore an 'authenticated' claim based solely on local metadata.
- In-memory account metadata store for test/dev; no Zalo credentials, tokens, cookies or message bodies.

## Explicitly not implemented
- Persistent SQLite account metadata store (requires physical device smoke tests).
- True independent persistent WebView profiles on either platform.
- Zalo login/reconnect or an authorized remote-browser adapter.
- Proof that B/C actual sessions are isolated, can be resumed after restart or one account logout leaves another alive.

## Gate to add a real adapter
Must have verified supported Zalo login/manual messaging, platform-specific isolation evidence, no credential extraction, owner-controlled lifecycle and clean session destruction on both iOS and Android. Synthetic test adapter proof does not count as real Zalo proof.

## Manual test matrix
See `docs/feasibility/M2_DEVICE_MATRIX.md`. Until that evidence exists, M3 is **code-complete only for safe offline domain logic**, NOT a completed product milestone.
