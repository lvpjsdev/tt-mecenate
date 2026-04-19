// TODO: При выпуске финального релиза заменить на экспорт шрифтов через Expo Config Plugin
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  useFonts,
} from '@expo-google-fonts/dev';
import NetInfo from '@react-native-community/netinfo';
import {
  focusManager,
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { AppState, type AppStateStatus, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@/core/theme/ThemeProvider';
import { Button, Text } from '@/shared/ui';

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
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000) + Math.random() * 300,
    },
    mutations: {
      retry: 1,
    },
  },
});

export default function RootLayout() {
  useReactQueryDevTools(queryClient);

  const [loaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onChangeAppState);
    return () => subscription?.remove();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary }) => {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text variant="label">Something went wrong</Text>
            <Button label="Retry" onPress={resetErrorBoundary} />
          </View>
        );
      }}
    >
      <SafeAreaProvider>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <Stack screenOptions={{ headerShown: false }} />
          </QueryClientProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
