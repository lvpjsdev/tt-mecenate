import { StyleSheet, View } from 'react-native';
import { PostCardSkeleton } from '@/entities/post/ui/PostCard';
import { tokens } from '@/shared/styles/tokens';

const SKELETON_COUNT = 5;

export function FeedSkeleton() {
  return (
    <View style={styles.container}>
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.palette.neutral[0],
  },
});
