import { Link, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDemoAccounts } from '../../src/mobile/AccountProvider';
import { manualChatEligibility, validCompanionAccountRoute } from '../../src/messaging/manualChatGate';
import { Platform } from 'react-native';

export default function AccountDetail() {
  const {accountId:rawId}=useLocalSearchParams<{accountId: string}>();
  const accountId=typeof rawId==='string' ? rawId : '';
  const {accounts,loading}=useDemoAccounts();
  const account=validCompanionAccountRoute(accountId) ? accounts.find(a=>a.id===accountId) : undefined;

  // The supported-client adapter / authenticated viewer is intentionally NOT registered.
  const access=manualChatEligibility({
    account, platform:Platform.OS==='android'?'android':'ios',
    feasibility:undefined, supportedViewerRegistered:false,
  });

  if(loading) return <View style={s.page}><Text>Loading demo account information…</Text></View>;
  return <ScrollView contentContainerStyle={s.page}>
    {!account ?
      <Text style={s.warning}>Unknown Zalo Hub account. No native Zalo interaction was attempted.</Text> :
      <>
        <Text style={s.title}>Account {account.label}</Text>
        <Text style={s.warning}>Synthetic account record — no personal Zalo sign-in</Text>
        <View style={s.card}><Text style={s.heading}>Session status</Text><Text>{account.state}</Text></View>
        <View style={s.card}>
          <Text style={s.heading}>Manual messaging</Text>
          <Text style={s.warning}>Unavailable ({access}).</Text>
          <Text style={s.note}>Read, reply, chat history, conversation deep links and attachments require a normal supported Zalo client and verified independent session storage. This app does not implement any personal Zalo messaging API.</Text>
        </View>
        {account.label==='B' ?
          <Link href="/account-b" style={s.link}>Open the separate official web-client diagnostic (no authenticated account)</Link> :
          <Text style={s.note}>Independent WebView profile for this account has not been validated.</Text>}
      </>
    }
    <Link href="/" style={s.link}>← Back to Zalo Hub</Link>
  </ScrollView>;
}
const s=StyleSheet.create({
  page:{flexGrow:1,padding:20,gap:16,backgroundColor:'#f7f9fc'},
  title:{fontSize:24,fontWeight:'700'},heading:{fontSize:18,fontWeight:'700'},
  warning:{color:'#a34a19'},note:{color:'#526176'},
  card:{backgroundColor:'white',padding:18,borderRadius:12,gap:7},
  link:{fontWeight:'600',color:'#2459c6'},
});
