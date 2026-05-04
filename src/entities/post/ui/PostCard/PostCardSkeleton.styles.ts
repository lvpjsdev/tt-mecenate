import { StyleSheet } from 'react-native';
import { tokens } from '@/shared/styles/tokens';

export const stylesheet = StyleSheet.create({
  card: {
    backgroundColor: tokens.palette.neutral[0],
    borderRadius: tokens.borderRadius.lg,
    overflow: 'hidden',
    gap: tokens.spacing.xl,
    paddingBottom: tokens.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.lg,
    paddingHorizontal: tokens.spacing.xl,
    paddingTop: tokens.spacing.lg,
  },
  coverWrapper: {
    width: '100%',
  },
  body: {
    gap: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.xl,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.xl,
  },
});
