import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
type Alert = { id: string; account: 'B'|'C'; time: string };
export default function Alerts() {
 const [items,setItems]=useState<Alert[]>([]);
 const add=(account: 'B'|'C')=>setItems(old=>[{id:String(Date.now())+Math.random(),account,time:new Date().toLocaleTimeString()},...old]);
 return <View style={s.page}>
   <Text style={s.title}>Synthetic alerts only</Text><Text>No Zalo connection or push delivery is enabled.</Text>
   <Pressable style={s.btn} onPress={()=>add('B')}><Text>Simulate Account B alert</Text></Pressable>
   <Pressable style={s.btn} onPress={()=>add('C')}><Text>Simulate Account C alert</Text></Pressable>
   {items.map(x=><View style={s.card} key={x.id}><Text>Fake event — Account {x.account}</Text><Text>{x.time}</Text></View>)}
 </View>;
}
const s=StyleSheet.create({page:{flex:1,padding:20,gap:12,backgroundColor:'#f7f9fc'},title:{fontSize:22,fontWeight:'700'},btn:{backgroundColor:'#d9eaff',padding:16,borderRadius:10},card:{backgroundColor:'white',padding:14,borderRadius:8}});
