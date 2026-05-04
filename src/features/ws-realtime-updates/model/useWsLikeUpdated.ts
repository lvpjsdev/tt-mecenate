import { type InfiniteData, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import type { Post } from '@/entities/post/model/types';
import type { PostPage } from '@/features/feed/model/types';
import { type WSEvent, wsManager } from '@/shared/api/ws-manager';

export const useWsLikeUpdated = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handler = (event: WSEvent) => {
      if (event.type !== 'like_updated') return;
      const { postId, likesCount } = event;

      // Обновляем кэш для детальной страницы поста
      queryClient.setQueryData<Post>(['posts', 'detail', postId], (old) =>
        old ? { ...old, likes: likesCount } : old,
      );

      // Обновляем кэш для ленты постов (все страницы и фильтры)
      queryClient.setQueriesData<InfiniteData<PostPage>>({ queryKey: ['posts', 'list'] }, (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            posts: page.posts.map((post) =>
              post.id === postId ? { ...post, likes: likesCount } : post,
            ),
          })),
        };
      });
    };

    wsManager.on('like_updated', handler);

    return () => {
      wsManager.off('like_updated', handler);
    };
  }, [queryClient]);
};
