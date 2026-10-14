# Architecture Decisions (2026-10-15)
- ADR-001: React Native + Expo for Android/iOS; official native Zalo completely out of scope.
- ADR-004: Supported-only session adapters; default unavailable.
- ADR-006: Real message ingestion/sends/push disabled pending explicit verified approval.
- ADR-016: M5 does not expose personal Zalo events, only synthetic source with bounded deduplication.
- ADR-017: M6 routes only synthetic notifications to internal account-specific views; no push provider wired, no Zalo chat read receipts.
