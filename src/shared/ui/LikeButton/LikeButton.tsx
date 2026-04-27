import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Pressable, View } from 'react-native';
import { lightTheme as theme } from '../../styles/theme';
import { Text } from '../Text';
import { stylesheet } from './LikeButton.styles';
import type { LikeButtonProps } from './LikeButton.types';

export function LikeButton({ count, active, disabled, onPress, testID }: LikeButtonProps) {
  const iconName = active ? 'heart' : 'heart-outline';
  const color = disabled
    ? theme.colors.text.disabled
    : active
      ? theme.colors.secondary.default
      : theme.colors.text.secondary;

  const handlePress = async () => {
    if (disabled) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  };

  return (
    <Pressable onPress={handlePress} testID={testID}>
      <View style={stylesheet.row}>
        <Ionicons name={iconName} size={16} color={color} />
        <Text variant="symbol" color={color}>
          {String(count)}
        </Text>
      </View>
    </Pressable>
  );
}

LikeButton.displayName = 'LikeButton';
