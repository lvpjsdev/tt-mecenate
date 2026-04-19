import { StyleSheet } from 'react-native';
import { theme } from '@/shared/styles/theme';

export const BODY_LINE_HEIGHT =
  theme.typography.fontSize.base * theme.typography.lineHeight.relaxed;

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
  coverWrapper: {
    position: 'relative',
  },
  lockedCoverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedContent: {
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  lockedTextAndButton: {
    gap: theme.spacing.md,
    width: 239,
  },
  lockedIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: theme.colors.primary.default,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedIconText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },
  lockedText: {
    textAlign: 'center' as const,
  },
  lockedMessageText: {
    color: '#ffffff',
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    lineHeight: theme.typography.fontSize.base * theme.typography.lineHeight.normal,
    textAlign: 'center',
  },
  lockedButtonWrapper: {
    alignSelf: 'stretch',
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
    backgroundColor: theme.colors.background.default,
  },
  showMoreGradient: {
    position: 'absolute',
    bottom: 0,
    width: 40,
    height: BODY_LINE_HEIGHT,
  },
});
