import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { theme } from '@/shared/styles/theme';

function SkeletonBox({
  width,
  height,
  borderRadius = theme.borderRadius['2xl'],
  style,
}: {
  width: number | `${number}%`;
  height: number;
  borderRadius?: number;
  style?: object;
}) {
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
    outputRange: [theme.colors.skeleton.base, theme.colors.skeleton.highlight],
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

export function PostCardSkeleton() {
  return (
    <View style={styles.card}>
      {/* Header: аватар + имя */}
      <View style={styles.header}>
        <SkeletonBox width={40} height={40} borderRadius={theme.borderRadius.full} />
        <SkeletonBox width={120} height={20} />
      </View>

      {/* Cover image */}
      <View style={styles.coverWrapper}>
        <SkeletonBox width={'100%'} height={393} borderRadius={0} />
      </View>

      {/* Body: заголовок + строка текста */}
      <View style={styles.body}>
        <SkeletonBox width={164} height={26} />
        <SkeletonBox width={'100%'} height={20} />
      </View>

      {/* Actions: две кнопки */}
      <View style={styles.actions}>
        <SkeletonBox width={64} height={36} />
        <SkeletonBox width={64} height={36} />
      </View>
    </View>
  );
}

PostCardSkeleton.displayName = 'PostCardSkeleton';

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background.default,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    gap: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
  },
  coverWrapper: {
    width: '100%',
  },
  body: {
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
  },
});
