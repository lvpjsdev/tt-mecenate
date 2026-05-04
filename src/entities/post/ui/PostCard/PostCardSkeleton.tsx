import type { ReactNode } from 'react';
import { View } from 'react-native';
import { tokens } from '@/shared/styles/tokens';
import { stylesheet } from './PostCardSkeleton.styles';
import { SkeletonBox } from './SkeletonBox';

export function PostCardSkeleton() {
  return (
    <View style={stylesheet.card}>
      <View style={stylesheet.header}>
        <SkeletonBox width={40} height={40} borderRadius={tokens.borderRadius.full} />
        <SkeletonBox width={120} height={20} />
      </View>

      <View style={stylesheet.coverWrapper}>
        <SkeletonBox width={'100%'} height={393} borderRadius={0} />
      </View>

      <PostBodySkeleton />

      <View style={stylesheet.actions}>
        <SkeletonBox width={64} height={36} />
        <SkeletonBox width={64} height={36} />
      </View>
    </View>
  );
}

export function PostBodySkeleton(): ReactNode {
  return (
    <View style={stylesheet.body}>
      <SkeletonBox width={164} height={26} />
      <SkeletonBox width={'100%'} height={40} />
    </View>
  );
}
