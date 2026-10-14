import { useCallback, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import WebView from 'react-native-webview';
import { classifyWebNavigation } from '../src/feasibility/webNavigationPolicy';

const CLIENT_URL = 'https://chat.zalo.me/';

type ObservedState =
  | 'not-started'
  | 'loading-official-site'
  | 'store-redirect-blocked'
  | 'external-navigation-blocked'
  | 'scheme-blocked'
  | 'load-failed'
  | 'popup-blocked';

export default function AccountBFeasibility() {
  const [started, setStarted] = useState(false);
  const [observed, setObserved] = useState<ObservedState>('not-started');
  const [officialHostname, setOfficialHostname] = useState<string | null>(null);

  const assessNavigation = useCallback((url: string) => {
    const result = classifyWebNavigation(url);
    if (result.kind === 'official-site') {
      setOfficialHostname(result.hostname);
      setObserved('loading-official-site');
    } else if (result.kind === 'store-redirect') {
      setObserved('store-redirect-blocked');
    } else if (result.kind === 'external-site') {
      setObserved('external-navigation-blocked');
    } else {
      setObserved('scheme-blocked');
    }
    return result.allow;
  }, []);

  return <View style={s.page}>
    <View style={s.header}>
      <Text style={s.title}>M2 — Official web-client diagnostic</Text>
      <Text>Platform: {Platform.OS} · Test-only Account B</Text>
      <Text style={s.warning}>Authentication, independent sessions, messaging and notifications are NOT verified.</Text>
      <Text style={s.label}>Observed: {observed}</Text>
      {officialHostname ? <Text style={s.label}>Official host: {officialHostname}</Text> : null}
      <Text style={s.note}>Only official HTTPS zalo.me pages may navigate. App-store redirects, app schemes, and external sites are blocked and recorded as categories. No cookies, tokens, page contents or full URLs are collected.</Text>
    </View>
    {!started ?
      <Pressable style={s.button} accessibilityRole="button" onPress={() => { setStarted(true); setObserved('loading-official-site'); }}>
        <Text style={s.buttonText}>Start web compatibility test</Text>
      </Pressable> :
      <WebView
        source={{ uri: CLIENT_URL }}
        style={s.browser}
        originWhitelist={['https://*']}
        sharedCookiesEnabled={false}
        thirdPartyCookiesEnabled={false}
        incognito={false}
        javaScriptEnabled
        domStorageEnabled
        allowFileAccess={false}
        onShouldStartLoadWithRequest={request => assessNavigation(request.url)}
        onNavigationStateChange={navigation => { assessNavigation(navigation.url); }}
        onOpenWindow={() => setObserved('popup-blocked')}
        onError={() => setObserved('load-failed')}
        onHttpError={() => setObserved('load-failed')}
      />
    }
  </View>;
}
const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#f7f9fc' },
  header: { padding: 14, gap: 6 },
  title: { fontSize: 18, fontWeight: '700' },
  warning: { color: '#a34a19' },
  label: { fontWeight: '600', color: '#243447' },
  note: { fontSize: 12, color: '#536275' },
  button: { margin: 20, padding: 16, backgroundColor: '#2459c6', borderRadius: 9 },
  buttonText: { color: 'white', fontWeight: '600', textAlign: 'center' },
  browser: { flex: 1 },
});
