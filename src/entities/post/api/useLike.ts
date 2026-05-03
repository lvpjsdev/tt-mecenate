import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { PostPage } from '@/features/feed/model/types';
import { LikeResponseDTOData } from '@/shared/api/generated/mecenateTestAPI.schemas';
import { postPostsIdLike } from '@/shared/api/generated/posts/posts';
import { Post } from '../model/types';

const togglePostLike = (post: Post): Post => ({
  ...post,
  isLiked: !post.isLiked,
  likes: post.isLiked ? post.likes - 1 : post.likes + 1,
});

const applyLikeResponse = (post: Post, data: LikeResponseDTOData): Post => ({
  ...post,
  isLiked: data.isLiked ?? post.isLiked,
  likes: data.likesCount ?? post.likes,
});

export const useLike = (postId: string) => {
  const queryClient = useQueryClient();

  const detailKey = ['posts', 'detail', postId];
  const listKey = ['posts', 'list'];

  return useMutation({
    mutationFn: () => postPostsIdLike(postId),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: detailKey });
      await queryClient.cancelQueries({ queryKey: listKey });

      const previousDetail = queryClient.getQueryData<Post>(detailKey);
      const previousList = queryClient.getQueriesData<InfiniteData<PostPage>>({
        queryKey: listKey,
      });

      if (previousDetail) {
        queryClient.setQueryData<Post>(detailKey, togglePostLike(previousDetail));
      }

      queryClient.setQueriesData<InfiniteData<PostPage>>({ queryKey: listKey }, (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            posts: page.posts.map((post) => (post.id === postId ? togglePostLike(post) : post)),
          })),
        };
      });

      return { previousDetail, previousList };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousDetail) {
        queryClient.setQueryData(detailKey, context.previousDetail);
      }
      context?.previousList?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSuccess: (data) => {
      queryClient.setQueryData<Post>(detailKey, (old) =>
        old ? applyLikeResponse(old, data) : old,
      );

      const listCache = queryClient.getQueriesData<InfiniteData<PostPage>>({ queryKey: listKey });
      const hasListCache = listCache.some(([, cacheData]) => cacheData !== undefined);

      if (hasListCache) {
        queryClient.setQueriesData<InfiniteData<PostPage>>({ queryKey: listKey }, (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              posts: page.posts.map((post) =>
                post.id === postId ? applyLikeResponse(post, data) : post,
              ),
            })),
          };
        });
      } else {
        queryClient.invalidateQueries({ queryKey: listKey });
      }
    },
  });
};
