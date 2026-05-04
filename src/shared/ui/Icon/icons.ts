import CommentSvg from '@/../assets/icons/comment.svg';
import DonateSvg from '@/../assets/icons/donate.svg';
import LikeSvg from '@/../assets/icons/like.svg';
import LoaderSvg from '@/../assets/icons/loader.svg';
import PaperPlaneSvg from '@/../assets/icons/paper-plane.svg';

export const ICON_SIZE = {
  sm: 16,
  md: 24,
  lg: 32,
} as const satisfies Record<string, number>;

export const icons = {
  comment: CommentSvg,
  donate: DonateSvg,
  like: LikeSvg,
  loader: LoaderSvg,
  'paper-plane': PaperPlaneSvg,
} as const;

export type IconName = keyof typeof icons;
