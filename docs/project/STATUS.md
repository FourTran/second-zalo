# Second Zalo — Project Status
Updated: 2026-10-15. Canonical branch: `main`.

## GitHub state
- M1 PR #1, M2 PR #2, M3 PR #3, M4 PR #4: **MERGED** (code foundations).
- M5: synthetic-only event source contract, in PR #5. Live source **NOT VERIFIED**.

## Acceptance by milestone
| Milestone | Implemented | Remaining gate |
|---|---|---|
| M1 | Expo app, CI, experimental D1 Worker source | Signed device builds deferred |
| M2 | Research, safe WebView diagnostics | Supported login / messaging on physical iOS and Android |
| M3 | Account manager, fail-closed adapter, tests | Real B/C independent authentication, storage isolation, restart |
| M4 | Account-specific navigation, access gate | Permitted live chat, manual replies, attachments |
| M5 | Synthetic event contracts and deduplication | **Supported real personal-account event source absent** |
| M6 | Not started | APNs/FCM + actual authorized event source |
| M7 | Not started | Security review / device reliability |
| M8 | Not started | Expo/Apple accounts, builds, compliance and beta |

Production sends, real-message ingestion and notification delivery DISABLED. Official Zalo app and Account A NEVER TOUCHED. Skipped manual steps are not passes.

## Next
Implement M6–M8 offline safety scaffolding. Review CI and merge through PRs with code/evidence. Do not claim product launched or complete until every critical real-world gate is proven.
