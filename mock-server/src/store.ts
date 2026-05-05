import { v4 as uuidv4 } from 'uuid';

export interface Author {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  subscribersCount: number;
  isVerified: boolean;
}

export interface Post {
  id: string;
  author: Author;
  title: string;
  body: string;
  preview: string;
  coverUrl: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  tier: 'free' | 'paid';
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: Author;
  text: string;
  createdAt: string;
}

export interface LikeState {
  [userId: string]: {
    [postId: string]: boolean;
  };
}

export const authors: Author[] = [
  {
    id: 'author_1',
    username: 'lesha_krid',
    displayName: 'Леша Крид',
    avatarUrl: 'https://s3.regru.cloud/mecenate-test-picture/logo1.webm',
    bio: 'Музыка, визуальное искусство и эксперименты.',
    subscribersCount: 1420,
    isVerified: true,
  },
  {
    id: 'author_2',
    username: 'masha_art',
    displayName: 'Маша Арт',
    avatarUrl: 'https://s3.regru.cloud/mecenate-test-picture/logo2.webm',
    bio: 'Художница и дизайнер. Люблю создавать красоту.',
    subscribersCount: 890,
    isVerified: true,
  },
  {
    id: 'author_3',
    username: 'viktor_dev',
    displayName: 'Виктор Дев',
    avatarUrl: 'https://s3.regru.cloud/mecenate-test-picture/logo3.webm',
    bio: 'Разработчик, тех-блогер, ментор.',
    subscribersCount: 2100,
    isVerified: false,
  },
];

export const posts: Post[] = Array.from({ length: 25 }, (_, i) => {
  const id = i + 1;
  const author = authors[id % authors.length];
  const isPaid = id % 3 === 0;
  const createdAt = new Date(2024, 10, id + 1, 12, 0, 0).toISOString();

  return {
    id: `post_${id}`,
    author,
    title: `Пост номер ${id}`,
    body: isPaid ? '' : `Это полный текст поста номер ${id}. Здесь может быть любой контент: текст, картинки, видео и многое другое.`,
    preview: `Краткий предпросмотр поста номер ${id}. Это сокращенная версия...`.slice(0, 120),
    coverUrl: `https://s3.regru.cloud/mecenate-test-picture/pic${id}.jpeg`,
    likesCount: Math.floor(Math.random() * 500),
    commentsCount: Math.floor(Math.random() * 50),
    isLiked: false,
    tier: isPaid ? 'paid' as const : 'free' as const,
    createdAt,
  };
}).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

export const comments: Comment[] = [];

// Генерируем несколько комментариев для первых постов
for (let i = 1; i <= 5; i++) {
  const postId = `post_${i}`;
  for (let j = 1; j <= 3; j++) {
    const commentId = comments.length + 1;
    comments.push({
      id: `comment_${commentId}`,
      postId,
      author: authors[j % authors.length],
      text: `Это комментарий ${j} к посту ${i}. Очень интересно!`,
      createdAt: new Date(2024, 10, i + 1, 13, j, 0).toISOString(),
    });
  }
  // Обновляем счетчик комментариев в посте
  const post = posts.find((p) => p.id === postId);
  if (post) {
    post.commentsCount = comments.filter((c) => c.postId === postId).length;
  }
}

export const likeState: LikeState = {};

export const wsClients: Set<any> = new Set();

export function validateUUID(token: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(token);
}

export function getPostById(id: string): Post | undefined {
  return posts.find((p) => p.id === id);
}

export function getCommentsByPostId(postId: string, limit = 20, cursor?: string): { comments: Comment[]; nextCursor: string | null; hasMore: boolean } {
  let filtered = comments.filter((c) => c.postId === postId);

  if (cursor) {
    const cursorIndex = filtered.findIndex((c) => c.id === cursor);
    if (cursorIndex >= 0) {
      filtered = filtered.slice(cursorIndex + 1);
    }
  }

  const hasMore = filtered.length > limit;
  const paginated = filtered.slice(0, limit);
  const nextCursor = hasMore ? paginated[paginated.length - 1]?.id || null : null;

  return { comments: paginated, nextCursor, hasMore };
}

export function addComment(postId: string, text: string, authorId = 'author_1'): Comment {
  const author = authors.find((a) => a.id === authorId) || authors[0];
  const newComment: Comment = {
    id: `comment_${comments.length + 1}`,
    postId,
    author,
    text,
    createdAt: new Date().toISOString(),
  };

  comments.push(newComment);

  const post = posts.find((p) => p.id === postId);
  if (post) {
    post.commentsCount++;
  }

  return newComment;
}

export function toggleLike(postId: string, userId: string): { isLiked: boolean; likesCount: number } {
  if (!likeState[userId]) {
    likeState[userId] = {};
  }

  const post = posts.find((p) => p.id === postId);
  if (!post) {
    throw new Error('Post not found');
  }

  const wasLiked = likeState[userId][postId] || false;
  likeState[userId][postId] = !wasLiked;

  post.isLiked = likeState[userId][postId];
  post.likesCount += wasLiked ? -1 : 1;

  return { isLiked: post.isLiked, likesCount: post.likesCount };
}
