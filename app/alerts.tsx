import {useRef,useState} from 'react';
import {Link} from 'expo-router';
import {Pressable,ScrollView,StyleSheet,Text,View} from 'react-native';
import {SyntheticInbox,type SyntheticInboxItem} from '../src/notifications/syntheticInbox';

export default function Alerts() {
  const inbox=useRef(new SyntheticInbox()).current;
  const [items,setItems]=useState<SyntheticInboxItem[]>([]);
  const counter=useRef(0);
  const add=(accountId:'hub-B'|'hub-C')=>{
    counter.current+=1;
    inbox.add({id:`demo_event_${counter.current.toString().padStart(8,'0')}`,
      source:'synthetic-test',type:'synthetic_message',accountId,occurredAt:Date.now()});
    setItems(inbox.list());
  };
  const view=(id:string)=>{inbox.markViewed(id);setItems(inbox.list());};
  return <ScrollView contentContainerStyle={s.page}>
    <Text style={s.title}>Synthetic notifications</Text>
    <Text style={s.warning}>DEMO ONLY — not incoming Zalo messages. No APNs, FCM, webhook or background delivery is connected.</Text>
    <Pressable style={s.button} accessibilityRole="button" onPress={()=>add('hub-B')}><Text>Simulate B alert</Text></Pressable>
    <Pressable style={s.button} accessibilityRole="button" onPress={()=>add('hub-C')}><Text>Simulate C alert</Text></Pressable>
    {items.map(item=><View key={item.id} style={s.card}>
      <Text style={s.titleSmall}>{item.accountId.replace('hub-','Account ')} — synthetic event</Text>
      <Text>{item.viewed?'Viewed in this demo':'Not viewed in this demo'}</Text>
      <Link href={{pathname:'/accounts/[accountId]',params:{accountId:item.accountId}}} asChild>
        <Pressable accessibilityRole="button" onPress={()=>view(item.id)}><Text style={s.link}>Open demo account →</Text></Pressable>
      </Link>
    </View>)}
  </ScrollView>;
}
const s=StyleSheet.create({
 page:{padding:20,gap:12,backgroundColor:'#f7f9fc',flexGrow:1},
 title:{fontSize:22,fontWeight:'700'},warning:{color:'#a34a19'},
 button:{backgroundColor:'#dbeafe',padding:16,borderRadius:10},
 card:{backgroundColor:'white',padding:15,gap:6,borderRadius:10},
 titleSmall:{fontWeight:'700'},link:{color:'#2459c6',fontWeight:'700'}
});
