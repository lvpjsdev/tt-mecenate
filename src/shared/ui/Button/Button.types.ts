export type ButtonState = 'default' | 'hover' | 'pressed' | 'disabled' | 'loading';

export interface ButtonProps {
  label: string;
  state?: ButtonState;
  onPress?: () => void;
}
