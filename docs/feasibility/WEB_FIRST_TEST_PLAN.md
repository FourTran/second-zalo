# Web-first Feasibility Lab — Test Plan

Date: 2026-10-15. Scope: **safe UI + manual browser observations**. This page is not a personal Zalo client and does not solve existing iPhone App Store redirects.

## Why a website first
- Launch a mobile-friendly account dashboard without Expo, Apple signing or device installation.
- Document exactly what happens when opening **official** Zalo Web on iPhone, Android or desktop.
- Validate the *concept* of navigating between B/C/D account records and gathering anonymized results.
- Detect a supported-client blocker early, before spending on the native build or remote browser hosting.

## Technical limitations
- A website at our domain has a different origin from `chat.zalo.me`; browser same-origin security prevents reading Zalo cookies, login state, chats, unread counts or incoming messages.
- Embedding the official site in an iframe may be restricted by the Zalo site's frame/CSP policies. We intentionally do **not** embed, mirror or proxy it.
- Independent browser tabs do not isolate personal-account cookie jars. **Two tabs are not equivalent to accounts B/C independently signed in.**
- Visiting official Zalo Web on an iPhone may still redirect to the App Store. The test never forces native app launch or circumvents that restriction.
- “I manually read and replied” is a **self-reported observation**, not a verified Zalo session and not an authorized message integration.
- This website has **no server-side login, D1 binding, push or event ingestion**. No Zalo passwords, QR codes, cookies, messages, contact identifiers or results are captured or stored.

## Using the page
1. Run locally using `npm run web:serve` or deploy the static directory to a nonproduction preview (separate approval required).
2. Choose your **actual device/browser** from the dropdown.
3. Copy the official `https://chat.zalo.me/` URL.
4. Paste it into the selected browser **yourself**; if redirected to native app or store, stop the test.
5. Back on the test website, record the outcome for your intended companion account B, C or D.
6. Copy the anonymous report and share the text in ChatGPT or a GitHub issue (never send passwords or screenshot personal chats).
7. Switch platforms to reset and test again. Closing the page clears results.

## Acceptance scope
- **Pass (code-only):** browser page loads, account observations stay isolated in memory, report copies accurately, URL is always official, no background network requests or session access, unit tests pass.
- **Not an acceptance test:** real Zalo account login, persistence, B/C isolation, manual messaging functionality, permitted event detection, real notifications.
- **Pivot decision:** If the official web client does not work on iPhone or Android, stop attempting URL workarounds. Consider a user-controlled, legitimate hosted desktop browser only after permitted usage and security have been reviewed.

## Hosting next step (not performed)
Static directory: `web/feasibility`, no build command. A development-only Cloudflare Worker preview has been uploaded and enabled (NOT a production Zalo integration): https://zalo-hub-web-feasibility-preview.tranvantu4444.workers.dev/
The Cloudflare API confirmed script upload and workers.dev activation. The assistant's environment could not resolve external DNS to independently verify rendered page availability; the user must confirm it opens on their device. No custom DNS, analytics, contact forms or data collection were configured. The source of all four static assets lives in this repository. Use `npm run web:build-worker` to reproduce the static Worker script locally. Do not use the preview for real Zalo sign-in credentials.

## Corrected iPhone testing guidance
Do **not** ask users to open chat.zalo.me again in iPhone Safari or Chrome: user-observed results already show App Store redirect on both. The browser lab pre-fills the Account B redirect and hides the link for those platforms. Only Android or an actual desktop environment provides a meaningfully different test. The *cloud desktop* alternative requires separate architecture, permitted usage review, authorized hosting and user-led authentication; currently NONE is provisioned, no Zalo session is active and message events are still unsupported/unverified.
