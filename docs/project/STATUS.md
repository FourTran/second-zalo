# Canonical Project Status
**As of:** 2026-10-14
**Stage:** M1 Foundation, Phase 1.1 documentation; source bootstrap in PR #1.
**Pull request:** https://github.com/FourTran/second-zalo/pull/1 (open, not merged).

| Item | State | Evidence / limitation |
|---|---|---|
| Repository and React Native starter | In PR #1 | Source committed; no physical iOS/Android build |
| M1.1 Product requirements | Draft in PR #1 | docs/product/PRD.md; review required |
| M1.5 CI workflow | Added in PR #1 | GitHub Actions workflow committed; run results pending |
| NPM/typecheck local validation | BLOCKED | Execution container unable to resolve github.com; dependency install not run |
| Cloudflare D1 | Previously created | Experimental APAC database 'zalo-personal-unified'; not integrated |
| Real Account B login/chat | UNKNOWN | iPhone Safari/Chrome redirected to App Store; WebView untested |
| Account C/D isolation | NOT IMPLEMENTED | Browser components alone don't isolate cookies |
| Real incoming-message event source | NOT VERIFIED | No authorized personal webhook proven |
| Real notifications/sends | DISABLED | Synthetic UI samples only |
| Official Zalo app | OUT OF SCOPE | Must never touch Account A |

## Next eligible actions
1. Review PR #1 and its PRD; check GitHub CI when available; fix any type/build errors.
2. Complete M1 iOS/Android development builds with on-device evidence (not yet achieved).
3. Start M2 normal user-led Zalo Web compatibility experiments per platform; do not bypass restrictions.
4. Verify B/C session isolation before promising multi-account support.

## Reporting discipline
Each phase records actual CI command and outcome, device/OS, observed test evidence, PR, blocker and next step. Never mark mocked Zalo behavior as real integration.
