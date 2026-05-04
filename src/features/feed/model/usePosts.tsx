import { type InfiniteData, keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { mapPost } from '@/entities/post/model/post.mapper';
import type { TierFilter } from '@/features/filter-tabs/model/types';
import { getPosts } from '@/shared/api/generated/posts/posts';
import { queryKeys } from '@/shared/api/queryKeys';
import type { UIError } from '@/shared/ui/uiErrors';
import type { PostPage } from './types';

export const usePosts = (filter: TierFilter = 'all') => {
  const query = useInfiniteQuery<
    PostPage,
    UIError,
    InfiniteData<PostPage>,
    ReturnType<typeof queryKeys.posts.list>,
    string
  >({
    queryKey: queryKeys.posts.list(filter),
    initialPageParam: '',
    queryFn: async ({ pageParam, queryKey }) => {
      const tier = queryKey[2] === 'all' ? undefined : (filter as Exclude<TierFilter, 'all'>);

      const response = await getPosts({ cursor: pageParam, tier });

      return {
        ...response,
        posts: response.posts?.map(mapPost) ?? [],
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    placeholderData: keepPreviousData,
    retry: (_, error) => error.type === 'network',
  });

  const retry = () => {
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
