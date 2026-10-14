/** Synthetic UI registry. Not a Zalo session manager or authenticated login store. */
export type DemoAccount = Readonly<{
  id: string;
  label: string;
  origin: 'synthetic';
  status: 'simulation-only';
}>;

const MAX_DEMO_ACCOUNTS = 16;

export class DemoAccountRegistry {
  private accounts: DemoAccount[] = [];
  private nextId = 1;

  constructor(initialLabels: readonly string[] = []) {
    for (const label of initialLabels) this.add(label);
  }

  list(): DemoAccount[] {
    return this.accounts.map(account => ({ ...account }));
  }

  add(rawLabel: string): DemoAccount {
    const label = rawLabel.trim();
    if (!label || label.length > 40) throw new Error('Account label must contain 1–40 characters');
    if (label.toLocaleLowerCase() === 'a') throw new Error('Account A belongs to native Zalo');
    if (this.accounts.length >= MAX_DEMO_ACCOUNTS) throw new Error('Demo account limit reached');
    if (this.accounts.some(account => account.label.toLocaleLowerCase() === label.toLocaleLowerCase())) {
      throw new Error('Account label already exists');
    }
    const account: DemoAccount = Object.freeze({
      id: `demo-${this.nextId++}`,
      label,
      origin: 'synthetic',
      status: 'simulation-only',
    });
    this.accounts.push(account);
    return { ...account };
  }

  remove(id: string): boolean {
    const index = this.accounts.findIndex(account => account.id === id);
    if (index === -1) return false;
    this.accounts.splice(index, 1);
    return true;
  }
}
