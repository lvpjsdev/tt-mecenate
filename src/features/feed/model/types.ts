import { mapPost } from '@/entities/post/model/post.mapper';
import { type Post } from '@/entities/post/model/types';
import type { PostsResponseDTOData } from '@/shared/api/generated/mecenateTestAPI.schemas';
import { getPosts } from '@/shared/api/generated/posts/posts';

export type PostPage = Omit<PostsResponseDTOData, 'posts'> & {
  posts: Post[];
};
