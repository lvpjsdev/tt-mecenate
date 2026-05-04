import type { Comment } from '@/entities/comment/model/types';
import type { CommentDTO } from '@/shared/api/generated/mecenateTestAPI.schemas';

export const mapComment = (dto: CommentDTO): Comment => ({
  id: dto.id!,
  authorName: dto.author?.displayName || dto.author?.username || '',
  avatarUrl: dto.author?.avatarUrl,
  text: dto.text ?? '',
  postId: dto.postId!,
});
