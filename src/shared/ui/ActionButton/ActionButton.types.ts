export type ActionButtonType = 'like' | 'comment';

export interface ActionButtonProps {
  type: ActionButtonType;
  count: number;
  active?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}
