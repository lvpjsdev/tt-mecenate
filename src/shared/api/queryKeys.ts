import type { TierFilter } from '@/features/filter-tabs/model/types';

export const queryKeys = {
  posts: {
    all: () => ['posts'] as const,
    lists: () => [...queryKeys.posts.all(), 'list'] as const,
    list: (filter: TierFilter = 'all') => [...queryKeys.posts.lists(), filter] as const,
    details: () => [...queryKeys.posts.all(), 'detail'] as const,
    detail: (postId: string) => [...queryKeys.posts.details(), postId] as const,
  },

  comments: {
    all: () => ['comments'] as const,
    byPost: (postId: string) => [...queryKeys.comments.all(), postId] as const,
  },
} as const;
