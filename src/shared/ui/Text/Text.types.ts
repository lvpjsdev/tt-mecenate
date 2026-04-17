export type TextVariant = 'label' | 'symbol' | 'placeholder' | 'body';

export interface TextProps {
  variant: TextVariant;
  children: string;
  color?: string;
}
