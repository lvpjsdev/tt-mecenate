import { mapPost } from '@/entities/post/model/post.mapper';
import { getPosts } from '@/shared/api/generated/posts/posts';

export type PostPage = Awaited<ReturnType<typeof getPosts>> & {
  posts: ReturnType<typeof mapPost>[];
};
