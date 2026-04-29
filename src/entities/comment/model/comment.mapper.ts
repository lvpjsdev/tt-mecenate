import type { Comment } from '@/entities/comment/model/types';
// Ругается на другой способ импорта, так как импортируются типы - не принципиально
import type * as API from '@/shared/api/generated/mecenateTestAPI.schemas';

export const mapComment = (dto: API.CommentDTO): Comment => ({
  id: dto.id!,
  authorName: dto.author?.displayName || dto.author?.username || '',
  avatarUrl: dto.author?.avatarUrl,
  text: dto.text ?? '',
  postId: dto.postId!,
});
