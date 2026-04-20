import { SafeAreaView } from 'react-native-safe-area-context';
import { FeedScreen } from '@/features/feed/ui/Feed';
import { tokens } from '@/shared/styles/tokens';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tokens.palette.neutral[0] }}>
      <FeedScreen />
    </SafeAreaView>
  );
}
