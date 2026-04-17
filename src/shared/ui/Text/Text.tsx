import { Text as RNText } from 'react-native';
import { stylesheet } from './Text.styles';
import type { TextProps } from './Text.types';

export function Text({ variant, children, color }: TextProps) {
  const style = stylesheet[variant];

  return <RNText style={[style, color ? { color } : undefined]}>{children}</RNText>;
}

Text.displayName = 'Text';
