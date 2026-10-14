# Product Roadmap V3 — Cross-Platform iOS + Android

All phases are conditional on supported interfaces. Each mobile feasibility gate is assessed separately for iOS and Android.

| M | Milestone | Phases | Exit criterion |
|---|---|---|---|
| 1 | Foundation | 1.1 PRD/architecture; 1.2 Expo TS project; 1.3 navigation UI; 1.4 backend interfaces; 1.5 tests/CI; 1.6 real-device builds | Signed iOS and Android prototypes function |
| 2 | Zalo Client Feasibility | 2.1 docs/restrictions; 2.2 iOS WebView; 2.3 Android WebView; 2.4 manual login/read/reply; 2.5 persistence; 2.6 permitted remote-browser alternative; 2.7 per-platform go/no-go | Supported Account B session verified |
| 3 | Session Isolation | 3.1 account registry; 3.2 adapter; 3.3 add/remove; 3.4 B/C/D independent login; 3.5 logout and expiry; 3.6 restart/recovery; 3.7 isolation tests | Logging out B does not affect C/D |
| 4 | Messaging UX | 4.1 account list; 4.2 supported chat UI; 4.3 manual send/reply; 4.4 attachments; 4.5 deep navigation feasibility | Manual messaging works per account |
| 5 | Event Detection | 5.1 inventory documented hooks; 5.2 permitted detection research; 5.3 prove live B event; 5.4 event attribution; 5.5 reliability/latency; 5.6 decision gate | Verified authorized incoming event |
| 6 | Alerts & Routing | 6.1 auth ingestion; 6.2 D1 alert record; 6.3 APNs/FCM; 6.4 account routing; 6.5 tap-to-open; 6.6 retry/privacy; 6.7 locked-device test | Reliable real alerts on both platforms |
| 7 | Security & Reliability | 7.1 threat model; 7.2 data isolation; 7.3 secrets; 7.4 deletion; 7.5 monitoring; 7.6 performance; 7.7 resilience | Review and test evidence |
| 8 | Beta & Release | 8.1 TestFlight; 8.2 Play internal test; 8.3 2-account beta; 8.4 3-account test; 8.5 compliance; 8.6 launch decision | Approved release readiness |

## Critical order
M1 minimum starter -> M2 compatible client -> M3 isolation proof -> M5 real event feasibility -> M4/M6 implementation -> M7/M8.

## Rules
Do not progress on optimistic assumptions. WebView access != distinct cookie stores. Receiving simulated events != receiving personal Zalo messages. If a hard gate fails, stop, document evidence and propose alternatives that respect Zalo and app-store requirements.
