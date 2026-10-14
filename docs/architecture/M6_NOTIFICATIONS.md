# M6 — Alert Routing Scaffold

## Completed test-only elements
- A bounded, local-only synthetic alert inbox with account filtering, deduplication and marking viewed.
- Synthetic alert screens navigate exclusively to their matching `hub-B`, `hub-C` routes inside **Zalo Hub**.
- No message read receipts are inferred or sent to Zalo.
- No APNs/FCM tokens, server-side push requests or lock-screen notifications are implemented.

## Product gating
A real authorized personal-message event source (M5) has NOT been found. Before enabling live push: supported source documented, per-platform user consent, secure token registration/auth, APNs/FCM configuration, iOS/Android physical locked-phone testing, correct account opens, recovery and revocation. Do not send real message bodies in push by default.

**M6 code foundation only; product notifications remain blocked.**
