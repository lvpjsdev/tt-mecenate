import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const stylesheet = StyleSheet.create({
  pill: {
    borderRadius: theme.borderRadius.full,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
});
