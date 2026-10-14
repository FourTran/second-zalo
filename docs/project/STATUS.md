# Canonical Project Status — 2026-10-14

Project source topology: **[M1 PR #1](https://github.com/FourTran/second-zalo/pull/1)** → **[M2 PR #2](https://github.com/FourTran/second-zalo/pull/2)** → **[M3 PR #3](https://github.com/FourTran/second-zalo/pull/3)** → **M4 PR pending**. All are stacked and UNMERGED. No production deployment.

| Milestone | Status | Evidence / blockers |
|---|---|---|
| M1 Foundation | Automated foundation implemented | GitHub CI passed; physical signed iOS/Android builds & Expo/Apple enrollment deferred |
| M2 Feasibility | Offline research + safe diagnostic implemented | Real Zalo WebView login/manual chat/permitted usage UNVERIFIED on both OS |
| M3 Sessions | Offline account lifecycle implemented on M3 PR | Default adapter fail-closed, tests; real B/C auth, storage isolation, restart/recovery unverified |
| M4 Messaging | Account-specific demo UX + access gating added on M4 branch | No actual chat, send/reply, attachments or deep linking; dependent on M2/M3 |
| M5 Events | Not started | No verified personal incoming-message source |
| M6 Notifications | Not started | Real push disabled |
| M7 Security | Planned | Further audits/device tests needed |
| M8 Release | Planned | No signed builds/publishing |

Manual tasks skipped at user request; skipped ≠ passed. No passwords, Zalo message bodies, extracted cookies or native app interactions. Official Zalo and Account A completely untouched.

## Next
Run M4 CI, ensure M3 CI fixed and green; review stacked PRs. Merge only with explicit approval (#1 → #2 → #3 → #4). Product completion of M3/M4 is blocked pending real supported-client gates and separate platform proof.
