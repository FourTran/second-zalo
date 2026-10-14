# Project HQ — Second Zalo / Zalo Hub
Updated: 2026-10-14

## Source of truth
- Repo: https://github.com/FourTran/second-zalo
- Owner: FourTran
- Status: [STATUS.md](STATUS.md)
- Plan: [ROADMAP.md](ROADMAP.md)
- Governance: [AGENTS.md](../../AGENTS.md)
- Decisions: [DECISIONS.md](DECISIONS.md)
- Risks: [RISKS.md](RISKS.md)
- Thread instructions: [CHATGPT_PROJECT_INSTRUCTIONS.md](CHATGPT_PROJECT_INSTRUCTIONS.md)

## Vision
On one iOS or Android phone, use a completely independent companion application for multiple personal Zalo accounts B, C, D… without switching the official native Zalo app. Ideally receive accurate per-account new-message alerts and open the appropriate usable session to reply manually.

## Boundary
Native Zalo and Account A are never modified, automated, observed, or linked. This is a separate third-party companion, not an official Zalo product or Zalo OA integration.

## Architecture hypothesis, not confirmed capability
React Native + Expo Router + TypeScript; session adapter interface for WebView or legitimately operated remote browser profiles; Cloudflare Workers + D1 for our own metadata/authorized notification processing; APNs/FCM via a documented push delivery layer. Neither Zalo Web compatibility nor personal message events are validated.

## Definition of MVP
1. Two or more **independently authenticated** accounts inside Zalo Hub on both platforms (each assessed separately).
2. User can read and manually reply through a permitted client for each account.
3. Session persistence, recovery and cross-account isolation verified on real devices.
4. An authorized incoming-message event source verified and routed to account-correct notifications.
5. Native Zalo remains untouched, with privacy and reliability tests complete.

If any critical gate fails, re-scope MVP openly; do not simulate production functionality.

## Working agreement
Every project chat reads GitHub status first, works on exactly one milestone/phase, commits via PR, reports test evidence and updates status. The user controls approval to move to production or send real messages.
