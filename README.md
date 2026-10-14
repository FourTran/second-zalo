# Second Zalo — Zalo Hub

**Canonical repository:** https://github.com/FourTran/second-zalo

Standalone iOS/Android React Native/Expo prototype targeting multiple independent personal Zalo accounts B/C/D…, subject to strict supported-client feasibility gates. The official native Zalo app and Account A are completely outside scope.

> **NOT a working personal Zalo integration.** No verified Zalo login, real messaging access, session isolation, incoming events or production push. UI records are synthetic only.

Project docs: [HQ](docs/project/PROJECT_HQ.md) · [Status](docs/project/STATUS.md) · [Roadmap](docs/project/ROADMAP.md) · [Agent rules](AGENTS.md).

## Development
```sh
npm install
npm run test:unit
npm run typecheck
npx expo start
```
M1.6 real iOS/Android builds require postponed developer account setup. See [device build plan](docs/project/DEVICE_BUILD_TEST_PLAN.md).

## M2 WebView diagnostic
Read [offline feasibility report](docs/feasibility/M2_OFFLINE_RESEARCH.md) and [platform test matrix](docs/feasibility/M2_DEVICE_MATRIX.md). The experimental Account B WebView is started manually and categorizes public-domain navigations only, never full URLs or credentials. It blocks App Store and external redirects rather than touching native Zalo. **Running the diagnostic does not prove login, multi-account support or notification feasibility.**

No real personal-message event ingestion, automatic replies, forwarding or production push are enabled. Physical device findings must be recorded separately for iOS and Android.
