import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Pressable, View } from 'react-native';
import { theme } from '../../styles/theme';
import { Text } from '../Text';
import { stylesheet } from './ActionButton.styles';
import type { ActionButtonProps } from './ActionButton.types';

export function ActionButton({ type, count, active, disabled, onPress }: ActionButtonProps) {
  const iconName: React.ComponentProps<typeof Ionicons>['name'] =
    type === 'like' ? (active ? 'heart' : 'heart-outline') : 'chatbubble-outline';

  let backgroundColor: string;
  let contentColor: string;

  if (disabled) {
    backgroundColor = theme.colors.background.disabled;
    contentColor = theme.colors.text.disabled;
  } else if (active && type === 'like') {
    backgroundColor = theme.colors.secondary.default;
    contentColor = theme.colors.secondary.light;
  } else if (active && type === 'comment') {
    backgroundColor = theme.colors.primary.default;
    contentColor = theme.colors.text.inverse;
  } else {
    backgroundColor = theme.colors.background.secondary;
    contentColor = theme.colors.text.secondary;
  }

  const handlePress = async () => {
    if (disabled) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  };

  return (
    <Pressable onPress={handlePress} style={[stylesheet.pill, { backgroundColor }]}>
      <View style={stylesheet.row}>
        <Ionicons name={iconName} size={16} color={contentColor} />
        <Text variant="symbol" color={contentColor}>
          {String(count)}
        </Text>
      </View>
    </Pressable>
  );
}

ActionButton.displayName = 'ActionButton';
