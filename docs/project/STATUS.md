# Canonical Project Status
**As of:** 2026-10-14
**Stage:** M1 Foundation; M1.4 contract/demo registry work in open PR #1. EAS account and Apple Developer membership deferred by user.
**Open PR:** https://github.com/FourTran/second-zalo/pull/1 (not merged).

| Item | State | Evidence / limitation |
|---|---|---|
| React Native / Expo foundation | In PR #1 | Code on feature branch; no physical device builds |
| M1.1 PRD | Draft | `docs/product/PRD.md` |
| M1.4 platform/session contracts | Added in PR #1 | `src/core/sessionAdapter.ts`; all live adapters explicitly unavailable |
| M1.4 demo account registry | Added in PR #1 | `src/core/demoAccountRegistry.ts`; B/C/D entries labeled synthetic; no authentication or cookies |
| M1.5 prior CI | PASS | [Run 38534173692](https://github.com/FourTran/second-zalo/actions/runs/38534173692): dependency install, TypeScript, Expo config, both JS exports |
| M1.5 new unit tests | 7/7 local Node 22 tests PASSED | CI for updated commit still needs to complete |
| M1.6 developer accounts | DEFERRED | Expo/Apple setup postponed by user |
| M1.6 physical iOS / Android builds | NOT RUN | Requires signing and actual devices |
| Cloudflare D1 | Created previously | Experimental `zalo-personal-unified` APAC database; not integrated |
| Account B Zalo client | UNKNOWN | iPhone browsers redirected to App Store; in-app WebView untested |
| B/C real independent login/storage | NOT IMPLEMENTED | Demo registry cannot authenticate or isolate cookies |
| Authorized incoming Zalo events | NOT VERIFIED | No personal webhook proven |
| Real sends, ingestion and push | DISABLED | Demo alerts only |
| Official native Zalo app | UNTOUCHED BY DESIGN | Account A outside product |

## Next actions
1. Complete updated PR #1 CI and review; merge only with explicit approval.
2. Begin M2.1 supported-client documentation and restrictions research without requiring Expo/Apple accounts.
3. Defer M1.6 real device build until Expo/Apple enrollment is available; document iOS and Android outcomes separately.
4. No real account session, personal message event, or push functionality may be claimed without device/authorization evidence.
