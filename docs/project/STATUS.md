# Canonical Project Status
**As of:** 2026-10-14
**Stage:** M1 Foundation, preparing Phase 1.6 cross-platform development builds.
**Current open PR:** https://github.com/FourTran/second-zalo/pull/1 (NOT MERGED).

| Item | State | Evidence / limitation |
|---|---|---|
| React Native / Expo starter | In PR #1 | Prototype committed; no physical device installation |
| M1.1 product requirements | Draft in PR #1 | `docs/product/PRD.md`; review required |
| M1.5 validation CI | PASS on prior head `1210fe0` | GitHub Actions run 38531878182: dependencies, TypeScript, Expo config succeeded |
| M1.5 iOS/Android JS bundle export | Added, pending GitHub CI | Not equal to native binary compilation |
| M1.6 development-build configuration | Added to PR #1; unverified | `eas.json`, Expo dev client, app IDs; no EAS builds run |
| M1.6 physical iPhone installation | NOT RUN | Needs Expo/Apple credentials, registered device, actual build |
| M1.6 physical Android installation | NOT RUN | Needs Expo/Android development build and physical test |
| Cloudflare D1 | Created previously | Experimental `zalo-personal-unified` APAC database, not connected to this app |
| Account B Zalo Web compatibility | UNKNOWN | Safari/Chrome iPhone redirected to App Store; mobile WebView untested |
| Account C/D isolation | NOT IMPLEMENTED | Distinct WebViews are not evidence of cookie isolation |
| Real incoming Zalo event source | NOT VERIFIED | No authorized personal webhook established |
| Real sends / notifications | DISABLED | Synthetic UI only; no APNs/FCM delivery |
| Official native Zalo app | NEVER TOUCH | Account A completely outside product |

## Next eligible actions
1. Wait for GitHub CI on updated PR #1; diagnose/fix failures if any.
2. Review and merge PR #1 only with user approval.
3. Run `docs/project/DEVICE_BUILD_TEST_PLAN.md` on real iOS/Android and record evidence.
4. Then move to M2's supported-client feasibility tests per platform.
5. Do not label WebView login, session isolation, or live notifications as working without real permitted evidence.

## Reporting
Record actual device/platform, CI test run, behavior, blockers and GitHub commit/PR for each verified change. Do not treat synthetic alerts as real Zalo events.
