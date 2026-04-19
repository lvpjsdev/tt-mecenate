import { SafeAreaView } from 'react-native-safe-area-context';
import PostsScreen from '@/features/feed/ui/Feed';

export default function FeedScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <PostsScreen />
    </SafeAreaView>
  );
}
