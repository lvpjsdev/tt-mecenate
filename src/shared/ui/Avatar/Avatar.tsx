import { Image } from 'expo-image';
import { tokens } from '@/shared/styles/tokens';
import type { AvatarProps } from './Avatar.types';

const DEFAULT_SIZE = 40;

export function Avatar({ uri, size = DEFAULT_SIZE, placeholder, testID }: AvatarProps) {
  return (
    <Image
      source={{ uri }}
      placeholder={placeholder}
      contentFit="cover"
      transition={200}
      testID={testID}
      style={{
        width: size,
        height: size,
        borderRadius: tokens.borderRadius.full,
        backgroundColor: tokens.palette.skeleton.base,
      }}
    />
  );
}
