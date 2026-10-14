/** Candidate supported session adapter API — no live implementation exists yet. */
export type AdapterKind = 'webview' | 'remote-browser';
export type SupportedPlatform = 'ios' | 'android';
export type SessionState = 'disconnected' | 'authenticating' | 'authenticated' | 'expired' | 'unavailable';

export interface AdapterFeasibility {
  platform: SupportedPlatform;
  officialLoginSupported: boolean | 'unverified';
  manualMessagingSupported: boolean | 'unverified';
  independentlyIsolatedStorage: boolean | 'unverified';
  notes?: string;
}

export interface SessionSnapshot {
  accountId: string;
  state: SessionState;
  lastCheckedAt: string;
}

export interface SessionAdapter {
  readonly kind: AdapterKind;
  feasibility(platform: SupportedPlatform): Promise<AdapterFeasibility>;
  connect(accountId: string): Promise<SessionSnapshot>;
  getStatus(accountId: string): Promise<SessionSnapshot>;
  disconnect(accountId: string): Promise<void>;
  destroy(accountId: string): Promise<void>;
}

/** Initial fail-closed adapter; it never claims a working Zalo login. */
export class UnavailableSessionAdapter implements SessionAdapter {
  readonly kind: AdapterKind;
  constructor(kind: AdapterKind) { this.kind = kind; }
  async feasibility(platform: SupportedPlatform): Promise<AdapterFeasibility> {
    return {
      platform,
      officialLoginSupported: 'unverified',
      manualMessagingSupported: 'unverified',
      independentlyIsolatedStorage: 'unverified',
    };
  }
  async connect(_accountId: string): Promise<SessionSnapshot> {
    throw new Error('No verified supported personal Zalo session adapter');
  }
  async getStatus(accountId: string): Promise<SessionSnapshot> {
    return { accountId, state: 'unavailable', lastCheckedAt: new Date().toISOString() };
  }
  async disconnect(_accountId: string): Promise<void> { /* no session exists */ }
  async destroy(_accountId: string): Promise<void> { /* no session exists */ }
}
