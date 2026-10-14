# Canonical Project Status — 2026-10-14

M1 [PR #1](https://github.com/FourTran/second-zalo/pull/1): automated foundation code; CI passed; real iOS/Android builds deferred. M2 [PR #2](https://github.com/FourTran/second-zalo/pull/2): offline feasibility research and safe diagnostics; CI passed; real-client login unknown.

M3 [PR #3](https://github.com/FourTran/second-zalo/pull/3): account domain implementation and unit tests added on branch stacked on M2. Pending CI. **No real accounts authenticated.** Session Adapter default refuses to connect. In-memory metadata only. Real B/C isolation, restart persistence, and manual client login remain UNVERIFIED.

M4: NOT STARTED at time of this update. Product UI may only offer supported manual messaging once M2 supported-client and M3 isolation gates pass. No actual real-message send is enabled.

Official native Zalo + Account A: **completely out of scope**. Production push and message ingestion disabled.

Next: verify M3 CI, review M3 PR, then design M4 account-specific UX without fake live message features. PR merge order: #1 -> #2 -> #3. No merges without explicit approval.
