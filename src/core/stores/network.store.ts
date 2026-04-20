import NetInfo from '@react-native-community/netinfo';
import { makeAutoObservable } from 'mobx';

class NetworkStore {
  isOnline = true;
  unsubscribe?: () => void;

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  init() {
    this.unsubscribe = NetInfo.addEventListener((state) => {
      //смотрим и не только на коннект но и доступность интернета
      const isOnline = Boolean(state.isConnected && state.isInternetReachable);

      this.setOnline(isOnline);
    });
  }

  setOnline(online: boolean) {
    this.isOnline = online;
  }

  //Не думаю что понадобиться, но лучше сохранить симетричность
  destroy() {
    this.unsubscribe?.();
  }
}

export const networkStore = new NetworkStore();
