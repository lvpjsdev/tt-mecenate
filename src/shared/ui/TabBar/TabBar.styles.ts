import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const stylesheet = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
    padding: theme.spacing.xs,
  },
});
