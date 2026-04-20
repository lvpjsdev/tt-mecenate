import { SafeAreaView } from 'react-native-safe-area-context';
import PostsScreen from '@/features/feed/ui/Feed';
import { tokens } from '@/shared/styles/tokens';

export default function FeedScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tokens.palette.neutral[0] }}>
      <PostsScreen />
    </SafeAreaView>
  );
}
