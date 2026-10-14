# Canonical Project Status
**As of:** 2026-10-14
**Stage:** Pre-feasibility / source bootstrap.
**Current workstream:** M1 foundation; next critical task M2 supported-client feasibility.

| Item | State | Evidence / limitation |
|---|---|---|
| Canonical GitHub repo | Confirmed | FourTran/second-zalo |
| React Native starter | Prototype in project setup PR | Source exists; not yet installed on physical iOS/Android |
| Cloudflare D1 | Created previously | `zalo-personal-unified` (APAC); separate experimental database, not connected to mobile code |
| Account B in WebView | UNKNOWN | iOS Safari and Chrome redirected to App Store; WebView untested |
| Account C/D isolated sessions | NOT IMPLEMENTED | Distinct WebView instances are not proof of cookie isolation |
| Supported Zalo personal event source | NOT VERIFIED | No documented webhook established |
| Real alerts from personal accounts | DISABLED / BLOCKED | Synthetic UI samples only |
| Real message sending | DISABLED | User manual messaging requires a supported client first |
| Native Zalo app interaction | PROHIBITED | Not in scope |
| Mobile CI and signed device builds | NOT VERIFIED | No signed iOS/Android device evidence |

## Next actions
1. Complete M1: run npm typecheck, install signed Expo development build on iOS and Android, create CI.
2. Execute M2 browser compatibility matrix on physical iOS and Android.
3. Test account B user-led authentication and manual chats only if the official client supports it.
4. Before any multi-account implementation, verify independently isolated session storage, including restart and logout tests.
5. Independently research permitted event source; don't mistake synthetic alerts for real notifications.

## Updating this document
For each PR: date, Mx/Px, branch/PR link, confirmed completed work, actual test results per OS, blocker, decision, next phase. Never mark a gate 'passed' without logs, screenshots or documented on-device reproduction.
