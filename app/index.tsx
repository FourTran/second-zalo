import { Link } from 'expo-router';
import { View, Text, StyleSheet, Pressable } from 'react-native';
export default function Home() {
  return <View style={s.page}>
    <Text style={s.title}>Zalo Hub Lab</Text>
    <Text style={s.note}>iOS + Android prototype. Official Zalo application is completely out of scope.</Text>
    <Link href="/account-b" asChild><Pressable style={s.panel}><Text style={s.heading}>Account B feasibility test →</Text><Text>Load the official Zalo Web page in a dedicated WebView.</Text><Text style={s.note}>Browser authentication may be blocked; isolation is unverified.</Text></Pressable></Link>
    <Link href="/alerts" asChild><Pressable style={s.panel}><Text style={s.heading}>Synthetic alerts →</Text><Text>Demonstration events only; no live Zalo data.</Text></Pressable></Link>
    <Text style={s.warning}>No real messaging API, interception, background notification bridge, or automatic replies.</Text>
  </View>;
}
const s=StyleSheet.create({page:{flex:1,padding:20,gap:14,backgroundColor:'#f7f9fc'},title:{fontSize:26,fontWeight:'700'},heading:{fontSize:18,fontWeight:'700',marginBottom:8},panel:{padding:18,backgroundColor:'white',borderRadius:12,gap:4},note:{color:'#536275'},warning:{color:'#8b3b1a',marginTop:12}});
