import 'reflect-metadata';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { useColorScheme } from '@/components/useColorScheme';
import { DatabaseConnectionProvider } from '@/database/DatabaseConnection';
import React from 'react';
import Logo from '@/components/Logo';
import { AppRegistry, LogBox } from 'react-native';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  LogBox.ignoreAllLogs();

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <DatabaseConnectionProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: '#547260' },
            headerTitle: '',
            headerRight: () => (
              <Logo
                style={{
                  height: '250%',
                  width: '100%',
                  backgroundColor: 'transparent',
                }}
                imageStyle={{
                  height: '90%',
                  width: '100%',
                  top: 0,
                  left: '45%',
                  resizeMode: 'contain',
                  paddingVertical: 10,
                }}
              />
            ),
          }}>
          <Stack.Screen name="(tabs)" options={{}} />
          <Stack.Screen name="description-screen" options={{}} />
          <Stack.Screen name="camera" options={{}} />
          <Stack.Screen name="user-register" options={{}} />
          <Stack.Screen name="login" options={{}} />
          <Stack.Screen name="modal" options={{ presentation: 'containedTransparentModal' }} />
        </Stack>
      </ThemeProvider>
    </DatabaseConnectionProvider>
  );
}
