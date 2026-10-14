import { useState } from 'react';
import { Link } from 'expo-router';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { DemoAccountRegistry } from '../src/core/demoAccountRegistry';

export default function Home() {
  const [registry] = useState(() => new DemoAccountRegistry(['B', 'C']));
  const [accounts, setAccounts] = useState(() => registry.list());
  const refresh = () => setAccounts(registry.list());
  const nextDemoAccount = 'DEFGHIJKLMNOPQRSTUVWXYZ'.split('').find(label => !accounts.some(a => a.label === label));

  return <ScrollView contentContainerStyle={s.page}>
    <Text style={s.title}>Zalo Hub Lab</Text>
    <Text style={s.note}>Independent iOS + Android prototype. The official Zalo app and Account A are never accessed.</Text>
    <Text style={s.heading}>Demo account registry (not logged in)</Text>
    {accounts.map(account => <View key={account.id} style={s.account}>
      <View style={s.accountText}>
        <Text style={s.heading}>Account {account.label}</Text>
        <Text style={s.warning}>Simulation only — no Zalo session</Text>
      </View>
      <Pressable accessibilityRole="button" accessibilityLabel={`Remove demo Account ${account.label}`} onPress={() => { registry.remove(account.id); refresh(); }}>
        <Text style={s.remove}>Remove</Text>
      </Pressable>
    </View>)}
    {nextDemoAccount ? <Pressable style={s.panel} accessibilityRole="button" onPress={() => { registry.add(nextDemoAccount); refresh(); }}>
      <Text style={s.heading}>+ Add demo Account {nextDemoAccount}</Text>
    </Pressable> : null}
    <Link href="/account-b" asChild><Pressable style={s.panel}><Text style={s.heading}>Account B WebView feasibility →</Text><Text style={s.note}>Official Zalo Web may block iOS and Android browsers. Login and session isolation unverified.</Text></Pressable></Link>
    <Link href="/alerts" asChild><Pressable style={s.panel}><Text style={s.heading}>Synthetic alert samples →</Text><Text style={s.note}>No real Zalo messages or push delivery.</Text></Pressable></Link>
    <Text style={s.warning}>No real messaging API, cookie extraction, native Zalo interaction or automatic replies.</Text>
  </ScrollView>;
}
const s = StyleSheet.create({
  page:{padding:20,gap:14,backgroundColor:'#f7f9fc',flexGrow:1},
  title:{fontSize:26,fontWeight:'700'},
  heading:{fontSize:17,fontWeight:'700'},
  panel:{padding:18,backgroundColor:'white',borderRadius:12,gap:5},
  account:{padding:14,backgroundColor:'white',borderRadius:12,flexDirection:'row',alignItems:'center',gap:12},
  accountText:{flex:1,gap:4},
  note:{color:'#536275'},
  warning:{color:'#8b3b1a'},
  remove:{color:'#bd3232',fontWeight:'600'},
});
