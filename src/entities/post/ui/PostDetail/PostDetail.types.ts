export interface CommentData {
  id: string;
  avatarUri: string;
  authorName: string;
  commentText: string;
  likeCount: number;
  liked: boolean;
}

export interface PostDetailProps {
  /** ID поста */
  id: string;
  /** URI аватара автора поста */
  authorAvatarUri: string;
  /** Имя автора поста */
  authorName: string;
  /** URI изображения поста */
  imageUri: string;
  /** Заголовок поста */
  title: string;
  /** Текст поста */
  body: string;
  /** Количество донатов */
  donateCount: number;
  /** Количество комментариев */
  commentCount: number;
  /** Активен ли донат (пользователь задонатил) */
  donateActive?: boolean;
  /** Список комментариев */
  comments: CommentData[];
  /** Сортировка комментариев */
  sortLabel?: string;
  /** Нажатие на кнопку доната */
  onDonatePress?: () => void;
  /** Нажатие на кнопку комментария */
  onCommentPress?: () => void;
  /** Нажатие на «Сначала новые» */
  onSortPress?: () => void;
  /** Нажатие лайка на конкретном комментарии */
  onCommentLikePress?: (commentId: string) => void;
}
