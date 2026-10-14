# Zalo Hub — Product Requirements (M1 Phase 1.1)
Updated 2026-10-14. Status: draft for review; all Zalo integrations unverified.

## Problem
A person may have multiple personal Zalo accounts but cannot dependably see messages from independently signed-in accounts without switching accounts. The target is one Android/iOS companion app that owns ONLY additional accounts (B, C, D…), not native Zalo Account A.

## User stories and priorities
| ID | Priority | User story | Acceptance evidence |
|---|---|---|---|
| U1 | P0 | Add Account B with legitimate user-led Zalo authentication | Real device login test on iOS and Android |
| U2 | P0 | Read and manually reply within Account B | Actual supported client receives/replies |
| U3 | P0 | Add C without disconnecting B | Separate sessions remain logged in simultaneously |
| U4 | P0 | Recover B and C across app restart | Independently restored after cold restart |
| U5 | P0 | Receive permitted incoming alerts for B/C | Authorized real event; locked phone; correct account |
| U6 | P1 | Disconnect/remove B without affecting C | Verified isolation and deleted session data |
| U7 | P1 | View account-specific health and reauthenticate | Clear expiry/recovery UX |
| U8 | P2 | Support D+ accounts | Resource/performance validation |

## Boundary and non-goals
- Never touch or observe the official Zalo app or Account A.
- No unofficial messaging APIs, stolen/extracted credentials/cookies, client protocol reimplementation, bypassing client restrictions, or automated replies.
- No promise of global cross-account chat-history search, read receipts or guaranteed conversation deep links without supported interfaces.
- No production real-message ingestion/forwarding or push until authorized evidence and explicit user approval.

## High-level user experience
1. Open Zalo Hub, choose Add account B; user signs in within a permitted official interface.
2. App reports connection states precisely: disconnected, authenticating, authenticated, expired, unavailable. A UI placeholder is never considered connected.
3. Account B's supported chat experience lets user manually view and reply.
4. Add C with independently isolated state; switching in our UI must not log out B.
5. If a documented authorized event source is validated, deliver a labeled notification to correct account; otherwise clearly display 'Notifications unavailable'.
6. Removing a profile destroys only that account's authorized session data.

## Functional / security constraints
- Cross-platform Expo/React Native/TypeScript; modular session adapters for independently managed local WebView or legitimate isolated remote browser where permitted.
- Separate WebViews alone are NOT proof of isolated cookies on either platform.
- No Zalo passwords held by our backend. Encrypt sensitive app data; minimize retention and logging.
- Cloudflare Workers/D1 are for our service metadata and authorized events, not undocumented Zalo access.
- Respect device resource limits, accessibility and user privacy.

## Feasibility go/no-go criteria (each platform separately)
G1: supported login; G2: manual read/reply; G3: restart persistence; G4: B/C isolation; G5: B logout leaves C alive; G6: supported event detection; G7: lock-screen push; G8: account-correct opening. Record real test date, device model, OS version, reproduction steps, screenshots/logs, result and blocking reasons. NO-GO where a gate fails; consider compliant alternative or scope revision.

## Success metrics (targets, NOT claims)
- Sessions B/C usable after app restart without cross-account sign-out.
- Per-account event delivery reliability measured on locked iOS and Android devices, only if G6 succeeds.
- No recorded native-Zalo interaction; no sensitive secrets committed.

## Open questions
- Does Zalo permit web login and manual chat inside app WebViews on each platform?
- Is any independent per-account browser profile isolation technically and contractually supported?
- Is there an authorized personal-message event source at all?
- Which vendor/device push and independent session runtime are appropriate after proof?
