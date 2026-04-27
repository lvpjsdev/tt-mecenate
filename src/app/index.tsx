import { SafeAreaView } from 'react-native-safe-area-context';
import { Feed } from '@/features/feed/ui/Feed';
import { FilterTabs } from '@/features/filter-tabs/ui/FilterTabs';
import { tokens } from '@/shared/styles/tokens';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tokens.palette.neutral[0] }}>
      <FilterTabs />
      <Feed />
    </SafeAreaView>
  );
}
