/**
 * Offline, manual Zalo Web feasibility observations only.
 * This module NEVER authenticates, reads messages or contacts Zalo.
 */
export const OFFICIAL_WEB_URL = 'https://chat.zalo.me/';
export const PLATFORMS = Object.freeze([
  Object.freeze({id:'iphone-safari',label:'iPhone · Safari'}),
  Object.freeze({id:'iphone-chrome',label:'iPhone · Chrome'}),
  Object.freeze({id:'android-chrome',label:'Android · Chrome'}),
  Object.freeze({id:'desktop-browser',label:'Desktop · Chrome / Edge'})
]);
export const ACCOUNTS = Object.freeze(['B','C','D']);
export const OUTCOMES = Object.freeze([
  Object.freeze({id:'not-tested',label:'Not tested'}),
  Object.freeze({id:'login-screen',label:'Official login screen appeared'}),
  Object.freeze({id:'store-redirect',label:'Redirected to app or store'}),
  Object.freeze({id:'unsupported',label:'Unsupported / error'}),
  Object.freeze({id:'manual-chat',label:'I manually read and replied in web client'})
]);
const PLATFORM_IDS=new Set(PLATFORMS.map(x=>x.id));
const OUTCOME_IDS=new Set(OUTCOMES.map(x=>x.id));

export function createState(platform='iphone-safari') {
  if (!PLATFORM_IDS.has(platform)) throw new Error('Invalid platform');
  return {
    platform,
    observations:Object.fromEntries(ACCOUNTS.map(label=>[label, label==='B' && (platform==='iphone-safari'||platform==='iphone-chrome') ? 'store-redirect':'not-tested'])),
  };
}
export function selectPlatform(_state,platform) {
  return createState(platform); // Clear all results: they belong to a different platform.
}
export function recordOutcome(state, account, outcome) {
  if (!ACCOUNTS.includes(account) || !OUTCOME_IDS.has(outcome)) throw new Error('Invalid observation');
  if (!PLATFORM_IDS.has(state.platform)) throw new Error('Invalid platform');
  return {platform:state.platform,observations:{...state.observations,[account]:outcome}};
}
export function summarize(state) {
  const platform=PLATFORMS.find(p=>p.id===state.platform);
  if (!platform) throw new Error('Invalid platform');
  const rows=ACCOUNTS.map(account=>{
    const outcome=OUTCOMES.find(x=>x.id===state.observations[account]);
    if (!outcome) throw new Error('Invalid observation');
    return {account,outcome:outcome.label,code:outcome.id};
  });
  const hasUserReportedChat=rows.some(x=>x.code==='manual-chat');
  return Object.freeze({
    platform:platform.label,
    rows,
    conclusion:hasUserReportedChat
      ? 'User-reported manual browser result only. Independent sessions and notifications remain unverified.'
      : 'No verified Zalo personal session. Independent sessions and notifications remain unverified.',
  });
}
export function formatReport(state) {
  const report=summarize(state);
  return [
    'ZALO HUB — ANONYMOUS WEB FEASIBILITY REPORT',
    'Platform: '+report.platform,
    ...report.rows.map(x=>'Account '+x.account+': '+x.outcome),
    'Validation: SELF-REPORTED only. No Zalo data was read by this test website.',
    'Isolation: NOT VERIFIED | Incoming events: NOT VERIFIED | Push: DISABLED',
    'Official native Zalo app: OUT OF SCOPE',
  ].join('\n');
}
