import { StyleSheet } from 'react-native';
import { tokens } from '@/shared/styles/tokens';

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
  },
  commentText: {
    fontSize: tokens.fontSize.sm,
    fontWeight: '500',
  },
});
