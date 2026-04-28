import { SafeAreaView } from 'react-native-safe-area-context';
import { Post } from '@/entities/post/ui';
import { tokens } from '@/shared/styles/tokens';

export default function PostScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tokens.palette.neutral[0] }}>
      <Post />
    </SafeAreaView>
  );
}
