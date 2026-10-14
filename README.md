# Second Zalo — Zalo Hub

**Canonical repository:** https://github.com/FourTran/second-zalo

Standalone cross-platform iOS/Android React Native/Expo prototype exploring independently signed-in personal Zalo accounts B, C, D… in a companion application. **The official native Zalo app and Account A are completely out of scope.**

> **Not a working Zalo integration.** Login, multi-account session isolation, real-message events, and push notifications remain unverified. The only current notification controls are explicitly synthetic.

Start here: [Project HQ](docs/project/PROJECT_HQ.md) · [Status](docs/project/STATUS.md) · [Roadmap](docs/project/ROADMAP.md) · [Agent rules](AGENTS.md) · [ChatGPT project instructions](docs/project/CHATGPT_PROJECT_INSTRUCTIONS.md).

## Start locally
```sh
npm install
npm run typecheck
npx expo start
```

## Install iOS and Android development builds
Use [M1.6 development-build runbook](docs/project/DEVICE_BUILD_TEST_PLAN.md). `eas.json` contains development-only profiles; install the build on physical test devices before assessing WebView behavior. The `expo-dev-client` package and provisional app identifiers are configured, but EAS project registration, credentials and signed builds have not yet been completed.

## Project safety
No automated real messaging, personal message interception, production push, or undocumented personal Zalo APIs. Use GitHub PRs to update verified status, and record device-specific evidence rather than claiming mock functionality is real.
