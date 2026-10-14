# Second Zalo — Zalo Hub

**Canonical repository:** https://github.com/FourTran/second-zalo

Standalone, cross-platform (iOS and Android) React Native/Expo product exploring independent personal Zalo accounts B, C, D… in one companion app. **The official native Zalo app is out of scope and must remain untouched.**

> **Current status: research/prototype, NOT a functioning Zalo integration.** Login, account isolation, incoming-message event access, and real notifications remain unverified. No production messages or push sends.

Start here: [Project HQ](docs/project/PROJECT_HQ.md) · [Status](docs/project/STATUS.md) · [Roadmap](docs/project/ROADMAP.md) · [Agent rules](AGENTS.md) · [ChatGPT project instructions](docs/project/CHATGPT_PROJECT_INSTRUCTIONS.md).

## Prototype
```sh
npm install
npm run typecheck
npx expo start
```
A real iOS/Android development build is needed to evaluate `react-native-webview` behavior. The app is test-only and does not require Zalo credentials or Cloudflare secrets.

## Work policy
Create focused branches and PRs, capture platform-specific proof, and update `docs/project/STATUS.md` on every substantive change. Never claim an integration works without a reproducible real-device test. No unauthorized personal Zalo APIs, injected scripts, cookie extraction, stealth browser workarounds, or touching the official native Zalo app.
