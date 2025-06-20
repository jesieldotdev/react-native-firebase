import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { getApp } from '@react-native-firebase/app';
import { FirebaseAuthTypes, getAuth } from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const colorScheme = useColorScheme();
  const router = useRouter();
  const segments = useSegments()

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log('User state changed:', user);
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    // Modo v22 - usando getApp()
    const app = getApp();
    const authInstance = getAuth(app);
    const subscriber = authInstance.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  // Resto do código igual...
  useEffect(() => {
    if (initializing) return
    console.log(segments)
    const isAuthRoute = segments[0] === '(auth)';
    if (user && !isAuthRoute) {
      router.replace('/(auth)/home');
    } else if (!user && isAuthRoute) {
      router.replace('/');
    }
  }, [user, initializing])

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}