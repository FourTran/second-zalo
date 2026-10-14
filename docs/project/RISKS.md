# Risk Register
| ID | Severity | Risk | Evidence / mitigation |
|---|---|---|---|
| R1 | CRITICAL | Zalo Web redirects mobile users to App Store | User observed redirects in iPhone Safari/Chrome; M2 WebView diagnostic prepared, not tested |
| R2 | CRITICAL | Separate WebViews share default cookie/data store | Apple [WKWebsiteDataStore](https://developer.apple.com/documentation/webkit/wkwebsitedatastore); verify real account separation on both OS before claiming multi-account |
| R3 | CRITICAL | No permitted personal-message event hook | Reviewed [Zalo OA APIs](https://docs.zaloplatforms.com/docs/OA) are for Official Accounts, not a documented personal inbox bridge |
| R4 | HIGH | Hosted browser auth/permission/compliance uncertain | Only consider consent-based isolated profiles if legitimate usage verified |
| R5 | HIGH | App-store/trademark/platform restrictions | Legal and store-policy review before external rollout |
| R6 | HIGH | Accidental credential/token exposure in diagnostic logs | Do not persist, transmit or render full navigation URLs, scripts, message contents, cookies or tokens |
| R7 | HIGH | iOS/Android background delivery differs | Separate physical lock-screen testing after authorized event source |
| R8 | MEDIUM | Mock behavior mistaken for working personal Zalo | Keep explicit demo labeling, fail-closed adapter and blocked gates |
| R9 | MEDIUM | Browser popup or external redirect is blocked by safe diagnostic | Record behavior; do not weaken safety by allowing app schemes or arbitrary external URLs |
