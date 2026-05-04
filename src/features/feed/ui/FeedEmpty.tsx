import { View } from 'react-native';
import { EmptyState } from '@/shared/ui';
import { stylesheet } from './FeedEmpty.styles';

interface FeedEmptyProps {
  onReset: () => void;
}

export function FeedEmpty({ onReset }: FeedEmptyProps) {
  return (
    <View style={stylesheet.container}>
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
