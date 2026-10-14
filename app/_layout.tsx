import { Stack } from 'expo-router';
import { AccountProvider } from '../src/mobile/AccountProvider';
export default function Layout() {
  return <AccountProvider>
    <Stack screenOptions={{ headerStyle:{backgroundColor:'#f7f9fc'},headerTintColor:'#16283c' }}/>
  </AccountProvider>;
}
