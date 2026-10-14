# Zalo Hub — Canonical Status (2026-10-15)

GitHub source completed for offline/testing scope of M1–M8. **NOT a functioning multi-personal-Zalo product.**

| Milestone | Engineering status | Product status |
|---|---|---|
| M1 | Expo/React Native starter, CI, backend test Worker | Signed iOS & Android builds DEFERRED |
| M2 | Research and diagnostic WebView | Real supported Zalo login/manual chat UNKNOWN |
| M3 | B/C/D metadata account manager, adapter contracts/tests | Independent authenticated sessions UNVERIFIED |
| M4 | Account-scoped screens and fail-closed chat policy | Real reading/replies/attachments UNAVAILABLE |
| M5 | Strict synthetic-only event ledger | Real permitted personal event source NOT FOUND/VERIFIED |
| M6 | Local synthetic inbox and account routing | No real APNs/FCM, background push or deep chat links |
| M7 | Public metadata security policy + threat model | Physical device security/performance reviews PENDING |
| M8 | CI release blocker + beta runbook | NO signed builds, app-store testing or production approval |

### GitHub PRs
M1–M4 PRs #1–#4 merged. M5–M8 PRs #5–#8 queued for CI/review/merge. Verify current GitHub PR state; this file must reflect latest as changes occur.

### Restrictions
Native Zalo app/Account A completely untouched. Do not collect Zalo passwords or cookies, use private APIs, or enable real message ingestion, sends or production pushes. No production deployment. Manual user actions were deferred, not passed.

### Next action
Resolve actual M2 supported-client feasibility and M5 permitted incoming event source before claiming an MVP. Resume EAS/Apple/Android iOS signing and physical-device testing when authorized.
