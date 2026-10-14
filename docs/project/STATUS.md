# Canonical Project Status
**As of:** 2026-10-14
**Stage:** M1 automation implemented (device gate deferred); M2 offline research and WebView diagnostic implementation underway on stacked feature branch.
**Source topology:** [PR #1](https://github.com/FourTran/second-zalo/pull/1) contains M1, still OPEN / UNMERGED. M2 is stacked on the M1 branch and cannot merge directly into `main` until M1 is merged.

| Area | Status | Actual evidence |
|---|---|---|
| M1 product docs, Expo starter, UI, tests/CI | CODE COMPLETE IN PR #1 | [CI 38560954813](https://github.com/FourTran/second-zalo/actions/runs/38560954813) PASS; 7 unit tests and JS bundle exports only |
| M1 Cloudflare metadata/event server integration | NOT IMPLEMENTED | Existing experimental D1 is not connected; no production ingestion allowed |
| M1.6 device builds / Expo/Apple setup | DEFERRED MANUAL | User asked to skip required manual steps; no signed iOS/Android binaries |
| M2.1 Zalo documented client/API review | OFFLINE RESEARCH | `docs/feasibility/M2_OFFLINE_RESEARCH.md`, links to official sources |
| M2.2/2.3 diagnostic WebView code | IMPLEMENTED, DEVICE-UNTESTED | `app/account-b.tsx` and `src/feasibility/webNavigationPolicy.ts` |
| M2.4 login/manual chat | UNVERIFIED — MANUAL | Neither OS has a verified authenticated Zalo session |
| M2.5 persistence, B/C isolation | UNVERIFIED — MANUAL | No isolated sessions implemented |
| M2.6 authorized remote browser fallback | RESEARCH ONLY | No remote service or real browser provisioned |
| M2.7 GO/NO-GO | UNDECIDED | No real supported-client evidence; do not declare milestone completed |
| Real personal-message event source | NOT VERIFIED | OA webhook documentation does not establish personal chat events |
| Real message ingestion, push and sends | DISABLED | No production integration; synthetic UI only |
| Native official Zalo app / Account A | NEVER TOUCH | Remains outside project scope |

## Next eligible actions
1. Check M2 CI and review stacked PR (no merges without explicit approval).
2. Proceed with safe offline architecture as needed, but DO NOT advance dependent real-message features without M2 feasibility.
3. When user chooses to handle manual tasks, revisit EAS signing, iOS/Android physical WebView login and chat, B/C isolation, and real-event permission validation separately.
4. Keep PR #1 as M1 source-of-truth branch until merged; rebase/retarget M2 afterward.
