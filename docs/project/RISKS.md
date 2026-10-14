# Risk Register
| ID | Severity | Risk | Mitigation / proof |
|---|---|---|---|
| R1 | CRITICAL | Official Zalo Web redirects mobile browsers | Test actual iOS/Android WebView via normal permitted login; go/no-go |
| R2 | CRITICAL | Multi-WebView cookie/session sharing | Real device B/C isolation + logout/restart tests; no assumed isolation |
| R3 | CRITICAL | No supported personal message event source | Investigate official/documented capabilities; block live notification claims |
| R4 | HIGH | Cloud browser session costs, auth challenges, terms | Feasibility study without proxying credentials or bypassing controls |
| R5 | HIGH | Zalo or store policy prohibits distribution/branding | Legal/platform review before beta/public launch |
| R6 | HIGH | Private chat contents/session tokens exposed | Never collect Zalo passwords; minimize data; secrets server side |
| R7 | HIGH | iOS/Android background delivery differs | Platform-specific APNs/FCM and locked-device tests |
| R8 | MEDIUM | Misleading prototype status | Maintain STATUS and explicit synthetic/real labels |
