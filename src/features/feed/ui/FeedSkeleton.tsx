import { View } from 'react-native';
import { PostCardSkeleton } from '@/entities/post/ui/PostCard';
import { stylesheet } from './FeedSkeleton.styles';

const SKELETON_COUNT = 5;

export function FeedSkeleton() {
  return (
    <View style={stylesheet.container}>
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </View>
  );
}
