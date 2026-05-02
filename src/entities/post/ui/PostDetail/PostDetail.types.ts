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
  /** Количество лайков */
  likeCount: number;
  /** Количество комментариев */
  commentCount: number;
  /** Является ли пост избранным */
  isLiked?: boolean;
}
