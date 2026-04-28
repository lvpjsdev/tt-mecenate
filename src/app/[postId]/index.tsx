import { SafeAreaView } from 'react-native-safe-area-context';
import { PostDetail } from '@/entities/post/ui/PostDetail/PostDetail';
import { tokens } from '@/shared/styles/tokens';

export default function PostScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tokens.palette.neutral[0] }}>
      <PostDetail />
    </SafeAreaView>
  );
}
