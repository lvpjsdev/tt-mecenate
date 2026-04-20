import { Pressable, Text } from 'react-native';
import { useTheme } from '@/core/theme/ThemeProvider';
import { stylesheet } from './LinkButton.styles';
import type { LinkButtonProps } from './LinkButton.types';

export function LinkButton({ label, disabled, onPress, style, onLayout }: LinkButtonProps) {
  const theme = useTheme();

  const handlePress = () => {
    if (disabled) return;
    onPress?.();
  };

  return (
    <Pressable onPress={handlePress} style={style} onLayout={onLayout}>
      {({ pressed }) => {
        const color = disabled
          ? theme.colors.primary.disabled
          : pressed
            ? theme.colors.primary.hover
            : theme.colors.primary.default;

        return <Text style={[stylesheet.label, { color }]}>{label}</Text>;
      }}
    </Pressable>
  );
}
