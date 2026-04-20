import { StyleSheet, View } from 'react-native';
import { EmptyState } from '@/shared/ui';

interface FeedEmptyProps {
  onReset: () => void;
}

export function FeedEmpty({ onReset }: FeedEmptyProps) {
  return (
    <View style={styles.container}>
      <EmptyState
        title="По вашему запросу ничего нет"
        action={{
          label: 'На главную',
          onPress: onReset,
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
