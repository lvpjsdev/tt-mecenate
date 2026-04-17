import { InfiniteData } from '@tanstack/react-query';
import { PostsResponseData } from '@/shared/api/generated/mecenateTestAPI.schemas';

export const selectPostsInfinite = (data: InfiniteData<PostsResponseData>) => {
  const posts = [];
  const seen = new Set();

  for (const page of data.pages) {
    for (const post of page.posts ?? []) {
      if (!seen.has(post.id)) {
        seen.add(post.id);
        posts.push(post);
      }
    }
  }

  return {
    ...data,
    posts,
  };
};
