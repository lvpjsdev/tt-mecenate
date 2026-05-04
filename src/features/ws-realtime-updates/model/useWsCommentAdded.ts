import { type InfiniteData, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { mapComment } from '@/entities/comment/model/comment.mapper';
import type { Comment } from '@/entities/comment/model/types';
import type { Post } from '@/entities/post/model/types';
import type { PostPage } from '@/features/feed/model/types';
import type {
  CommentDTO,
  CommentsResponseDTOData,
} from '@/shared/api/generated/mecenateTestAPI.schemas';
import { type WSEvent, wsManager } from '@/shared/api/ws-manager';

export type CommentsPage = CommentsResponseDTOData & { comments: Comment[] };

export const useWsCommentAdded = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handler = (event: WSEvent) => {
      if (event.type !== 'comment_added') return;
      const { postId, comment } = event;
      const mappedComment = mapComment(comment);

      // Обновляем кэш для списка комментариев (prepend с проверкой дубликатов)
      queryClient.setQueryData<InfiniteData<CommentsPage>>(['comments', postId], (old) => {
        if (!old) return old;
        const firstPage = old.pages[0];
        const alreadyExists = firstPage.comments.some((c) => c.id === mappedComment.id);
        if (alreadyExists) return old;
        return {
          ...old,
          pages: [
            { ...firstPage, comments: [mappedComment, ...firstPage.comments] },
            ...old.pages.slice(1),
          ],
        };
      });

      // Обновляем кэш для детальной страницы поста (инкремент счетчика комментариев)
      queryClient.setQueryData<Post>(['posts', 'detail', postId], (old) =>
        old ? { ...old, comments: old.comments + 1 } : old,
      );

      // Обновляем кэш для ленты постов (инкремент счетчика комментариев на всех страницах)
      queryClient.setQueriesData<InfiniteData<PostPage>>({ queryKey: ['posts', 'list'] }, (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            posts: page.posts.map((post) =>
              post.id === postId ? { ...post, comments: post.comments + 1 } : post,
            ),
          })),
        };
      });
    };

    wsManager.on('comment_added', handler);

    return () => {
      wsManager.off('comment_added', handler);
    };
  }, [queryClient]);
};
