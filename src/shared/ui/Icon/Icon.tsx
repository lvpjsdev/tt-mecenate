import type { IconProps } from './Icon.types';
import { ICON_SIZE, icons } from './icons';

export function Icon({ name, size = ICON_SIZE.md, color = '#000000' }: IconProps) {
  const SvgComponent = icons[name];

  return <SvgComponent width={size} height={size} color={color} />;
}
