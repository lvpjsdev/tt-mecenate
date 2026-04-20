import CommentSvg from '@/../assets/icons/comment.svg';
import DonateSvg from '@/../assets/icons/donate.svg';
import LikeSvg from '@/../assets/icons/like.svg';
import LoaderSvg from '@/../assets/icons/loader.svg';

/**
 * Предопределённые размеры иконок.
 * sm=16, md=24, lg=32
 */
export const ICON_SIZE = {
  sm: 16,
  md: 24,
  lg: 32,
} as const satisfies Record<string, number>;

/**
 * Реестр иконок: маппинг строковых имён на SVG React-компоненты.
 * Для добавления новой иконки: импортировать SVG и добавить запись.
 */
export const icons = {
  comment: CommentSvg,
  donate: DonateSvg,
  like: LikeSvg,
  loader: LoaderSvg,
} as const;

/** Тип имени иконки, выведенный из ключей реестра. */
export type IconName = keyof typeof icons;
