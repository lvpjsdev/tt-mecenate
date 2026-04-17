import { useInfiniteQuery } from '@tanstack/react-query';
import { getPosts } from '@/shared/api/generated/posts/posts';

export const usePosts = () => {
  return useInfiniteQuery({
    queryKey: ['posts'],
    initialPageParam: '',
    queryFn: ({ pageParam }) => getPosts({ cursor: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000) + Math.random() * 300,
  });
};
