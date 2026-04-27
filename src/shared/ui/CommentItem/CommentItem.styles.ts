import { StyleSheet } from 'react-native';
import { tokens, lightTheme as theme } from '../../styles/theme';

export const stylesheet = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: tokens.spacing.lg,
  },
  content: {
    flex: 1,
    gap: tokens.spacing.xs,
  },
  authorName: {
    fontSize: tokens.fontSize.base,
    fontWeight: '700',
    color: tokens.palette.text.primary,
  },
  commentText: {
    fontSize: tokens.fontSize.sm,
    fontWeight: '500',
    color: tokens.palette.text.primary,
  },
});
