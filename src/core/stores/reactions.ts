import { onlineManager } from '@tanstack/react-query';
import { reaction } from 'mobx';
import { networkStore } from './network.store';

export const setupReactions = () => {
  return reaction(
    () => networkStore.isOnline,
    (isOnline) => {
      onlineManager.setOnline(isOnline);
    },
    { fireImmediately: true },
  );
};
