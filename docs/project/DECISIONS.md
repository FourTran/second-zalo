# Architecture Decision Log

| Date | ID | Decision | Rationale |
|---|---|---|---|
| 2026-10-14 | ADR-001 | React Native + Expo + TypeScript | One iOS/Android codebase |
| 2026-10-14 | ADR-002 | Official native Zalo completely untouched | Strict user-approved boundary |
| 2026-10-14 | ADR-003 | Multiple B/C/D… companion accounts targeted | Goal; real session isolation unverified |
| 2026-10-14 | ADR-004 | Pluggable session adapter | Avoid coupling UI to unverified transport |
| 2026-10-14 | ADR-005 | Never use undocumented personal APIs or extract credentials | Security and compliance |
| 2026-10-14 | ADR-006 | Real ingestion/sends/push disabled pending approval | No unauthorized communication |
| 2026-10-14 | ADR-007 | Separate iOS and Android gates | Platform-dependent constraints |
| 2026-10-14 | ADR-008 | Development-only EAS profiles | Avoid production publishing |
| 2026-10-14 | ADR-009 | In-memory demo registry and unavailable adapter | No false live session claims |
| 2026-10-14 | ADR-010 | Manual setup and device testing deferred | User will create accounts later |
| 2026-10-14 | ADR-011 | Test-only Cloudflare Worker code, disabled unless explicitly development + secret + flag | Backend foundation without production message ingestion |

## Open decisions
Real supported personal Zalo login/notifications, cookie isolation, remote browser permissions, Apple/Expo signup and production environment architecture. No Cloudflare Worker deployed.
