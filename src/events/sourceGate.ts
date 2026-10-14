/** M5: source-safe event contract. Personal Zalo ingestion is NOT available. */
export type EventSource = 'synthetic-test' | 'personal-zalo';
export type SourceEvidence = Readonly<{
  source: EventSource;
  documentedInterface: boolean;
  platformVerified: boolean;
  authorizedByOwner: boolean;
}>;

export type SyntheticNotice = Readonly<{
  type: 'synthetic_message';
  source: 'synthetic-test';
  id: string;
  accountId: string;
  occurredAt: number;
}>;

/** Hard stop: no supported source adapter for personal Zalo exists in this build. */
export function livePersonalSourceSupported(_evidence?: SourceEvidence): false {
  return false;
}

export function acceptSyntheticNotice(value: unknown): SyntheticNotice | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  if (Object.keys(input).length !== 5) return null;
  if (input.source !== 'synthetic-test' || input.type !== 'synthetic_message') return null;
  if (typeof input.id !== 'string' || !/^[A-Za-z0-9_-]{8,64}$/.test(input.id)) return null;
  if (typeof input.accountId !== 'string' || !/^hub-[B-Z]$/.test(input.accountId)) return null;
  if (typeof input.occurredAt !== 'number' || !Number.isSafeInteger(input.occurredAt) || input.occurredAt < 0) return null;
  return Object.freeze({type:'synthetic_message',source:'synthetic-test',id:input.id,accountId:input.accountId,occurredAt:input.occurredAt});
}

export class SyntheticEventLedger {
  private readonly seen = new Set<string>();
  private readonly latest: SyntheticNotice[] = [];
  constructor(private readonly capacity = 128) {
    if (!Number.isInteger(capacity) || capacity < 1 || capacity > 1024) throw new Error('Invalid capacity');
  }
  ingest(value: unknown): 'accepted' | 'duplicate' | 'rejected' {
    const event = acceptSyntheticNotice(value);
    if (!event) return 'rejected';
    if (this.seen.has(event.id)) return 'duplicate';
    if (this.latest.length >= this.capacity) {
      const oldest=this.latest.shift();
      if (oldest) this.seen.delete(oldest.id);
    }
    this.latest.push(event);
    this.seen.add(event.id);
    return 'accepted';
  }
  byAccount(accountId: string): SyntheticNotice[] {
    if (!/^hub-[B-Z]$/.test(accountId)) return [];
    return this.latest.filter(event => event.accountId === accountId).map(event => ({...event}));
  }
  clearAccount(accountId: string): void {
    const remaining=this.latest.filter(event=>event.accountId!==accountId);
    this.latest.length=0;
    this.seen.clear();
    for (const event of remaining) {this.latest.push(event);this.seen.add(event.id);}
  }
}
