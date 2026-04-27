export interface CommentItemProps {
  avatarUri: string;
  authorName: string;
  commentText: string;
  likeCount: number;
  liked: boolean;
  onLikePress: () => void;
}
