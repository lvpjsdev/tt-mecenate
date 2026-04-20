import { useInfiniteQuery } from '@tanstack/react-query';
import { networkStore } from '@/core/stores/network.store';
import { mapPost } from '@/entities/post/model/apiMapper';
import { getPosts } from '@/shared/api/generated/posts/posts';

export const usePosts = () => {
  const query = useInfiniteQuery({
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

  return {
    query,
    retry,
    fetchNext,
  };
};
