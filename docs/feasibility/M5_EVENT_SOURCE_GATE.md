# M5 — Incoming Event Source Gate

**Decision: NO VERIFIED PERSONAL ZALO EVENT SOURCE.** This is a blocked product acceptance gate, not a code deficiency that can be solved by synthesizing alerts.

## Implementation
- `sourceGate.ts` provides a **synthetic-test-only** event contract: no sender, chat ID, message body, credentials, cookie or token fields.
- `livePersonalSourceSupported` is hardcoded to `false` regardless of claimed evidence; a future legitimate documented adapter must be separately designed, reviewed and approved. Do not flip this flag to simulate feasibility.
- The bounded ledger handles duplicates and per-account filtering for synthetic fixtures only.
- No watcher, WebView injection, API poller, private endpoint or live message ingestion is implemented.

## What can be verified automatically
Strict schema validation, synthetic-only type enforcement, duplicate suppression, account separation and bounded memory.

## What blocks actual completion
Documented Zalo personal-account event interface and permission; real-event proof on iOS AND Android; privacy approval; end-to-end attribution without accessing the official Zalo app. Zalo OA webhooks do not provide evidence for personal-account events.

## Outcome
M5 engineering test substrate may be merged. **M5 real-message acceptance is BLOCKED / NO-GO until documented compliant evidence exists.**
