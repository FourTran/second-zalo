# Second Zalo — Open Risks
| ID | Severity | Risk | Status |
|---|---|---|---|
| R1 | CRITICAL | Mobile Zalo Web redirects to App Store | WebView real-device gate untested |
| R2 | CRITICAL | WebView profiles may share cookies | No independently verified B/C sessions |
| R3 | CRITICAL | No documented personal chat incoming event source | **BLOCKS M5 and M6** |
| R4 | HIGH | Hosted browser allowed usage/cost unknown | Do not deploy |
| R5 | HIGH | App Store / trademark policy | Legal/platform review before public release |
| R6 | HIGH | Personal information leakage | Metadata only, do not log cookies or message bodies |
| R7 | HIGH | iOS/Android locked device behavior differs | Signed device test deferred |
| R8 | HIGH | Synthetic alerts mistaken for real | All demo events explicitly typed synthetic |
