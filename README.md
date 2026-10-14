# Second Zalo — Zalo Hub

**GitHub:** https://github.com/FourTran/second-zalo

A standalone React Native + Expo iOS/Android prototype for potential independent personal Zalo accounts B/C/D… (all real integrations **UNVERIFIED**). Official native Zalo and Account A stay completely untouched.

> **No working Zalo personal-account integration, no real messaging/event ingestion or notifications.** Demo records are synthetic only.

Project documentation: [HQ](docs/project/PROJECT_HQ.md) · [Status](docs/project/STATUS.md) · [Roadmap](docs/project/ROADMAP.md) · [Developer instructions](AGENTS.md).

```sh
npm install
npm run test:unit
npm run typecheck
npx expo start
```

## Backend foundation
`src/backend/syntheticWorker.ts` is a **NOT DEPLOYED** Cloudflare-compatible Worker prototype that accepts only synthetic dev events with flag + development environment + bearer secret. See `backend/migrations/0001_synthetic_events.sql` for a metadata-only fixture schema. Do not configure an externally reachable Worker or apply production migrations without explicit approval.

## Device builds
See [M1.6 build runbook](docs/project/DEVICE_BUILD_TEST_PLAN.md). Developer accounts and physical-device tests were deferred. No real account session isolation, login, read/reply or notification claim is valid until evidence has been collected separately on iOS and Android.
