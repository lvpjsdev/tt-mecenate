import * as Haptics from 'expo-haptics';
import { Pressable, View } from 'react-native';
import { useTheme } from '@/core/theme/ThemeProvider';
import { ICON_SIZE, Icon } from '../Icon';
import type { IconName } from '../Icon/icons';
import { Text } from '../Text';
import { stylesheet } from './ActionButton.styles';
import type { ActionButtonProps } from './ActionButton.types';

export function ActionButton({ type, count, active, disabled, onPress }: ActionButtonProps) {
  const theme = useTheme();

  const iconName: IconName = type === 'like' ? 'like' : 'comment';

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
        <Icon name={iconName} size={ICON_SIZE.sm} color={contentColor} />
        <Text variant="symbol" color={contentColor}>
          {String(count)}
        </Text>
      </View>
    </Pressable>
  );
}
