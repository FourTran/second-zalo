# Architecture Decision Log

| Date | ID | Decision | Rationale |
|---|---|---|---|
| 2026-10-14 | ADR-001 | React Native + Expo + TypeScript | One cross-platform mobile codebase |
| 2026-10-14 | ADR-002 | Official native Zalo completely untouched | Strict user-approved product boundary |
| 2026-10-14 | ADR-003 | Multiple companion accounts B/C/D… targeted | Product goal; feasibility not proven |
| 2026-10-14 | ADR-004 | Browser/session adapter abstraction | Avoid coupling UI to unverified WebView transport |
| 2026-10-14 | ADR-005 | No undocumented personal APIs or credential extraction | Security, integrity, compliance |
| 2026-10-14 | ADR-006 | No real sends/ingestion/push before approval | Avoid unauthorized messaging or misleading claims |
| 2026-10-14 | ADR-007 | Separate iOS and Android feasibility gates | Platform behavior differs |
| 2026-10-14 | ADR-008 | Development-only EAS internal profiles, no production profile | Avoid premature store releases |
| 2026-10-14 | ADR-009 | In-memory demo registry and fail-closed session adapter | Enable offline UI and unit tests without implying real login or cookie isolation |
| 2026-10-14 | ADR-010 | Defer EAS/Apple onboarding; continue offline M1/M2 research | User will create developer accounts later |

## Open decisions
Remote browser cost/permitted usage; real account storage isolation; authorized event source; push delivery; public distribution and branding; provisional native ID `com.fourtran.secondzalo.lab` must be verified before signing.
