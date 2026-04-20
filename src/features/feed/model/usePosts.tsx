import { InfiniteData, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { networkStore } from '@/core/stores/network.store';
import { mapPost } from '@/entities/post/model/post.mapper';
import { getPosts } from '@/shared/api/generated/posts/posts';
import { type UIError } from '@/shared/ui/uiErrors';
import { type PostPage } from './types';

export const usePosts = () => {
  const queryClient = useQueryClient();
  const query = useInfiniteQuery<PostPage, UIError, InfiniteData<PostPage>, string[], string>({
    queryKey: ['posts'],
    initialPageParam: '',
    queryFn: async ({ pageParam }) => {
      const response = await getPosts({ cursor: pageParam });

      return {
        ...response,
        posts: response.posts?.map(mapPost) ?? [],
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  const retry = () => {
    if (!networkStore.isOnline) return;

    query.refetch();
  };

  const fetchNext = () => {
    const canFetch = query.hasNextPage && !query.isFetchingNextPage && networkStore.isOnline;

    if (canFetch) query.fetchNextPage();
  };

  const refresh = useCallback(() => {
    queryClient.cancelQueries({ queryKey: ['posts'] });
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  }, [queryClient]);

  return {
    query,
    retry,
    fetchNext,
    refresh,
  };
};
