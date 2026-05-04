import NetInfo from '@react-native-community/netinfo';
import { makeAutoObservable } from 'mobx';

class NetworkStore {
  isOnline = true;
  unsubscribe?: () => void;

  constructor() {
    makeAutoObservable(
      this,
      {
        setOnline: true,
        init: false,
        destroy: false,
      },
      { autoBind: true },
    );
    this.init();
  }

  init() {
    this.unsubscribe = NetInfo.addEventListener((state) => {
      // Смотрим не только на коннект, но и на доступность интернета
      const isOnline = Boolean(state.isConnected && state.isInternetReachable);
      this.setOnline(isOnline);
    });
  }

  setOnline(online: boolean): void {
    if (typeof online !== 'boolean') {
      console.warn(`[NetworkStore] setOnline expects boolean, got: ${typeof online}`);
      return;
    }
    this.isOnline = online;
  }

  // Не думаю что понадобится, но лучше сохранить симметричность
  destroy(): void {
    this.unsubscribe?.();
  }
}

export const networkStore = new NetworkStore();
