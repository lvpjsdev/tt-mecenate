// TODO: При выпуске финального релиза заменить на экспорт шрифтов через Expo Config Plugin

import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { SpaceMono_400Regular, useFonts } from '@expo-google-fonts/dev';
import NetInfo from '@react-native-community/netinfo';
import {
  focusManager,
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { AppState, type AppStateStatus } from 'react-native';

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(state.isConnected ?? true);
  });
});

const onChangeAppState = (appStatus: AppStateStatus) =>
  focusManager.setFocused(appStatus === 'active');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 3,
    },
  },
});

export default function RootLayout() {
  useReactQueryDevTools(queryClient);

  const [loaded] = useFonts({
    SpaceMono_400Regular,
  });

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onChangeAppState);
    return () => subscription?.remove();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </QueryClientProvider>
  );
}
