import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feed } from '@/features/feed/ui/Feed';
import { FilterTabs } from '@/features/filter-tabs/ui/FilterTabs';
import { stylesheet } from './index.styles';

export default function HomeScreen() {
  return (
    <SafeAreaView style={stylesheet.safeArea}>
      <View style={stylesheet.filterWrapper}>
        <FilterTabs />
      </View>
      <Feed />
    </SafeAreaView>
  );
}
