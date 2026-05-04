import { makeAutoObservable } from 'mobx';
import type { TierFilter } from '@/features/filter-tabs/model/types';

const VALID_FILTERS: TierFilter[] = ['all', 'free', 'paid'];

class FiltersStore {
  activeFilter: TierFilter = 'all';

  constructor() {
    makeAutoObservable(
      this,
      { setActiveFilter: true }, // явный action
      { autoBind: true },
    );
  }

  setActiveFilter(filter: TierFilter): void {
    if (!VALID_FILTERS.includes(filter)) {
      console.warn(`[FiltersStore] Invalid filter value: "${filter}"`);
      return;
    }
    this.activeFilter = filter;
  }
}

export const filtersStore = new FiltersStore();
