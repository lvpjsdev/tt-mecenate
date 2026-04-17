import { useInfiniteQuery } from '@tanstack/react-query';
import { GetPostsTier } from '@/shared/api/generated/mecenateTestAPI.schemas';
import { getPosts } from '@/shared/api/generated/posts/posts';
import { selectPostsInfinite } from './select';
import { FeedFilter } from './types';

export const usePosts = () => {
  return useInfiniteQuery({
    queryKey: ['posts'],
    initialPageParam: '',
    queryFn: ({ pageParam }) => getPosts({ cursor: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    select: selectPostsInfinite,
  });
};
