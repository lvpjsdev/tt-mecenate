import { useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { useTheme } from '@/core/theme/ThemeProvider';
import { Text } from '@/shared/ui/Text';
import { stylesheet } from './Button.styles';
import type { ButtonProps, ButtonState } from './Button.types';

export function Button({ label, state: externalState = 'default', onPress }: ButtonProps) {
  const theme = useTheme();
  const [pressState, setPressState] = useState<ButtonState>('default');

  const effectiveState: ButtonState =
    externalState === 'disabled' || externalState === 'loading' ? externalState : pressState;

  const handlePressIn = () => {
    if (effectiveState !== 'disabled' && effectiveState !== 'loading') {
      setPressState('pressed');
    }
  };

  const handlePressOut = () => {
    if (effectiveState !== 'disabled' && effectiveState !== 'loading') {
      setPressState('default');
    }
  };

  const handlePress = () => {
    if (effectiveState === 'disabled' || effectiveState === 'loading') return;
    onPress?.();
  };

  const stateKey = effectiveState === 'loading' ? 'default' : effectiveState;
  const backgroundColor =
    theme.states.primary[stateKey]?.background ?? theme.states.primary.default.background;
  const textColor = theme.states.primary[stateKey]?.text ?? theme.states.primary.default.text;

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      testID="button-container"
    >
      <View style={[stylesheet.container, { backgroundColor }]}>
        {effectiveState === 'loading' ? (
          <ActivityIndicator color={textColor} size="small" />
        ) : (
          <Text variant="label" color={textColor}>
            {label}
          </Text>
        )}
      </View>
    </Pressable>
  );
}
