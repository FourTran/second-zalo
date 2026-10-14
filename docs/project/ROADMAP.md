# Roadmap V4 — Implementation vs Product Acceptance
GitHub: https://github.com/FourTran/second-zalo

| Milestone | Offline/test-only deliverables | Required product gate |
|---|---|---|
| M1 Foundation | Expo starter, UI, CI, synthetic Worker | Signed physical iOS+Android builds |
| M2 Zalo Feasibility | Official published API/client research, safe WebView diagnostic | Legal supported login/read/reply both OS |
| M3 Sessions | Metadata registry, lifecycle locks, fail-closed session adapter | Independent B/C authenticated isolation, recovery |
| M4 Messaging | Account-scoped screens, manual chat policy gate | Genuine supported manual messaging/attachments |
| M5 Events | Synthetic-only, account-typed event ledger | Documented permitted personal-message source |
| M6 Notifications | Synthetic inbox, route to correct demo account | APNs/FCM, real locked-device push and correct chat routing |
| M7 Security | Threat model, negative tests, hard-disabled real features | Device review, privacy and recovery evidence |
| M8 Release | Deterministic blocked release gate, beta runbook | Signed builds, beta validation, store/legal and explicit owner approval |

**Cross-platform acceptance:** Prove each gate separately on iOS and Android. Account A/native Zalo is out of scope; no unofficial personal messaging APIs, hidden notifications, credentials or cookies. Successful CI NEVER means full product milestone completion.

**Execution:** only supported and permitted integration; if a critical gate fails, document a NO-GO/PIVOT rather than declaring working software.
