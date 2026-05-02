import { StyleSheet } from 'react-native';
import { tokens } from '@/shared/styles/tokens';

export const stylesheet = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: tokens.palette.neutral[0],
    borderRadius: tokens.borderRadius.lg,
    overflow: 'hidden',
    gap: tokens.spacing.xl,
    paddingBottom: tokens.spacing.xl,
    // marginHorizontal: tokens.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.lg,
    paddingHorizontal: tokens.spacing.xl,
    paddingTop: tokens.spacing.lg,
  },
  authorName: {
    fontSize: tokens.fontSize.base,
    fontWeight: '700',
    fontFamily: tokens.fontFamily.primary,
    color: tokens.palette.neutral[1000],
  },
  postImage: {
    width: '100%',
    aspectRatio: 1,
  },
  textBlock: {
    gap: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.xl,
  },
  title: {
    fontSize: tokens.fontSize.xl,
    fontWeight: '700',
    fontFamily: tokens.fontFamily.primary,
    color: tokens.palette.neutral[1000],
    lineHeight: tokens.fontSize.xl * tokens.lineHeight.loose,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.xl,
  },
  commentsBlock: {
    gap: tokens.spacing.xs,
    paddingHorizontal: tokens.spacing.xl,
  },
  commentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: tokens.spacing.xs,
  },
  commentsCountText: {
    fontSize: tokens.fontSize.base,
    fontWeight: '600',
    fontFamily: tokens.fontFamily.primary,
    color: tokens.palette.neutral[700],
  },
  commentDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: tokens.palette.neutral[150],
  },
});
