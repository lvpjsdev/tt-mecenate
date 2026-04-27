import { observer } from 'mobx-react-lite';
import { filtersStore } from '@/core/stores/filters.store';
import { TierFilter } from '../model/types';
import { Tab, TabBar } from './TabBar';

const tabs: Tab<TierFilter>[] = [
  { key: 'all', label: 'Все' },
  { key: 'free', label: 'Бесплатные' },
  { key: 'paid', label: 'Платные' },
];

function FilterTabsComponent() {
  const handleTabChange = (key: TierFilter) => {
    filtersStore.setActiveFilter(key);
  };

  return (
    <TabBar tabs={tabs} selectedKey={filtersStore.activeFilter} onTabChange={handleTabChange} />
  );
}

export const FilterTabs = observer(FilterTabsComponent);
