import { makeAutoObservable } from 'mobx';

const MAX_COMMENT_LENGTH = 1000;

class SendCommentStore {
  commentText: string = '';
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(
      this,
      {
        setCommentText: true, // явный action
        setIsLoading: true, // явный action
        reset: true, // явный action
      },
      { autoBind: true },
    );
  }

  setCommentText(text: string): void {
    if (typeof text !== 'string') {
      console.warn('[SendCommentStore] setCommentText expects string');
      return;
    }
    if (text.length > MAX_COMMENT_LENGTH) {
      console.warn(
        `[SendCommentStore] Comment exceeds max length of ${MAX_COMMENT_LENGTH} characters`,
      );
      this.commentText = text.slice(0, MAX_COMMENT_LENGTH);
      return;
    }
    this.commentText = text;
  }

  setIsLoading(loading: boolean): void {
    if (typeof loading !== 'boolean') {
      console.warn('[SendCommentStore] setIsLoading expects boolean');
      return;
    }
    this.isLoading = loading;
  }

  reset(): void {
    this.commentText = '';
    this.isLoading = false;
  }
}

export const sendCommentStore = new SendCommentStore();
