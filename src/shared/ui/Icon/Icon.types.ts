import type { IconName } from './icons';

export type { IconName };

export interface IconProps {
  /** Имя иконки из реестра. Обязательный проп. */
  name: IconName;
  /** Размер иконки в пикселях. По умолчанию ICON_SIZE.md = 24. */
  size?: number;
  /** Цвет заливки иконки. По умолчанию '#000000'. */
  color?: string;
}
