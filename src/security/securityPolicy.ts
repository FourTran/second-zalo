/**
 * M7: Hard-coded release guardrails for the current prototype.
 * There is no real personal Zalo capability to enable in this build.
 */
export const RELEASE_FEATURES = Object.freeze({
  realPersonalMessageIngestion: false,
  automaticReplies: false,
  realMessageForwarding: false,
  productionPush: false,
  nativeZaloInteraction: false,
});

export type SafeDiagnosticCode =
  | 'unavailable'
  | 'redirect-blocked'
  | 'connection-failed'
  | 'session-not-verified'
  | 'invalid-account'
  | 'unknown';

export function safeDiagnosticCode(value: unknown): SafeDiagnosticCode {
  switch (value) {
    case 'unavailable':
    case 'redirect-blocked':
    case 'connection-failed':
    case 'session-not-verified':
    case 'invalid-account':
      return value;
    default:
      return 'unknown';
  }
}

/** Only public, locally assigned account identifiers are accepted as metadata. */
export function validatePublicAccountMetadata(input: unknown): {id:string;label:string} | null {
  if(!input || typeof input!=='object' || Array.isArray(input))return null;
  const obj=input as Record<string,unknown>;
  if(Object.keys(obj).length!==2) return null;
  if(typeof obj.id!=='string'||typeof obj.label!=='string')return null;
  if(!/^hub-[B-Z]$/.test(obj.id)||obj.label!==obj.id.slice(4))return null;
  return {id:obj.id,label:obj.label};
}

/** Never expose arbitrary error messages or session details in user-facing diagnostics. */
export function safeErrorSummary(_raw: unknown): string {
  return 'Operation unavailable. Check connection status in Zalo Hub.';
}
