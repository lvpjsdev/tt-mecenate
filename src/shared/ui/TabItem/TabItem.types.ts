export interface TabItemProps {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  testID?: string;
}
