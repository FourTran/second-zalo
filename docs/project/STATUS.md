# Zalo Hub — Canonical Project Status
Updated: 2026-10-15

**Merged:** PRs #1–#4 (M1–M4 code foundations). Product features still gated by real-world Zalo feasibility.
**Open in stack:** PR #5 (synthetic events), #6 (synthetic inbox), #7 (security guardrails).

| M | Implementation | Product acceptance |
|---|---|---|
| 1 | Foundation / CI code merged | Real device builds DEFERRED |
| 2 | Browser feasibility diagnostic merged | Normal Zalo login/manual messaging UNVERIFIED |
| 3 | Account metadata and lifecycle merged | Real B/C isolation & persistence UNVERIFIED |
| 4 | Account-scoped UI merged | Real manual chats / attachments NOT AVAILABLE |
| 5 | Strict synthetic events only | Real personal Zalo event source NOT VERIFIED |
| 6 | Local synthetic inbox / app navigation | No real APNs/FCM or locked-device tests |
| 7 | Secure metadata and fail-closed feature flags | Threat review/device penetration and reliability tests PENDING |
| 8 | Pending release gating | No signed builds, app-store approval, beta or production deployment |

Native Zalo remains untouched; no real Zalo authentication or messaging has been proven; no live push/sends/ingestion. **Do not equate merged code with product-complete milestones.**

Next: complete CI, merge PRs #5–#7 sequentially, implement M8 release readiness checklist. All manual prerequisites remain deferred per user direction.
