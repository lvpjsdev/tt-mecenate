import { useInfiniteQuery } from '@tanstack/react-query';
import { mapPost } from '@/entities/post/model/apiMapper';
import { getPosts } from '@/shared/api/generated/posts/posts';

export const usePosts = () => {
  return useInfiniteQuery({
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
};
