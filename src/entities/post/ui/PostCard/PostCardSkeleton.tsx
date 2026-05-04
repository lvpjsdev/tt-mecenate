import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { tokens } from '@/shared/styles/tokens';
import { SkeletonBox } from './SkeletonBox';

export function PostCardSkeleton() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <SkeletonBox width={40} height={40} borderRadius={tokens.borderRadius.full} />
        <SkeletonBox width={120} height={20} />
      </View>

      <View style={styles.coverWrapper}>
        <SkeletonBox width={'100%'} height={393} borderRadius={0} />
      </View>

      <PostBodySkeleton />

      <View style={styles.actions}>
        <SkeletonBox width={64} height={36} />
        <SkeletonBox width={64} height={36} />
      </View>
    </View>
  );
}

export function PostBodySkeleton(): ReactNode {
  return (
    <View style={styles.body}>
      <SkeletonBox width={164} height={26} />
      <SkeletonBox width={'100%'} height={40} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: tokens.palette.neutral[0],
    borderRadius: tokens.borderRadius.lg,
    overflow: 'hidden',
    gap: tokens.spacing.xl,
    paddingBottom: tokens.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.lg,
    paddingHorizontal: tokens.spacing.xl,
    paddingTop: tokens.spacing.lg,
  },
  coverWrapper: {
    width: '100%',
  },
  body: {
    gap: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.xl,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.xl,
  },
});
