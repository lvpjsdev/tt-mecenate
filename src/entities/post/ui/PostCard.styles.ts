import { StyleSheet } from 'react-native';
import { theme } from '@/shared/styles/theme';

export const stylesheet = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background.default,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    gap: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
  },
  authorName: {
    flex: 1,
  },
  coverImage: {
    width: '100%',
    aspectRatio: 1,
  },
  body: {
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
  },
});
