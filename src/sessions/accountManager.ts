import {
  type SessionAdapter,
  type SessionSnapshot,
  type SupportedPlatform,
  type SessionState,
  UnavailableSessionAdapter,
} from '../core/sessionAdapter';

/**
 * Holds PUBLIC account labels only. Never store Zalo credentials, web cookies,
 * personal messages, or authenticated status in this store.
 */
export type AccountMetadata = Readonly<{ id: string; label: string }>;
export type AccountView = AccountMetadata & Readonly<{ state: SessionState }>;

export interface AccountMetadataStore {
  list(): Promise<AccountMetadata[]>;
  save(account: AccountMetadata): Promise<void>;
  delete(accountId: string): Promise<void>;
}

export class MemoryAccountMetadataStore implements AccountMetadataStore {
  private readonly records = new Map<string, AccountMetadata>();
  async list(): Promise<AccountMetadata[]> { return [...this.records.values()].map(x => ({ ...x })); }
  async save(account: AccountMetadata): Promise<void> { this.records.set(account.id, { ...account }); }
  async delete(id: string): Promise<void> { this.records.delete(id); }
}

export class SessionNotVerifiedError extends Error {
  constructor() { super('This Zalo account session is not verified or supported on this device'); }
}

const ACCOUNT_LABEL = /^[B-Z]$/;
const MAX_ACCOUNTS = 16;

export class AccountManager {
  private readonly accounts = new Map<string, AccountView>();
  private readonly lockedAccounts = new Set<string>();
  private initialized = false;

  constructor(
    private readonly platform: SupportedPlatform,
    private readonly adapter: SessionAdapter = new UnavailableSessionAdapter('webview'),
    private readonly metadata: AccountMetadataStore = new MemoryAccountMetadataStore(),
  ) {}

  /** Restoring metadata never restores or asserts Zalo authentication. */
  async initialize(): Promise<void> {
    if (this.initialized) return;
    const records = await this.metadata.list();
    if (records.length > MAX_ACCOUNTS) throw new Error('Invalid account registry');
    const pending = new Map<string, AccountView>();
    for (const entry of records) {
      const label = entry.label.trim().toUpperCase();
      if (!ACCOUNT_LABEL.test(label) || entry.id !== `hub-${label}` || pending.has(entry.id)) {
        throw new Error('Invalid account registry');
      }
      pending.set(entry.id, { id: entry.id, label, state: 'unavailable' });
    }
    this.accounts.clear();
    for (const [key, value] of pending) this.accounts.set(key, value);
    this.initialized = true;
  }

  list(): AccountView[] {
    this.ensureInitialized();
    return [...this.accounts.values()].map(x => ({ ...x }));
  }

  get(id: string): AccountView | undefined {
    this.ensureInitialized();
    const account = this.accounts.get(id);
    return account ? { ...account } : undefined;
  }

  async add(rawLabel: string): Promise<AccountView> {
    this.ensureInitialized();
    const label = rawLabel.trim().toUpperCase();
    if (!ACCOUNT_LABEL.test(label)) throw new Error('Only Zalo Hub Account B through Z are allowed');
    const id = `hub-${label}`;
    if (this.accounts.has(id)) throw new Error('Account already exists');
    if (this.accounts.size >= MAX_ACCOUNTS) throw new Error('Account limit reached');
    const account = { id, label, state: 'unavailable' as const };
    await this.metadata.save({ id, label });
    this.accounts.set(id, account);
    return { ...account };
  }

  /** A real connection is blocked until the injected adapter passes platform checks. */
  async connect(id: string): Promise<AccountView> {
    return this.withAccountLock(id, async account => {
      const proof = await this.adapter.feasibility(this.platform);
      if (proof.platform !== this.platform ||
        proof.officialLoginSupported !== true ||
        proof.manualMessagingSupported !== true ||
        proof.independentlyIsolatedStorage !== true) throw new SessionNotVerifiedError();
      // No default adapter can reach this point.
      const snapshot = await this.adapter.connect(id);
      this.verifySnapshot(id, snapshot);
      const next = { ...account, state: 'authenticated' as const };
      this.accounts.set(id, next);
      return { ...next };
    });
  }

  async refreshStatus(id: string): Promise<AccountView> {
    return this.withAccountLock(id, async account => {
      const proof = await this.adapter.feasibility(this.platform);
      if (proof.platform !== this.platform ||
        proof.officialLoginSupported !== true ||
        proof.manualMessagingSupported !== true ||
        proof.independentlyIsolatedStorage !== true) {
        const next = { ...account, state: 'unavailable' as const };
        this.accounts.set(id, next);
        return { ...next };
      }
      const snapshot = await this.adapter.getStatus(id);
      if (snapshot.accountId !== id) throw new Error('Session account identity mismatch');
      const next = { ...account, state: snapshot.state };
      this.accounts.set(id, next);
      return { ...next };
    });
  }

  async disconnect(id: string): Promise<void> {
    await this.withAccountLock(id, async account => {
      await this.adapter.disconnect(id);
      this.accounts.set(id, { ...account, state: 'disconnected' });
    });
  }

  /** Delete session FIRST; if deletion fails keep metadata for recovery/retry. */
  async remove(id: string): Promise<void> {
    await this.withAccountLock(id, async () => {
      await this.adapter.destroy(id);
      await this.metadata.delete(id);
      this.accounts.delete(id);
    });
  }

  private verifySnapshot(expectedId: string, snapshot: SessionSnapshot): void {
    if (snapshot.accountId !== expectedId || snapshot.state !== 'authenticated') {
      throw new Error('Adapter did not provide an authenticated session for the requested account');
    }
  }

  private ensureInitialized(): void {
    if (!this.initialized) throw new Error('Initialize account manager before use');
  }

  private async withAccountLock<T>(
    id: string, work: (account: AccountView) => Promise<T>,
  ): Promise<T> {
    this.ensureInitialized();
    const account = this.accounts.get(id);
    if (!account) throw new Error('Unknown Zalo Hub account');
    if (this.lockedAccounts.has(id)) throw new Error('Account operation already in progress');
    this.lockedAccounts.add(id);
    try { return await work(account); }
    finally { this.lockedAccounts.delete(id); }
  }
}
