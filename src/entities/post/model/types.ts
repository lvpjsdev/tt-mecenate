export type Post = {
  id: string;
  authorName: string;
  avatarUrl?: string;
  title?: string;
  preview: string;
  coverUrl?: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  isPaid: boolean;
  tier: Tier;
};

export type Tier = 'free' | 'paid';
