// TODO: При выпуске финального релиза заменить на экспорт шрифтов через Expo Config Plugin
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  useFonts,
} from '@expo-google-fonts/dev';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { ErrorBoundary } from 'react-error-boundary';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { setupReactions } from '@/core/stores/reactions';
import { ThemeProvider } from '@/core/theme/ThemeProvider';
import { getRetryDelay } from '@/core/utils';
import { EmptyState } from '@/shared/ui/EmptyState';

const QUERY_STALE_TIME_MS = 1000 * 60 * 5; // 5 minutes
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

setupReactions();

export default function RootLayout() {
  useReactQueryDevTools(queryClient);

  const [loaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

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
            <Stack screenOptions={{ headerShown: false }} />
          </QueryClientProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
