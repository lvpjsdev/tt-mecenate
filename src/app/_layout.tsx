import { useReactQueryDevTools } from '@dev-plugins/react-query';
import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  useFonts,
} from '@expo-google-fonts/manrope';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { setupReactions } from '@/core/stores/reactions';
import { ThemeProvider } from '@/core/theme/ThemeProvider';
import { getRetryDelay } from '@/core/utils';
import { useWsCommentAdded, useWsLikeUpdated } from '@/features/ws-realtime-updates';
import { wsManager } from '@/shared/api/ws-manager';
import { EmptyState } from '@/shared/ui/EmptyState';

function AppProviders() {
  useWsLikeUpdated();
  useWsCommentAdded();
  return null;
}

const QUERY_STALE_TIME_MS = 1000 * 60 * 5;
const QUERY_RETRY_COUNT = 3;
const MUTATION_RETRY_COUNT = 1;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME_MS,
      retry: QUERY_RETRY_COUNT,
      retryDelay: getRetryDelay,
    },
    mutations: {
      retry: MUTATION_RETRY_COUNT,
    },
  },
});

export default function RootLayout() {
  const [loaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });
  useReactQueryDevTools(queryClient);
  useEffect(() => setupReactions(), []);
  useEffect(() => {
    wsManager.connect();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary }) => (
        <EmptyState
          title="Something went wrong"
          description="An unexpected error occurred. Please try again."
          action={{ label: 'Retry', onPress: resetErrorBoundary }}
        />
      )}
    >
      <SafeAreaProvider>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <AppProviders />
            <KeyboardProvider>
              <Stack screenOptions={{ headerShown: false, gestureEnabled: true }} />
            </KeyboardProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
