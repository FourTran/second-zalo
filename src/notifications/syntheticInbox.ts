import type { SyntheticNotice } from '../events/sourceGate';

/** This is deliberately local-only. It never registers, delivers or stores push tokens. */
export type SyntheticInboxItem = Readonly<{id:string;accountId:string;occurredAt:number;viewed:boolean}>;
export type InternalAccountDestination = Readonly<{pathname:'/accounts/[accountId]';params:{accountId:string}}>;

/** Accept only synthetic notice objects with safe in-app account identifiers. */
export function routeSyntheticNotice(input: unknown): InternalAccountDestination | null {
  if (!input || typeof input !== 'object') return null;
  const event=input as Partial<SyntheticNotice>;
  if (event.source!=='synthetic-test' || event.type!=='synthetic_message'
      || typeof event.accountId!=='string' || !/^hub-[B-Z]$/.test(event.accountId)
      || typeof event.id!=='string' || !/^[A-Za-z0-9_-]{8,64}$/.test(event.id)
      || typeof event.occurredAt!=='number' || !Number.isSafeInteger(event.occurredAt)) return null;
  return {pathname:'/accounts/[accountId]',params:{accountId:event.accountId}};
}
export class SyntheticInbox {
  private readonly items: SyntheticInboxItem[]=[];
  constructor(private readonly maxItems=50) {
    if(!Number.isInteger(maxItems)||maxItems<1||maxItems>200)throw new Error('Invalid inbox limit');
  }
  add(input: unknown): boolean {
    const route=routeSyntheticNotice(input);
    if(!route)return false;
    const event=input as SyntheticNotice;
    if(this.items.some(x=>x.id===event.id))return false;
    this.items.unshift({id:event.id,accountId:event.accountId,occurredAt:event.occurredAt,viewed:false});
    if(this.items.length>this.maxItems)this.items.pop();
    return true;
  }
  list(accountId?:string):SyntheticInboxItem[] {
    const arr=accountId?this.items.filter(x=>x.accountId===accountId):this.items;
    return arr.map(x=>({...x}));
  }
  markViewed(id:string):boolean {
    const ix=this.items.findIndex(x=>x.id===id);
    if(ix<0)return false;
    this.items[ix]={...this.items[ix],viewed:true};
    return true;
  }
  clearAccount(accountId:string):void {
    for(let i=this.items.length-1;i>=0;i--) if(this.items[i].accountId===accountId)this.items.splice(i,1);
  }
}
