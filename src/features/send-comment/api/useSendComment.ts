import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'burnt';
import { postPostsIdComments } from '@/shared/api/generated/comments/comments';
import { PostPostsIdCommentsBody } from '@/shared/api/generated/comments/comments.zod';

export const useSendComment = (postId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ['comments', postId];

  return useMutation({
    mutationFn: (text: string) => {
      // Валидируем тело запроса перед отправкой
      const body = PostPostsIdCommentsBody.parse({ text });
      return postPostsIdComments(postId, body);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    onError: () => {
      toast({
        title: 'Не удалось отправить комментарий',
        message: 'Попробуйте ещё раз',
        preset: 'error',
        duration: 3,
      });
    },
  });
};
