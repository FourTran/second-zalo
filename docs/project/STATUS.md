# Zalo Hub — Canonical Status
Updated: 2026-10-15 · Repository: https://github.com/FourTran/second-zalo

## GitHub merge state — VERIFIED
**PRs #1–#8 have all been MERGED to main.** No PRs were open at verification time.
- M1 [PR #1](https://github.com/FourTran/second-zalo/pull/1)
- M2 [PR #2](https://github.com/FourTran/second-zalo/pull/2)
- M3 [PR #3](https://github.com/FourTran/second-zalo/pull/3)
- M4 [PR #4](https://github.com/FourTran/second-zalo/pull/4)
- M5 [PR #5](https://github.com/FourTran/second-zalo/pull/5)
- M6 [PR #6](https://github.com/FourTran/second-zalo/pull/6)
- M7 [PR #7](https://github.com/FourTran/second-zalo/pull/7)
- M8 [PR #8](https://github.com/FourTran/second-zalo/pull/8)

Last code PR head [#8 CI run 38616559996](https://github.com/FourTran/second-zalo/actions/runs/38616559996) passed: tests, TypeScript, release guard, Expo config, iOS/Android **JS exports only**. No actual native iOS/Android build or on-device tests.

## Code foundations vs acceptance criteria

| Milestone | Merged implementation | Unfinished real-world evidence |
|---|---|---|
| M1 Foundation | React Native/Expo starter, CI, test-only Worker | Signed development builds on physical iOS/Android NOT RUN; Expo/Apple setup deferred |
| M2 Supported Client | Zalo documentation research, safe WebView diagnostic | Supported login and manual messaging on both OS NOT VERIFIED |
| M3 Independent Sessions | Metadata account manager, lifecycle contracts and tests | Real B/C login, isolation, restart and logout independence NOT VERIFIED |
| M4 Messaging UI | Account-scoped screens and fail-closed chat policy | Real Zalo message read/reply, attachments, conversation opening NOT IMPLEMENTED |
| M5 Incoming Events | Strict synthetic-only event ledger | No verified permitted personal Zalo incoming-message event interface |
| M6 Notifications | Bounded synthetic inbox and app-only navigation | Real APNs/FCM, locked-phone delivery and account-correct real-message navigation NOT IMPLEMENTED |
| M7 Security | Feature disabling, metadata validation, threat model and tests | Physical device/session security/privacy, battery, reliability and compliance tests PENDING |
| M8 Release | Hard-blocked release checker, beta runbook, CI | No TestFlight/Play testing, app review, production authorization or beta validation |

**State: automated/offline implementation merged; none of M1–M8 is proven fully product-complete.** Never infer supported Zalo personal integrations or releases from merged code or synthetic UI.

## Open acceptance blocker issues
- [#10 — Real Zalo login, manual chat and B/C isolation](https://github.com/FourTran/second-zalo/issues/10)
- [#11 — Authorized incoming personal-message event source](https://github.com/FourTran/second-zalo/issues/11)
- [#12 — Real APNs/FCM, security and beta release](https://github.com/FourTran/second-zalo/issues/12)

## Critical blockers in dependency order
1. User-controlled legitimate Zalo Web or alternative client login and manual chat works on iOS and Android.
2. Independently persistent sessions B/C, logout isolation and privacy protection verified on both devices.
3. Permitted real incoming personal-message event source identified and tested. Documented Zalo OA APIs are NOT evidence for personal account events.
4. Secure push delivery and correct account routing verified on locked iOS and Android.
5. Signing, legal/store review, private beta and explicit owner approval.

## Security guarantees / non-actions
Official native Zalo app and Account A are completely **OUT OF SCOPE**. No native Zalo automation, notification inspection, credentials/cookies, undocumented personal APIs or security bypasses. No real personal-message forwarding, automatic sends, production push, deployment or app-store publishing has been authorized or executed. Cloudflare Worker source remains development-only, not deployed.

## Next recommended work
Do not expand live-message or notification code until critical M2 and M5 feasibility evidence exists. Once user is ready for manual device testing, follow `docs/project/DEVICE_BUILD_TEST_PLAN.md`, `docs/feasibility/M2_DEVICE_MATRIX.md`, and `docs/release/M8_BETA_AND_RELEASE.md`. Log outcomes platform-by-platform; if client or event source is unsupported, record NO-GO/PIVOT rather than a fake complete milestone.

Every future thread must read this file and verify current GitHub PR/CI state.

## Web-first test proposal — PR #13 (2026-10-15)
- New web/feasibility/ static mobile-first diagnostic. No Expo or Apple Developer account needed to load after separately approved preview hosting.
- Users manually open the official chat.zalo.me address in their own browser and record **self-reported only** observations by account and device.
- The website has **no Zalo session**, cross-site API, iframe, notification listener, credentials or cookie access; cannot bypass iOS App Store redirects.
- Nonproduction Cloudflare Worker preview **uploaded and workers.dev enabled** by API; external page accessibility could not be independently verified because the checking environment has no DNS access. This is a test harness, **not** a substitute for issue #10 supported-client login and issue #11 incoming message source.
- PR code CI [run #38622258320](https://github.com/FourTran/second-zalo/actions/runs/38622258320) passed including web tests, TypeScript, Expo config, release guard and both mobile JS exports; device-browser verification still pending. iOS/Android website use on physical devices NOT TESTED.

- Preview address: https://zalo-hub-web-feasibility-preview.tranvantu4444.workers.dev/ — public static diagnostic only. No real Zalo login, credential handling, push, APIs or message forwarding.

### Correction — 2026-10-15 (web prototype)
The original web lab unnecessarily asked the user to repeat chat.zalo.me on iPhone, although Safari/Chrome App Store redirects were already observed. The revised web lab pre-records that user-reported result for Account B and hides the pointless iPhone Copy URL action. Next hypothesis: an explicitly permitted, user-controlled cloud desktop browser session, not yet provisioned or verified. This remains a feasibility prototype, not a working Zalo integration.

## Web-first UX update (2026-10-15)
The Zalo Hub URL should present **Account B sign-in immediately**, not a device dropdown or manual compatibility questionnaire. The login-first UI is implemented as a static entry screen in a focused PR, with an explicitly **disabled** Sign In control while the authenticated supported remote-browser session is unavailable. No credentials collected and no direct iPhone chat.zalo.me redirection. M2.6 remote desktop proof remains unverified. The previous diagnostic logic remains test-only in source, not the homepage.
