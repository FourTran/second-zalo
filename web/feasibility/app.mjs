import {ACCOUNTS, OFFICIAL_WEB_URL, OUTCOMES, createState, selectPlatform, recordOutcome, formatReport} from './logic.mjs';

const platform=document.getElementById('platform');
const accounts=document.getElementById('accounts');
const report=document.getElementById('report');
const tested=document.getElementById('tested-count');
const toast=document.getElementById('toast');
let state=createState(platform.value);

function notify(text) {
  toast.textContent=text;
  toast.hidden=false;
  // Avoid timers or external libraries: next button interaction hides it.
}
async function copyText(text) {
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(text);
    notify('Copied. Paste it manually into your browser or notes.');
  } catch {
    if (text===OFFICIAL_WEB_URL) notify('Clipboard unavailable. Manually type: '+OFFICIAL_WEB_URL);
    else { report.focus();report.select();notify('Select and copy the report text above.'); }
  }
}

function render() {
  const isKnownIphoneRedirect = state.platform==='iphone-safari' || state.platform==='iphone-chrome';
  document.getElementById('manual-test-steps').hidden=isKnownIphoneRedirect;
  document.getElementById('manual-url-box').hidden=isKnownIphoneRedirect;
  document.getElementById('manual-test-hint').hidden=isKnownIphoneRedirect;
  accounts.replaceChildren();
  for(const account of ACCOUNTS) {
    const card=document.createElement('div');card.className='account';
    const row=document.createElement('div');row.className='account-row';
    const title=document.createElement('div');title.className='account-title';
    const avatar=document.createElement('span');avatar.className='avatar';avatar.textContent=account;
    const titleText=document.createElement('span');
    const strong=document.createElement('strong');strong.textContent='Account '+account;
    const small=document.createElement('small');small.textContent='Manual observation only';
    titleText.append(strong,small);title.append(avatar,titleText);
    const badge=document.createElement('span');badge.className='label-neutral';badge.textContent='NOT CONNECTED';
    row.append(title,badge);
    const label=document.createElement('label');label.className='field-label';label.textContent='What happened for Account '+account+'?';
    const select=document.createElement('select');select.setAttribute('aria-label','Account '+account+' observation');
    label.htmlFor='outcome-'+account;select.id='outcome-'+account;
    for(const o of OUTCOMES){
      const opt=document.createElement('option');opt.value=o.id;opt.textContent=o.label;select.append(opt);
    }
    select.value=state.observations[account];
    select.addEventListener('change',event=>{state=recordOutcome(state,account,event.target.value);updateReport();});
    card.append(row,label,select);accounts.append(card);
  }
  updateReport();
}
function updateReport() {
  report.value=formatReport(state);
  const count=Object.values(state.observations).filter(value=>value!=='not-tested').length;
  tested.textContent=count+' / '+ACCOUNTS.length;
}
platform.addEventListener('change',event=>{toast.hidden=true;state=selectPlatform(state,event.target.value);render();});
document.getElementById('copy-url').addEventListener('click',()=>{toast.hidden=true;void copyText(OFFICIAL_WEB_URL);});
document.getElementById('copy-report').addEventListener('click',()=>{toast.hidden=true;void copyText(report.value);});
document.getElementById('reset').addEventListener('click',()=>{toast.hidden=true;state=createState(platform.value);render();});
render();
