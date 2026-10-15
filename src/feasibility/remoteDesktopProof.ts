/**
 * M2.6 private remote-desktop feasibility contract.
 * This module does not connect to a browser, access Zalo, or enable live sessions.
 * Browser profile contents and Zalo authentication remain outside our backend.
 */
export type RemoteProofStep =
  | 'zalo-usage-reviewed'
  | 'private-host-provisioned'
  | 'trusted-https-and-mfa'
  | 'iphone-desktop-access'
  | 'official-desktop-login'
  | 'manual-read-only-access'
  | 'account-b-restart-persistence'
  | 'account-bc-isolation';

export const PROOF_STEPS: readonly RemoteProofStep[] = Object.freeze([
  'zalo-usage-reviewed',
  'private-host-provisioned',
  'trusted-https-and-mfa',
  'iphone-desktop-access',
  'official-desktop-login',
  'manual-read-only-access',
  'account-b-restart-persistence',
  'account-bc-isolation',
]);

export type ManualOutcome = 'untested' | 'pass' | 'fail';
export type RemoteProofRecord = Readonly<{
  accessUrl?: string;
  results: Partial<Record<RemoteProofStep, ManualOutcome>>;
}>;

export function validateRemoteDesktopUrl(raw: unknown): string | null {
  if (typeof raw !== 'string' || raw.length > 255) return null;
  let url: URL;
  try { url = new URL(raw); } catch { return null; }
  if (url.protocol !== 'https:' || !url.hostname.includes('.') ||
      url.username || url.password || url.search || url.hash ||
      url.pathname !== '/' || url.port) return null;
  if (/^(localhost|127\.|0\.|10\.|192\.168\.|169\.254\.)/i.test(url.hostname) ||
      url.hostname.endsWith('.localhost') || url.hostname.endsWith('.local') ||
      url.hostname.endsWith('.invalid')) return null;
  return url.origin + '/';
}

export type RemoteProofAssessment = Readonly<{
  stage: 'host-required' | 'security-required' | 'feasibility-untested' | 'evidence-review-needed';
  privateDesktopAvailable: boolean;
  realZaloIntegrationEnabled: false;
  notificationIntegrationEnabled: false;
  missingSteps: readonly RemoteProofStep[];
}>;

/**
 * Claimed booleans/observations never switch on a real Zalo integration.
 * Evidence requires external human verification on user-controlled infrastructure.
 */
export function assessRemoteDesktopProof(record: RemoteProofRecord): RemoteProofAssessment {
  const url = validateRemoteDesktopUrl(record.accessUrl);
  const steps = PROOF_STEPS;
  const results = record.results || {};
  const missingSteps = steps.filter(step => results[step] !== 'pass');
  const securitySteps: RemoteProofStep[] = [
    'zalo-usage-reviewed', 'private-host-provisioned', 'trusted-https-and-mfa'
  ];
  return {
    stage: !url ? 'host-required' :
      securitySteps.some(step => results[step] !== 'pass') ? 'security-required' :
      missingSteps.length ? 'feasibility-untested' : 'evidence-review-needed',
    privateDesktopAvailable: Boolean(url && securitySteps.every(step => results[step] === 'pass')),
    realZaloIntegrationEnabled: false,
    notificationIntegrationEnabled: false,
    missingSteps,
  };
}
