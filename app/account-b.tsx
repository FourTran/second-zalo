import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
const INITIAL_URL = 'https://chat.zalo.me/';
export default function AccountB() {
 const [url,setUrl]=useState(INITIAL_URL);
 const [error,setError]=useState('');
 return <View style={s.page}>
  <Text style={s.note}>Official Zalo Web compatibility test. Only enter credentials if you see the genuine Zalo-owned sign-in page. We do not read or inject them.</Text>
  <Text style={s.url} numberOfLines={2}>{url}</Text>
  {error ? <Text style={s.error}>{error}</Text> : null}
  <WebView source={{uri:INITIAL_URL}} style={{flex:1}} sharedCookiesEnabled={false} thirdPartyCookiesEnabled={false} incognito={false} javaScriptEnabled domStorageEnabled onNavigationStateChange={nav=>setUrl(nav.url)} onError={event=>setError(event.nativeEvent.description)} />
 </View>;
}
const s=StyleSheet.create({page:{flex:1},note:{padding:12,color:'#526176'},url:{paddingHorizontal:12,fontSize:12,color:'#334155'},error:{padding:12,color:'#b91c1c'}});
