import { Pressable } from 'react-native';
import { Icon } from '@/shared/ui/Icon';
import { lightTheme as theme } from '../../styles/theme';
import { stylesheet } from './SendButton.styles';
import type { SendButtonProps } from './SendButton.types';

export function SendButton({ disabled, onPress }: SendButtonProps) {
  return (
    <Pressable
      style={stylesheet.container}
      onPress={() => {
        if (disabled) return;
        onPress?.();
      }}
    >
      {({ pressed }) => {
        const color = disabled
          ? theme.colors.primary.disabled
          : pressed
            ? theme.colors.primary.pressed
            : theme.colors.primary.default;

        return <Icon name="paper-plane" size={20} color={color} />;
      }}
    </Pressable>
  );
}

SendButton.displayName = 'SendButton';
