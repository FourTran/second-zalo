# Canonical Architecture Decisions (2026-10-15)
- ADR-001: React Native/Expo for Android and iOS.
- ADR-002: Never touch official Zalo app or native Account A.
- ADR-004: Unsupported session adapters fail closed, per-platform verified proof required.
- ADR-005: No undocumented personal Zalo API, cookie/password extraction or bypass.
- ADR-006: No real ingestion, automatic sends or push before separate approval.
- ADR-014: Account B/C metadata and lifecycle isolation logic, but no real sessions.
- ADR-015: Manual chat UI always gated on supported authenticated viewer.
- ADR-016: Synthetic-only event contract; no known personal webhook.
- ADR-017: Synthetic inbox and internal-only account navigation, no push.
- ADR-018: Public metadata allowlist, fixed safe diagnostics and feature flags.
- ADR-019: M8 release gate is hard-blocked in prototype even if all evidence flags are asserted; no production build/deploy workflows.

- ADR-020: Add separate static mobile-first website for **manual**, anonymized browser feasibility observations. No Zalo iframe, proxy, session sharing, browser fingerprint changes or credentials.
- ADR-021: Website experiments do not satisfy M2/M3/M5 device/session/event gates and are not automatically deployed.
