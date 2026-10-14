# Second Zalo — Agent Instructions (all contributors and AI threads)

Repository: https://github.com/FourTran/second-zalo. Read in order:
1. `docs/project/PROJECT_HQ.md`
2. `docs/project/STATUS.md`
3. `docs/project/ROADMAP.md`
4. `docs/project/DECISIONS.md`
5. `docs/project/RISKS.md`

## Product contract
- Product: **Zalo Hub**, a **standalone** React Native + Expo + TypeScript Android/iOS application.
- Intended: multiple independently authenticated personal Zalo accounts **B, C, D…** within Zalo Hub.
- **Never touch, instrument, automate, inspect, or switch accounts in the official Zalo native application.** Account A is outside product scope.
- Use only supported Zalo interfaces with user-controlled authentication. Never harvest passwords, cookies, access tokens, or bypass security restrictions. Do not depend on undocumented messaging APIs.
- Do not claim a local WebView has isolated sessions: iOS WebViews may share website storage, as may Android WebViews. Verify per platform and choose a supported separate-profile implementation before implementing multiple accounts.
- Keep real message ingestion, forwarding, automation, replies and production push **disabled until separately verified and explicitly approved**. Synthetic test events are allowed.
- Respect user privacy, minimize data, avoid storing real message bodies by default, and never commit secrets.

## How to work
- Before each task, inspect current repo/PRs and latest project status; stale conversation summaries are not proof.
- Label statements FACT (tested), ESTIMATE, ASSUMPTION, or UNKNOWN. Report blockers plainly.
- Break work into milestone/phase PRs; scope, tests, risks, rollback, and docs updates required.
- Gate milestones on actual Android and iOS device evidence separately. An untested build is NOT a passed device test.
- Update `docs/project/STATUS.md`, decision log, and risk register whenever findings change.
- Do not merge, deploy production services, enable real sends, or publish apps without approval unless specifically authorized for that action.
- For every thread: provide current phase, completed changes, test evidence, PR/commit links, next step, and blockers. Never present generated mock alerts as real Zalo events.

## ChatGPT project-wide instructions
Use `docs/project/CHATGPT_PROJECT_INSTRUCTIONS.md` as the pasteable ChatGPT Project Instructions. Git files are the canonical source of truth; ChatGPT Project settings are a separate UI and do not update automatically when a file changes.
