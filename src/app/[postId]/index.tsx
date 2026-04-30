import { SafeAreaView } from 'react-native-safe-area-context';
import { PostWithComments } from '@/features/post-with-comments/ui/PostWithComments';
import { tokens } from '@/shared/styles/tokens';

export default function PostScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tokens.palette.neutral[0] }}>
      <PostWithComments />
    </SafeAreaView>
  );
}
