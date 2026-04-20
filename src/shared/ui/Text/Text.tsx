import { Text as RNText } from 'react-native';
import { stylesheet } from './Text.styles';
import type { TextProps } from './Text.types';

export function Text({ variant, children, color, numberOfLines, onTextLayout }: TextProps) {
  const variantStyle = stylesheet[variant];

  return (
    <RNText
      style={[variantStyle, color ? { color } : undefined]}
      numberOfLines={numberOfLines}
      onTextLayout={onTextLayout}
    >
      {children}
    </RNText>
  );
}
