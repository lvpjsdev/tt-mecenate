import { StyleSheet, View } from 'react-native';
import { EmptyState } from '@/shared/ui';
import { getUIErrorMessage, type UIError } from '@/shared/ui/uiErrors';

interface FeedErrorProps {
  error: UIError;
  onRetry: () => void;
}

export function FeedError({ error, onRetry }: FeedErrorProps) {
  return (
    <View style={styles.container}>
      <EmptyState
        title={getUIErrorMessage(error)}
        action={{
          label: 'Повторить',
          onPress: onRetry,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
