import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const stylesheet = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius['2xl'],
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
