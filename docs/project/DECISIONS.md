# Architecture Decision Log
| Date | ID | Decision | Rationale |
|---|---|---|---|
| 2026-10-14 | ADR-001 | React Native + Expo + TypeScript | Shared mobile codebase |
| 2026-10-14 | ADR-002 | Official native Zalo completely untouched | User-set security/product boundary |
| 2026-10-14 | ADR-003 | Multiple B/C/D… independent accounts targeted | Goal, NOT verified capability |
| 2026-10-14 | ADR-004 | Pluggable session adapter; transport unverified | Preserve alternative architecture options |
| 2026-10-14 | ADR-005 | No undocumented personal messaging APIs or credentials/cookies | Security and compliance |
| 2026-10-14 | ADR-006 | Real sends, ingestion and push disabled until approved | Safety and honest reporting |
| 2026-10-14 | ADR-007 | Separate iOS/Android GO/NO-GO decisions | Different WebView storage and background behavior |
| 2026-10-14 | ADR-008 | EAS development-only profiles | Avoid production release |
| 2026-10-14 | ADR-009 | In-memory demo registry and fail-closed adapter | Never equate mock profiles with authenticated sessions |
| 2026-10-14 | ADR-010 | Developer account/device checks deferred | User instructed to skip manual steps |
| 2026-10-14 | ADR-011 | Cloudflare Worker source disabled unless dev flag + bearer token | Safe M1 backend foundation; no live service deployment |
| 2026-10-14 | ADR-012 | Diagnostic WebView exposes only origin classifications, blocks non-Zalo schemes | No credential interception or accidental native-app launch |
| 2026-10-14 | ADR-013 | M2 is a stacked PR targeting M1 feature branch | Do not mix research experiments into M1 before review |

## Unresolved
No verified WebView login, independent persistent profile isolation or personal event source. Remote browser permitted usage/cost unverified. Provisional app ID must be confirmed before signing.
