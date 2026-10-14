# M4 — Account-scoped messaging interface (no live Zalo connection)

## Automated portion implemented
- Shared React Native context across navigation for synthetic B/C/D account details.
- Account-scoped route `/accounts/[accountId]` validates identifiers and never resolves Account A.
- Context allows adding/removing synthetic account records while keeping other records untouched; app clearly labels everything DEMO.
- A pure manual-message access policy refuses to unlock chat without authenticated account state, verified per-platform login/manual chat, verified independent session storage **and** a registered supported viewer.
- The application contains **no real messaging UI, no send button, no message API, no attachment upload**; until gates pass it displays the exact blocker.
- Separate M2 official-client diagnostic remains explicitly opt-in and cannot be mistaken for independent chat sessions.

## M4 critical gates still blocked
4.2 Official supported chat interface for an authenticated B/C session; 4.3 manually send/reply; 4.4 attachments; 4.5 supported deep conversation navigation. None may be simulated as pass. iOS and Android must be tested independently after M2 GO and M3 actual isolation proofs.

## Tests
`tests/manualChatGate.test.mjs` checks account scoping, no Account A, no chat without authentication, no chat if capability unverified, no chat without a supported viewer. This tests policy only, NOT real messages.
