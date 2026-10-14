# Second Zalo — Zalo Hub

**Repository:** https://github.com/FourTran/second-zalo

A standalone React Native + Expo + TypeScript **iOS/Android feasibility prototype** for managing additional independently authenticated personal Zalo accounts B, C, D, etc.

**The official native Zalo app and Account A must remain completely untouched.**

> **Not a working personal Zalo integration.** GitHub PRs #1–#8 for the offline implementation foundations are merged. Real authentication, isolated sessions, message access, incoming events, and real notifications have NOT been validated.

## Project source of truth
[Project HQ](docs/project/PROJECT_HQ.md) · [Current status](docs/project/STATUS.md) · [Roadmap](docs/project/ROADMAP.md) · [Technical decisions](docs/project/DECISIONS.md) · [Risks](docs/project/RISKS.md) · [Agent instructions](AGENTS.md).

## Local development
```sh
npm install
npm run test:unit
npm run typecheck
npm run release:check
npx expo start
```

The release check intentionally reports **BLOCKED** because no supported personal Zalo integration has passed the critical device gates.

## What code exists
- Standalone iOS/Android Expo app, simulation-only account dashboard and synthetic alerts.
- Strictly user-triggered Zalo Web compatibility diagnostic; blocks native-app redirects and never extracts credentials or cookies.
- Account metadata lifecycle, isolated operation guards, fail-closed adapter contracts.
- Account-scoped screens, manual chat eligibility policy (no live chat viewer).
- Synthetic event ledger and synthetic-only local notification inbox, no live message source.
- Security metadata validation, hard-disabled production features, release blocker and CI.
- An undeployed **development-only synthetic Cloudflare Worker source**, with no production credentials or real personal-message ingestion.

**No production deployment, real personal messages, automated replies, push delivery or app publishing** is enabled.

## Critical blockers
- M1 real iOS/Android device signing and builds were deferred.
- M2 legitimate normal personal Zalo login and messaging in our WebView/alternative remains unverified.
- M3 independent B/C authenticated session isolation is unverified.
- M5 permitted personal-account incoming message event source has not been verified.
- M6 real background APNs/FCM delivery depends on M5 and physical tests.

Follow [device test plan](docs/project/DEVICE_BUILD_TEST_PLAN.md), [M2 feasibility matrix](docs/feasibility/M2_DEVICE_MATRIX.md), [M5 event gate](docs/feasibility/M5_EVENT_SOURCE_GATE.md) and [M8 release runbook](docs/release/M8_BETA_AND_RELEASE.md) before proposing a beta.

**Passing JavaScript bundles is NOT a signed iPhone/Android application build.** Every supported integration must be independently tested on each platform.

## Web-first manual feasibility lab (separate from the native app)
A lightweight, responsive web test page is in [web/feasibility](web/feasibility). It checks **manual browser observations only**, stores no user data, never embeds or scripts Zalo Web, and does not authenticate any personal account.
```sh
npm run test:web
npm run web:serve
# Then open http://127.0.0.1:4173 in a desktop browser
```
Read [the web-first test plan](docs/feasibility/WEB_FIRST_TEST_PLAN.md). Nonproduction Cloudflare Worker preview: https://zalo-hub-web-feasibility-preview.tranvantu4444.workers.dev/ (API reports upload and workers.dev activation; browser reachability not independently confirmed). It hosts only the static manual test lab — never enter personal Zalo credentials into it.

The deployed preview can be regenerated offline via `npm run web:build-worker`; only `web/feasibility` assets are served. Production hosting or Zalo integration is not enabled.

Web-first correction: iPhone Safari and Chrome already redirect to App Store; do not repeat the same chat.zalo.me test. The lab now records the known iPhone result and identifies the unverified desktop-session approach as the next experiment.
