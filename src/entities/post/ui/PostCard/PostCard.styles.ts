import { StyleSheet } from 'react-native';
import { tokens } from '@/shared/styles/tokens';

export const BODY_LINE_HEIGHT = tokens.fontSize.base * tokens.lineHeight.relaxed;

export const stylesheet = StyleSheet.create({
  card: {
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
  authorName: {
    flex: 1,
  },
  coverImage: {
    width: '100%',
    aspectRatio: 1,
  },
  coverWrapper: {
    position: 'relative',
  },
  lockedCoverOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedContent: {
    alignItems: 'center',
    gap: tokens.spacing.md,
  },
  lockedTextAndButton: {
    gap: tokens.spacing.md,
    width: 239,
  },
  lockedIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: tokens.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedIconCircle: {
    width: 28,
    height: 28,
    borderRadius: tokens.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedIconText: {
    fontSize: tokens.fontSize['2xl'],
    fontWeight: '700',
  },
  lockedText: {
    textAlign: 'center' as const,
  },
  lockedMessageText: {
    fontFamily: tokens.fontFamily.primary,
    fontSize: tokens.fontSize.base,
    fontWeight: '600',
    lineHeight: tokens.fontSize.base * tokens.lineHeight.normal,
    textAlign: 'center',
  },
  lockedButtonWrapper: {
    alignSelf: 'stretch',
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
  previewContainer: {
    position: 'relative',
  },
  hiddenText: {
    position: 'absolute',
    opacity: 0,
  },
  showMoreButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  showMoreGradient: {
    position: 'absolute',
    bottom: 0,
    width: 40,
    height: BODY_LINE_HEIGHT,
  },
});
