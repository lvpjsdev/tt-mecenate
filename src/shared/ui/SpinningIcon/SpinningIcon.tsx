import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Icon } from '../Icon';
import { ICON_SIZE } from '../Icon/icons';

interface SpinningIconProps {
  size?: number;
  color?: string;
}

export function SpinningIcon({ size = ICON_SIZE.md, color = '#000000' }: SpinningIconProps) {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    );
    animation.start();
    return () => animation.stop();
  }, [rotation]);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <Icon name="loader" size={size} color={color} />
    </Animated.View>
  );
}
