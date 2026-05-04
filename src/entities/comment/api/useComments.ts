import { useInfiniteQuery } from '@tanstack/react-query';
import { getPostsIdComments } from '@/shared/api/generated/comments/comments';
import { queryKeys } from '@/shared/api/queryKeys';
import { mapComment } from '../model/comment.mapper';

export const useComments = (postId: string) => {
  return useInfiniteQuery({
    queryKey: queryKeys.comments.byPost(postId),
    queryFn: async ({ pageParam, queryKey }) => {
      const response = await getPostsIdComments(queryKey[1], { cursor: pageParam });

      return {
        ...response,
        comments: response.comments?.map(mapComment) || [],
      };
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage?.nextCursor || undefined,
  });
};
