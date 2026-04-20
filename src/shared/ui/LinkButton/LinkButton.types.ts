import type { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';

export interface LinkButtonProps {
  label: string;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  onLayout?: (e: LayoutChangeEvent) => void;
}
