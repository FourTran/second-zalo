import type { AccountView } from '../sessions/accountManager';
import type { AdapterFeasibility, SupportedPlatform } from '../core/sessionAdapter';

/** This is a UI eligibility test, not a messaging API. No live viewer is registered. */
export type ChatEligibility =
  | 'unknown-account'
  | 'not-authenticated'
  | 'adapter-unverified'
  | 'viewer-unavailable'
  | 'eligible';

export function validCompanionAccountRoute(id: string): boolean {
  return /^hub-[B-Z]$/.test(id);
}

export function manualChatEligibility(options: {
  account?: AccountView;
  platform: SupportedPlatform;
  feasibility?: AdapterFeasibility;
  supportedViewerRegistered: boolean;
}): ChatEligibility {
  const { account, platform, feasibility, supportedViewerRegistered } = options;
  if (!account || !validCompanionAccountRoute(account.id)) return 'unknown-account';
  if (account.state !== 'authenticated') return 'not-authenticated';
  if (!feasibility || feasibility.platform !== platform ||
      feasibility.officialLoginSupported !== true ||
      feasibility.manualMessagingSupported !== true ||
      feasibility.independentlyIsolatedStorage !== true) return 'adapter-unverified';
  if (!supportedViewerRegistered) return 'viewer-unavailable';
  return 'eligible';
}
