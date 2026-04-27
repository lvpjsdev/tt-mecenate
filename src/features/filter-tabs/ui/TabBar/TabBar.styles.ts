import { StyleSheet } from 'react-native';
import { tokens } from '@/shared/styles/tokens';

export const stylesheet = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: tokens.borderRadius.full,
    borderWidth: 1,
    padding: tokens.spacing.xs,
  },
});
