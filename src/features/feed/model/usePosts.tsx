import { InfiniteData, keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { networkStore } from '@/core/stores/network.store';
import { mapPost } from '@/entities/post/model/post.mapper';
import { getPosts } from '@/shared/api/generated/posts/posts';
import { type UIError } from '@/shared/ui/uiErrors';
import { type PostPage } from './types';

export const usePosts = () => {
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
    placeholderData: keepPreviousData,
  });

  const retry = () => {
    if (!networkStore.isOnline) return;

    query.refetch();
  };

  const fetchNext = () => {
    const canFetch = query.hasNextPage && !query.isFetchingNextPage;
    if (canFetch) query.fetchNextPage();
  };

  return {
    query,
    retry,
    fetchNext,
  };
};
