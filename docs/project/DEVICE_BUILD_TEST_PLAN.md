# M1.6 — iOS and Android Development-Build Runbook
Date: 2026-10-14 · Status: NOT EXECUTED — requires device(s) and authenticated developer accounts.

## Scope and safety
The goal is to install the independent **Zalo Hub Lab** prototype, test navigation and WebView loading, and record build evidence on iOS and Android. This does NOT verify Zalo personal-account login, isolation, messaging or real notifications. NEVER modify, automate or intercept data from the official Zalo native app. Do not intentionally open native Zalo via app schemes. Any manual supported login experiment belongs to M2 and requires approval.

## Prerequisites
- PR #1 merged or checkout its feature branch. Node.js 20+; Expo account with EAS permission.
- Android physical phone (or emulator) and iPhone (or iOS Simulator for an initial smoke test).
- Internal installation on a physical iPhone requires Apple developer signing/provisioning and device registration; follow EAS prompts. Do not share developer passwords or certificates in chat.
- Check and reserve provisional IDs `com.fourtran.secondzalo.lab` before signing. Never place real message data or tokens in source control.

## Commands (run on your development computer or CI environment with required access)
```sh
npm install
npm run typecheck
npx expo config --json
npx eas-cli@latest login
npx eas-cli@latest init
# Install on real Android device:
npx eas-cli@latest build --platform android --profile development
# Register iPhone device, set up credentials interactively, then build:
npx eas-cli@latest device:create
npx eas-cli@latest build --platform ios --profile development
# Optional macOS Simulator-only build (not a physical-device substitute):
npx eas-cli@latest build --platform ios --profile development-simulator
# Start the metro bundler for installed development builds:
npm run dev
```
The first `eas init` may add an EAS project ID in app configuration. Commit only non-sensitive project metadata via PR. No production build profile or store submissions are configured.

## Test checklist, perform separately for both OS
1. Record: device model, OS version, build URL/ID, commit SHA, timezone and test date.
2. Development build installs and launches from device home screen.
3. Dashboard opens; Account B feasibility screen opens.
4. Record only Zalo Web **public landing/login availability and redirects**. Never log credentials, cookies, query parameters, message text, or session tokens. No claim of independent session support.
5. Use navigation back; app stays responsive; relaunch app.
6. Synthetic Account B and C alert buttons display **fake events only**; confirm no APNs/FCM push is delivered.
7. Explicitly verify official Zalo native application remains unmodified and unobserved.

## Evidence template
| Test | iOS result/evidence | Android result/evidence |
|---|---|---|
| Signed installation and app launch | NOT RUN | NOT RUN |
| Navigation / app restart | NOT RUN | NOT RUN |
| WebView public page/redirect | NOT RUN | NOT RUN |
| Synthetic-only alerts | NOT RUN | NOT RUN |

**M1.6 acceptance:** Physical iPhone and Android installations plus documented smoke-test outcomes. A successfully exported JavaScript bundle or simulator test is useful but not sufficient.
