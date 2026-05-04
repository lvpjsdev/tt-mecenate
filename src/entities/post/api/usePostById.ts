import { useQuery } from '@tanstack/react-query';
import { getPostsId } from '@/shared/api/generated/posts/posts';
import { queryKeys } from '@/shared/api/queryKeys';
import { ERROR_MESSAGES } from '@/shared/ui/errorDictionary';
import { UIError } from '@/shared/ui/uiErrors';
import { mapPost } from '../model/post.mapper';
import { Post } from '../model/types';

export const usePostById = (postId: string) => {
  return useQuery<Post, UIError, Post, ReturnType<typeof queryKeys.posts.detail>>({
    queryKey: queryKeys.posts.detail(postId),
    queryFn: async ({ queryKey }) => {
      const response = await getPostsId(queryKey[2]);
      if (!response?.post) {
        throw { type: 'unknown', uiText: ERROR_MESSAGES.unknown } satisfies UIError;
      }

      return mapPost(response.post);
    },
  });
};
