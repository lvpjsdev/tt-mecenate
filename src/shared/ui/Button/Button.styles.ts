import { StyleSheet } from 'react-native';
import { tokens } from '../../styles/tokens';

export const stylesheet = StyleSheet.create({
  container: {
    borderRadius: tokens.borderRadius.lg,
    paddingVertical: tokens.spacing.xl,
    paddingHorizontal: tokens.spacing['4xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
});
