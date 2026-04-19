import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const stylesheet = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing['4xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
});
