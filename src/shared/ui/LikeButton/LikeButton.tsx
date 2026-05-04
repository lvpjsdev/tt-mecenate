import { Ionicons } from '@expo/vector-icons';
import { ImpactFeedbackStyle, impactAsync } from 'expo-haptics';
import { useEffect, useRef } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
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

  const scale = useSharedValue(1);
  const prevCount = useRef(count);

  useEffect(() => {
    if (prevCount.current !== count) {
      scale.value = withSequence(
        withSpring(1.3, { damping: 4, stiffness: 300 }),
        withSpring(1, { damping: 4, stiffness: 300 }),
      );
    }
    prevCount.current = count;
  }, [count, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = async () => {
    if (disabled) return;
    await impactAsync(ImpactFeedbackStyle.Light);
    onPress?.();
  };

  return (
    <Pressable onPress={handlePress} testID={testID}>
      <View style={stylesheet.row}>
        <Ionicons name={iconName} size={16} color={color} />
        <Animated.View style={animatedStyle}>
          <Text variant="symbol" color={color}>
            {String(count)}
          </Text>
        </Animated.View>
      </View>
    </Pressable>
  );
}
