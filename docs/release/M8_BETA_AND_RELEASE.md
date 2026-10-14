# M8 — Beta & Release Readiness
Status: **NOT READY**. This is a checklist and release guard, not a beta launch.

## CI-only work completed
- A deterministic fail-closed `assessReleaseReadiness()` requiring platform-specific evidence before ANY future proposal to release.
- CI runs unit tests, typecheck, prototype-release-block check, Expo config and two JavaScript exports.
- No signing credentials or production EAS build profiles. No TestFlight, Google Play, app-store uploads or live sends.
- TestFlight, Google Play, branding/trademark and legal approval require user involvement.

## Outstanding acceptance evidence
| Gate | iOS | Android |
|---|---|---|
| Real signed development build installed | UNTESTED | UNTESTED |
| Supported normal personal Zalo login and manual chat | UNTESTED | UNTESTED |
| B/C isolated authenticated sessions, restart and disconnect | UNTESTED | UNTESTED |
| Documented permitted incoming-message event source | UNVERIFIED | UNVERIFIED |
| Locked-device real push + tap-correct-account | UNTESTED | UNTESTED |
| Platform security, privacy, branding and store review | PENDING | PENDING |
| Authorized explicit production go-live | NOT GIVEN | NOT GIVEN |

## Hard release blockers
M2 login feasibility and M5 personal message events have no verified source. Real Zalo features cannot be manufactured with a mock WebView or synthetic events. A future change needs an independently supported approach, formal review, new tests and explicit user approval.

## Process if blockers are resolved
1. Record platform hardware versions and sanitized proofs in PR.
2. Confirm supported client terms and account isolation on each OS.
3. Document legitimate incoming event source and permission.
4. Configure secrets and push endpoints **only after approval**.
5. Run private signed-device beta, reliability and security checks.
6. Review Apple/Google policies, app privacy and branding.
7. Submit release proposal for explicit product owner approval. No automatic deployment or merges into production.
