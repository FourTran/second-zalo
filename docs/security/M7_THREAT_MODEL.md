# M7 — Security and Reliability Threat Model

## Threats and mitigations (implemented as offline code guardrails)
| Threat | Protection | Evidence |
|---|---|---|
| Mistake a synthetic event for a personal Zalo message | Source discriminator, strict schema, explicit synthetic labels | M5 tests |
| Cross-account navigation / native Account A access | Routes permit hub-B…hub-Z only | M4/M6 tests |
| Credential or cookie leakage into our metadata | Strict public metadata allowlist | M7 tests |
| Sensitive errors exposed in client UI | Fixed diagnostic error mapping | M7 tests |
| Unsafe live production push or automated replies | Frozen production feature flags false | M7 tests |
| Mismatched session identity / concurrent actions | M3 per-account lock and identity checks | M3 tests |
| Browser tries to redirect to native Zalo | M2 domain and URL-scheme navigation guard | M2 tests |

## Critical items that remain UNVERIFIED
- Real iOS and Android WebView session isolation, HTTPS authenticated sessions, device secure storage and logout teardown.
- Legitimate remote-browser session feasibility, security and allowed usage.
- Permission to ingest personal Zalo incoming-message events; absence blocks notification delivery.
- Push access control, APNs/FCM credential storage, privacy and locked-device delivery.
- Actual device performance, battery, accessibility and security audits.
- App-store/legal compliance for branding and WebView access.

No Zalo passwords, session cookies, real message content or push tokens are committed or collected. This code has no production integration and is not a security certification.
