import type { LayoutChangeEvent, ViewStyle } from 'react-native';

export interface LinkButtonProps {
  label: string;
  disabled?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  onLayout?: (e: LayoutChangeEvent) => void;
}
