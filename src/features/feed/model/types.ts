import type { Post } from '@/entities/post/model/types';
import type { PostsResponseDTOData } from '@/shared/api/generated/mecenateTestAPI.schemas';

export type PostPage = Omit<PostsResponseDTOData, 'posts'> & {
  posts: Post[];
};
