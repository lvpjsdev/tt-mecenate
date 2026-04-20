import { StyleSheet } from 'react-native';
import { tokens } from '../../styles/tokens';

export const stylesheet = StyleSheet.create({
  pill: {
    borderRadius: tokens.borderRadius.full,
    paddingVertical: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.xs,
  },
});
