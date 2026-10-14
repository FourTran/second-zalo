# M2 — Supported personal-client feasibility (offline research)
Date: 2026-10-14. Scope: documentation and safe implementation prep only. **NO real-device Zalo test has been performed.**

## Evidence and source classification
| Source | Verified statement | What this does NOT prove |
|---|---|---|
| [Zalo Help — Tải Zalo](https://help.zalo.me/tai-zalo/) | Official Zalo clients include Android, iOS, Windows, Mac and Web; mobile instructions direct users to app and PC instructions to browser at id.zalo.me | Embedded iPhone/Android WebView login compatibility, multi-account usage, personal message events |
| [Zalo PC](https://www.zalo.me/pc) | Zalo provides a desktop/Web variant | Allowed hosted desktop sessions or background event access |
| [Zalo platform OA Open APIs](https://docs.zaloplatforms.com/docs/OA) | API, OAuth and Webhook descriptions explicitly target Official Accounts and ZBS business messaging | General personal-to-personal chat webhooks or independent personal chat sends |
| [WebView reference](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Reference.md) | `sharedCookiesEnabled=false` does not itself guarantee independent per-account cookie stores; incognito discards persistence | B/C isolation or restart durability |
| [Apple WKWebsiteDataStore](https://developer.apple.com/documentation/webkit/wkwebsitedatastore) | Default WebKit store is persistent; nonpersistent store is in-memory; explicit data-store configuration is required for isolation strategy | React Native WebView currently exposing a verified persistent per-account profile API |

## Actual previously observed behavior (user-reported, not re-tested in this milestone)
- iPhone Safari and Chrome Desktop Mode at chat.zalo.me redirected to the App Store.
- iPhone id.zalo.me appeared as the main Zalo corporate site, not a login.
- These do **not** prove the in-app iOS WebView or Android WebView behavior. Device tests remain UNTESTED.

## Results by phase (manual verification explicitly deferred)
| M2 phase | Offline work | Gate status |
|---|---|---|
| 2.1 Published clients / documented APIs | Research recorded with sources | RESEARCH COMPLETE, supported personal API not found in reviewed scope |
| 2.2 iOS WebView | Safe user-triggered diagnostic and navigation classifier prepared | UNTESTED on iPhone |
| 2.3 Android WebView | Same code path, platform label, and navigation guard | UNTESTED on Android |
| 2.4 Manual login, reading and replying | No scripted sends, credentials or page inspection | UNKNOWN — user/device test required |
| 2.5 Session persistence and storage isolation | Apple documentation risk and validation plan captured | UNKNOWN — no independent B/C sessions |
| 2.6 Permitted remote browser alternative | Concept and proof obligations below | RESEARCH ONLY — no server/session created |
| 2.7 Per-platform GO/NO-GO | Decision gates and outcome template available | **UNDECIDED / BLOCKED** |

## Remote browser alternative — research only
A dedicated, user-controlled desktop browser may provide an additional client surface to view on the phone. This is NOT established as a supported way to log in personal Zalo, and must not be deployed until review of Zalo's permitted usage and platform policy. Any future design requires distinct approved browser profiles, secure per-user access, normal user-led sign-in, explicit logout/deletion, zero backend password storage, and no webpage scripting, session interception, hidden network APIs, or automatic message sends. Persistent hosting cost and notification event source remain UNKNOWN.

## What the diagnostic does and does not do
- The React Native M2 diagnostic opens only user-requested official HTTPS zalo.me domains, categorizes and blocks App Store/external schemes, and never stores full navigation URLs or any page data.
- **A redirect to the App Store is a failed web-client feasibility observation**, not evidence that Zalo supports embedding. No app-store/native-Zalo handoff is performed.
- The guard is a safety feature, not a technique to bypass website restrictions. The WebView displays only what the official website permits.
- No production event ingestion, real push, simulated live Zalo messages, or native Zalo interaction is enabled.

## Conclusion
M2 offline research and diagnostic scaffolding are implementable without Expo/Apple signup. **M2 as a product feasibility milestone cannot be marked complete**: normal user login, manual chat, persistence, B/C isolation, and an authorized event source require permitted practical evidence on both platforms. No automatic Go decision.

Next work when independently possible: obtain developer signing and test on real devices, record anonymized screenshots of navigation outcomes only, and proceed only when legitimate web login works. If blocked, record NO-GO or escalate to alternative compliant architecture, not automated bypass.
