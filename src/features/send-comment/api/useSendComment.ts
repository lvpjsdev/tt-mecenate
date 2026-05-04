import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'burnt';
import { postPostsIdComments } from '@/shared/api/generated/comments/comments';
import { PostPostsIdCommentsBody } from '@/shared/api/generated/comments/comments.zod';
import { queryKeys } from '@/shared/api/queryKeys';
import type { UIError } from '@/shared/ui/uiErrors';

export const useSendComment = (postId: string) => {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.comments.byPost(postId);

  return useMutation({
    mutationFn: (text: string) => {
      const body = PostPostsIdCommentsBody.parse({ text });
      return postPostsIdComments(postId, body);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    onError: (error: UIError) => {
      toast({
        title: 'Не удалось отправить комментарий',
        message: error.uiText,
        preset: 'error',
        duration: 3,
      });
    },
  });
};
