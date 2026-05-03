import { StyleSheet, View } from 'react-native';
import { EmptyState } from '@/shared/ui';
import { getUIErrorMessage, type UIError } from '@/shared/ui/uiErrors';

interface FeedErrorProps {
  title?: string;
  error: UIError;
  onRetry: () => void;
  isRetrying?: boolean;
}

export function FeedError({ title, error, onRetry, isRetrying }: FeedErrorProps) {
  return (
    // <View style={styles.container}>
    <EmptyState
      title={title || getUIErrorMessage(error)}
      action={{
        label: 'Повторить',
        onPress: onRetry,
        isLoading: isRetrying,
      }}
    />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
