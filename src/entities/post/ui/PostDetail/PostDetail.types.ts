export interface PostDetailProps {
  id: string;
  authorAvatarUri: string;
  authorName: string;
  imageUri: string;
  title: string;
  body: string;
  likeCount: number;
  commentCount: number;
  isLiked?: boolean;
  onLike?: () => void;
}
