import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { AccountManager, type AccountView } from '../sessions/accountManager';

interface AccountsContextValue {
  accounts: AccountView[];
  loading: boolean;
  error: string | null;
  addNextDemoAccount(): Promise<void>;
  removeAccount(id: string): Promise<void>;
}
const AccountContext = createContext<AccountsContextValue | null>(null);

export function AccountProvider({children}: {children: React.ReactNode}) {
  const [manager] = useState(() => new AccountManager(Platform.OS === 'android' ? 'android' : 'ios'));
  const [accounts, setAccounts] = useState<AccountView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    void (async () => {
      try {
        await manager.initialize();
        // Local demo labels only. No credentials, session persistence or live Zalo auth.
        for (const label of ['B','C']) {
          if (!manager.get(`hub-${label}`)) await manager.add(label);
        }
        if (alive) setAccounts(manager.list());
      } catch {
        if (alive) setError('Unable to create synthetic account registry');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [manager]);

  async function addNextDemoAccount() {
    if (loading) return;
    try {
      const label='BCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').find(x => !accounts.some(a => a.label === x));
      if (!label) throw new Error('No more demo labels');
      await manager.add(label);
      setAccounts(manager.list());
      setError(null);
    } catch { setError('Could not add demo account'); }
  }
  async function removeAccount(id: string) {
    if (loading) return;
    try {
      await manager.remove(id);
      setAccounts(manager.list());
      setError(null);
    } catch { setError('Could not remove demo account'); }
  }
  return <AccountContext.Provider value={{accounts,loading,error,addNextDemoAccount,removeAccount}}>
    {children}
  </AccountContext.Provider>;
}

export function useDemoAccounts(): AccountsContextValue {
  const value=useContext(AccountContext);
  if (!value) throw new Error('useDemoAccounts must be used inside AccountProvider');
  return value;
}
