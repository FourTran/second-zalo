# Zalo Hub Canonical Status — 2026-10-15

M1–M4 source PRs **#1–#4 merged into main**, but product acceptance gates remain unresolved (signed device builds, normal Zalo login/read/reply, independent B/C persistence and cookie isolation).

M5 PR #5 — **synthetic-only event contract**, real personal-Zalo event source NOT verified; product gate BLOCKED.
M6 PR #6 — **local synthetic inbox/routing**, no APNs/FCM or background notifications; product gate BLOCKED.
M7 and M8 — awaiting safe CI/security/release gate foundations.

**Safety:** Native Zalo and Account A untouched. No passwords, cookies, real personal message ingestion, automation, production push or sends. No release readiness until per-platform feasibility and manual approvals.

Next: CI for PR #6, M7/M8 release security gates; merge in order #5 → #6 → #7 → #8 only after CI passes.
