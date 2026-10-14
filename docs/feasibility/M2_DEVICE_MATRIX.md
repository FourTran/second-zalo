# M2 platform gate matrix — no hands-on tests performed
This is a **future evidence template**, not a list of tasks completed or a reason to block unrelated work. No credentials, tokens, full web URLs, cookies, message contents, or personal identifiers should be saved.

| Gate | iOS | Android | Acceptance |
|---|---|---|---|
| G1 Normal supported Account B login | UNTESTED | UNTESTED | User-controlled login in official interface |
| G2 Read a message and manually reply | UNTESTED | UNTESTED | Real user confirms ordinary chat works, no automation |
| G3 Retains B login after app cold restart | UNTESTED | UNTESTED | Session persists without moving to native Zalo |
| G4 B/C simultaneous independent login | UNTESTED | UNTESTED | Both logged in without cookie collision |
| G5 Logout B leaves C signed in | UNTESTED | UNTESTED | Proven isolation on each OS |
| G6 Authorized incoming personal-message event | UNVERIFIED | UNVERIFIED | Officially permitted event contract exists |
| G7 Locked-device real notification delivery | UNTESTED | UNTESTED | Only after G6 plus separate user approval |
| G8 Notification opens correct account | UNTESTED | UNTESTED | Only after G6/G7 |

Record device model, OS version, app version, git SHA, time/date, result PASS/FAIL/UNTESTED, expected versus observed behavior, and a sanitized screenshot (no chats or usernames). For tests involving actual sends, require separate explicit user approval. Never inspect or interact with the native Zalo app.
