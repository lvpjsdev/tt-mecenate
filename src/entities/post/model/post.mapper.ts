import type { Post } from '@/entities/post/model/types';
// Ругается на другой способ импорта, так как импортируются типы - не принципиально
import type * as API from '@/shared/api/generated/mecenateTestAPI.schemas';

export const mapPost = (dto: API.PostDTO): Post => ({
  id: dto.id!,
  authorName: dto.author?.displayName || dto.author?.username || '',
  avatarUrl: dto.author?.avatarUrl,
  title: dto.title,
  preview: dto.preview ?? dto.body?.slice(0, 140) ?? '',
  body: dto.body ?? '',
  coverUrl: dto.coverUrl,
  likes: dto.likesCount ?? 0,
  comments: dto.commentsCount ?? 0,
  isLiked: dto.isLiked,
  isPaid: dto.tier === 'paid',
  tier: dto.tier ?? 'free',
});
