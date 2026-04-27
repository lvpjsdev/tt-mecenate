import { makeAutoObservable } from 'mobx';
import { TierFilter } from '@/features/filter-tabs/model/types';

class FiltersStore {
  activeFilter: TierFilter = 'all';

  constructor() {
    makeAutoObservable(this);
  }

  setActiveFilter = (filter: TierFilter) => {
    this.activeFilter = filter;
  };
}

export const filtersStore = new FiltersStore();
