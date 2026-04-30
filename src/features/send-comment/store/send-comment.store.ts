import { makeAutoObservable } from 'mobx';

class SendCommentStore {
  commentText: string = '';
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setCommentText = (text: string): void => {
    this.commentText = text;
  };

  setIsLoading = (loading: boolean): void => {
    this.isLoading = loading;
  };

  reset = (): void => {
    this.commentText = '';
    this.isLoading = false;
  };
}

export const sendCommentStore = new SendCommentStore();
