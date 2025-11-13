import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { AuthProvider } from "../components/context/AuthContext";

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: true, 
          headerStyle: {
            backgroundColor: '#0047ab', 
          },
          headerTintColor: '#fff', 
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </AuthProvider>
  );
}
