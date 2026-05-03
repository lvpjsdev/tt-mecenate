import { StyleSheet } from 'react-native';
import { tokens } from '@/shared/styles/tokens';

export const stylesheet = StyleSheet.create({
  container: {
    borderRadius: tokens.borderRadius['2xl'],
    paddingVertical: tokens.spacing.base,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
