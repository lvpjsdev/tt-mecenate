import { StyleSheet } from 'react-native';
import { tokens } from '@/shared/styles/tokens';

export const stylesheet = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: tokens.spacing.xs,
    alignItems: 'center',
  },
});
