# M2.6 — Private Cloud Desktop Feasibility (iPhone-only operator)
Date: 2026-10-15. **DESIGN/TEST PLAN ONLY — no VM provisioned, no Kasm installation, no Zalo login.**

## Decision context
- Prior observed user result: iPhone Safari/Chrome desktop-mode `chat.zalo.me` redirects to the App Store. Do not repeat it.
- A Cloudflare Worker hosts the static feasibility page, not an interactive operating-system desktop.
- Cloudflare Containers have ephemeral disks by default; they are NOT a verified persistent personal Zalo browser profile solution.
- Kasm Cloud Personal (hosted) explicitly deletes workspaces after each use and has no persistent profiles. It can test remote UI, NOT session durability.
- **Candidate:** a private, operator-controlled Linux VM with Kasm Workspaces providing an HTTPS browser desktop that iPhone Safari can control. This is not a proven Zalo-sanctioned method.

## Infrastructure requirements (user must explicitly provision and authorize cost)
- **VM**: supported Ubuntu 24.04 LTS x86_64, persistent SSD. Vendor minimum 2 vCPU / 4 GB RAM / 75 GB disk; recommended exploratory headroom ~4 vCPU / 8 GB / 100 GB, NOT a benchmarked capacity requirement.
- **Provider**: any reputable vendor whose dashboard has a mobile browser console and configurable firewall. Hosting billing/approval belongs to owner. A Singapore region may reduce latency for Vietnam, but measure actual network behavior.
- **Hostname**: dedicated `desktop.<your-domain>` with a valid publicly trusted HTTPS certificate; never accept a browser certificate warning before using credentials.
- **Access**: authenticated Kasm account with MFA and vendor-recommended hardening, no anonymous/public VNC/RDP, no published raw desktop port; restrict administration. Use provider firewall and (if desired) an authenticated zero-trust reverse proxy. Do not expose Kasm before authentication is configured.
- **Profiles**: persistent encrypted/private host storage for browser profile B. When introducing C, use a distinct Kasm user identity and unique persistent profile path, verify actual cookie/storage separation and deletion. Never mount B/C onto the same home/browser profile.
- **Do not** configure Zalo app-scheme redirects, QR-scanning through native Zalo, browser UA spoofing, session-cookie extraction, DOM scripting, network inspection, private APIs, automatic replies, forwarding or push. Native Zalo Account A untouched.

## Browser-only steps the owner can take from iPhone
1. Choose a VM vendor, purchase/authorize an Ubuntu 24.04 VM and open its **provider browser console** in Safari; no Mac is required. Record only the VM provider and non-sensitive OS/resource metadata in GitHub.
2. Follow the official [Kasm single-server install guide](https://docs.kasm.com/docs/install/single_server_install). The guide provides version-specific, checksum-verified download commands. Use the currently verified vendor release; do not paste commands from untrusted blogs.
3. Store newly generated Kasm admin and user credentials **in your own password manager**; never share them here or commit them. Rotate vendor defaults and enable MFA. Configure valid HTTPS, access restrictions and maintenance updates before entering private credentials.
4. From Safari open the dedicated Kasm HTTPS hostname, sign in to Kasm, and launch a standard **desktop Chrome** browser. Confirm it is a remote browser (not iPhone Chrome desktop mode). Test pointer, keyboard, clipboard and logout.
5. Review Zalo's current terms/policy for hosted desktop-browser use. **Only if the usage is permitted**, navigate normally inside that desktop browser to the official Zalo web client from [Zalo PC documentation](https://help.zalo.me/tai-zalo/) (e.g. via `id.zalo.me`). Do not try unsupported user-agent overrides, iframe proxies or cloned login forms.
6. If the official client offers phone number/password login, enter Account B credentials **only on the genuine Zalo-owned page inside your protected remote browser**, with no screen recording or credential collection by Zalo Hub. Never send passwords or OTP to ChatGPT.
7. If only a QR/approval method requiring the native Zalo app is offered, or if cloud use is prohibited, **STOP / NO-GO**. We will not touch the native app or work around the restriction.
8. If Account B is logged in legitimately, **read-only manual test**: verify that a chat list is visible. No test sends until separately approved.
9. Close and reopen the remote browser session, using a uniquely persistent B profile, and observe whether sign-in survives. Do not automatically assert persistence just because desktop cookies exist.
10. Only after B passes, create a distinct C Kasm user/profile, repeat user-led login, switch between both, and ensure that signing out B does not sign out C. Repeat after a host restart; verify profile data protection and deletion.
11. Send only anonymized results: 'desktop opens Y/N', 'official login allowed Y/N', 'password login offered Y/N', 'read-only chats accessible Y/N', 'B survives restart Y/N', 'C isolated Y/N'. No contacts, chats, names, secrets or session IDs.

## Explicit gates
| Gate | Status now | Required evidence |
|---|---|---|
| User-owned VM available | NOT CONFIGURED | Owner-authorized VM, protected network |
| Kasm HTTPS login works from Safari | NOT TESTED | Physical iPhone Safari manual check |
| Kasm security + MFA | NOT CONFIGURED | Valid trusted TLS and MFA |
| Zalo permits cloud desktop login | UNKNOWN | Terms/official authorization or legitimate usage confirmed |
| Normal Account B login without native app | UNVERIFIED | Official client, optional password login if supported |
| Manual read-only chat access | UNVERIFIED | Explicit user's sanitized test report |
| B remains logged in after restart | UNVERIFIED | Persistent profile real-world test |
| C isolation and B logout independence | UNVERIFIED | Separate profiles and both accounts |
| Incoming personal-message event hook | UNVERIFIED | **Separate M5 blocker, NOT solved by remote desktop** |

## Security caveats
Cloud operators and Kasm administrators may have privileged infrastructure access. Minimize access, do not centrally log browser content, use OS patching, account-specific permissions, disk protections, restricted sessions and safe backups. An unreviewed cloud desktop should **not** be treated as a secure vault for Zalo credentials.

## What is implemented in repo
Pure TypeScript `src/feasibility/remoteDesktopProof.ts` and unit tests classify HTTPS endpoint readiness and gates; they intentionally **never enable** a real Zalo adapter, message ingestion or notifications. No VM creation API, payment, login or desktop is deployed.

## References
- [Kasm system requirements](https://docs.kasm.com/docs/develop/explanations/system-requirements)
- [Kasm single server installation](https://docs.kasm.com/docs/install/single_server_install)
- [Kasm persistent browser profiles](https://docs.kasm.com/docs/latest/how-to/data-storage/persistent-profiles)
- [Kasm security hardening](https://docs.kasm.com/docs/latest/how-to/security/kasm-workspaces-security)
- [Kasm MFA configuration](https://docs.kasm.com/docs/1.19.0/how-to/security/users-groups-mgmt/two-factor)
- [Kasm Cloud Personal ephemeral limitation](https://kasm.com/cloud-personal)
- [Zalo published clients](https://help.zalo.me/tai-zalo)
