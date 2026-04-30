import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postPostsIdComments } from '@/shared/api/generated/comments/comments';

export const useSendComment = (postId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ['comments', postId];

  return useMutation({
    mutationFn: (text: string) => postPostsIdComments(postId, { text }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });
};
