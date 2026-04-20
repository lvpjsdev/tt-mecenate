import { onlineManager } from '@tanstack/react-query';
import { reaction } from 'mobx';
import { networkStore } from './network.store';

export const setupReactions = () => {
  reaction(
    () => networkStore.isOnline,
    (isOnline) => {
      onlineManager.setOnline(isOnline);
    },
  );
};
