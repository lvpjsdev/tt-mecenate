import type { StyleProp, TextLayoutEvent, TextStyle } from 'react-native';

export type TextVariant = 'label' | 'symbol' | 'placeholder' | 'body' | 'h1' | 'h2' | 'title';

export interface TextProps {
  variant: TextVariant;
  children: string;
  color?: string;
  numberOfLines?: number;
  onTextLayout?: (e: TextLayoutEvent) => void;
  style?: StyleProp<TextStyle>;
}
