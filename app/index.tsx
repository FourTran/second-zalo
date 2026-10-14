import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDemoAccounts } from '../src/mobile/AccountProvider';

export default function Home() {
  const {accounts,loading,error,addNextDemoAccount,removeAccount}=useDemoAccounts();
  return <ScrollView contentContainerStyle={s.page}>
    <Text style={s.title}>Zalo Hub Lab</Text>
    <Text style={s.warning}>DEMO MODE — No Zalo account is signed in. Official native Zalo is untouched.</Text>
    <Text style={s.heading}>Companion accounts (B–Z)</Text>
    {loading ? <Text>Preparing synthetic accounts…</Text> : null}
    {error ? <Text style={s.warning}>{error}</Text> : null}
    {accounts.map(a => <View key={a.id} style={s.card}>
      <View style={s.flex}>
        <Text style={s.heading}>Account {a.label}</Text>
        <Text style={s.note}>Session: {a.state} — NOT a real login</Text>
        <Link href={{pathname:'/accounts/[accountId]',params:{accountId:a.id}}} asChild>
          <Pressable accessibilityRole="button"><Text style={s.link}>Open account details →</Text></Pressable>
        </Link>
      </View>
      <Pressable accessibilityRole="button" accessibilityLabel={`Remove synthetic Account ${a.label}`} onPress={()=>{void removeAccount(a.id);}}>
        <Text style={s.remove}>Remove</Text>
      </Pressable>
    </View>)}
    <Pressable accessibilityRole="button" style={s.card} onPress={()=>{void addNextDemoAccount();}}>
      <Text style={s.heading}>+ Add synthetic account</Text>
    </Pressable>
    <Link href="/account-b" asChild><Pressable style={s.card}><Text style={s.heading}>M2 WebView diagnostic →</Text><Text style={s.note}>Official Zalo site compatibility test only. No login automation.</Text></Pressable></Link>
    <Link href="/alerts" asChild><Pressable style={s.card}><Text style={s.heading}>Synthetic notification examples →</Text></Pressable></Link>
    <Text style={s.warning}>Messaging, attachments and automatic replies remain unavailable until supported Zalo access and independently isolated sessions are proven.</Text>
  </ScrollView>;
}
const s=StyleSheet.create({
  page:{padding:20,gap:14,backgroundColor:'#f7f9fc',flexGrow:1},
  title:{fontSize:26,fontWeight:'700'},
  heading:{fontSize:17,fontWeight:'700'},
  card:{padding:17,backgroundColor:'white',borderRadius:12,flexDirection:'row',gap:12,alignItems:'center'},
  flex:{flex:1,gap:5},
  link:{color:'#2459c6',fontWeight:'600'},
  note:{color:'#536275'},
  warning:{color:'#a34a19'},
  remove:{color:'#bd3232',fontWeight:'600'},
});
