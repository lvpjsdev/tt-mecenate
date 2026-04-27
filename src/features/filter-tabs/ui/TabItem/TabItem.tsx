import { Pressable } from 'react-native';
import { useTheme } from '@/core/theme/ThemeProvider';
import { Text } from '@/shared/ui/Text';
import { stylesheet } from './TabItem.styles';
import type { TabItemProps } from './TabItem.types';

export function TabItem({ label, active, disabled, onPress, testID }: TabItemProps) {
  const theme = useTheme();

  const backgroundColor = active
    ? disabled
      ? theme.colors.primary.disabled
      : theme.colors.primary.default
    : 'transparent';

  const textColor = active
    ? theme.colors.text.inverse
    : disabled
      ? theme.colors.text.disabled
      : theme.colors.text.secondary;

  const handlePress = () => {
    if (!disabled) {
      onPress?.();
    }
  };

  return (
    <Pressable
      style={[stylesheet.container, { backgroundColor }]}
      onPress={handlePress}
      testID={testID}
    >
      <Text variant="label" color={textColor}>
        {label}
      </Text>
    </Pressable>
  );
}

TabItem.displayName = 'TabItem';
