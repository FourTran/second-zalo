/** A successful JS bundle or synthetic test is NEVER evidence of live Zalo capability. */
export const MANDATORY_RELEASE_GATES = Object.freeze([
  'ios-signed-device-build',
  'android-signed-device-build',
  'ios-supported-personal-login',
  'android-supported-personal-login',
  'ios-bc-isolation-and-restart',
  'android-bc-isolation-and-restart',
  'ios-manual-reading-and-reply',
  'android-manual-reading-and-reply',
  'permitted-personal-message-event-source',
  'ios-locked-phone-notification-routing',
  'android-locked-phone-notification-routing',
  'privacy-and-security-review',
  'platform-distribution-compliance',
  'explicit-production-approval'
] as const);
export type ReleaseGate = typeof MANDATORY_RELEASE_GATES[number];
export type GateEvidence = Readonly<{gate:ReleaseGate;state:'unverified'|'failed'|'passed';evidenceUrl?:string}>;

export type ReleaseAssessment = Readonly<{
  status:'blocked';
  missing:ReadonlyArray<ReleaseGate>;
  cause:'real-zalo-integration-not-implemented';
  liveFeaturesEnabled:false;
}>;

/**
 * Fail-closed until a separate PR implements documented real Zalo support and
 * independent device proof. Even user-supplied "passed" booleans cannot
 * activate production from this prototype build.
 */
export function assessReleaseReadiness(evidence: readonly GateEvidence[] = []): ReleaseAssessment {
  const accepted=new Set<ReleaseGate>();
  for(const e of evidence) {
    if(e.state==='passed' && e.evidenceUrl?.startsWith('https://')) accepted.add(e.gate);
  }
  return {
    status:'blocked',
    missing:MANDATORY_RELEASE_GATES.filter(g=>!accepted.has(g)),
    cause:'real-zalo-integration-not-implemented',
    liveFeaturesEnabled:false,
  };
}
