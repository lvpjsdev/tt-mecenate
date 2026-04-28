import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { tokens } from '@/shared/styles/tokens';

interface SkeletonBoxProps {
  width: number | `${number}%`;
  height: number;
  borderRadius?: number;
  style?: object;
}

export function SkeletonBox({
  width,
  height,
  borderRadius = tokens.borderRadius['2xl'],
  style,
}: SkeletonBoxProps) {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 900,
          useNativeDriver: false,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 900,
          useNativeDriver: false,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [shimmer]);

  const backgroundColor = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [tokens.palette.skeleton.base, tokens.palette.skeleton.highlight],
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor,
          overflow: 'hidden',
        },
        style,
      ]}
    />
  );
}
