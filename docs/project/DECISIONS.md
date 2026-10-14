# Architecture Decision Log

| Date | ID | Decision | Rationale |
|---|---|---|---|
| 2026-10-14 | ADR-001 | React Native + Expo + TypeScript | One cross-platform mobile codebase |
| 2026-10-14 | ADR-002 | Official native Zalo completely untouched | Strict user-approved product boundary |
| 2026-10-14 | ADR-003 | Multiple companion accounts B/C/D… targeted | Product goal; feasibility not proven |
| 2026-10-14 | ADR-004 | Browser/session adapter abstraction | Avoid coupling UI to an unverified WebView transport |
| 2026-10-14 | ADR-005 | No undocumented personal APIs or credential extraction | Security, integrity, compliance |
| 2026-10-14 | ADR-006 | No real sends/ingestion/push before approval | Prevent unauthorized messaging or misleading claims |
| 2026-10-14 | ADR-007 | Separate iOS and Android feasibility gates | Platform behavior differs |
| 2026-10-14 | ADR-008 | Development-only EAS internal profiles, no production profile | Physical-device validation without accidentally enabling store releases |

## Open decisions
Remote-browser cost/security/permitted usage; account profile isolation strategy; production event source; push delivery provider; public distribution and branding. Provisional native app ID `com.fourtran.secondzalo.lab` must be confirmed before signing.
