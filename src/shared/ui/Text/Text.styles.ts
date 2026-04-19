import { StyleSheet } from 'react-native';
import { Fonts } from '../../styles/fonts';
import { theme } from '../../styles/theme';

export const stylesheet = StyleSheet.create({
  label: {
    fontFamily: Fonts.medium,
    fontSize: theme.typography.fontSize.base,
    lineHeight: theme.typography.fontSize.base * theme.typography.lineHeight.tight,
    letterSpacing: theme.typography.letterSpacing.tight,
  },
  symbol: {
    fontFamily: Fonts.medium,
    fontSize: theme.typography.fontSize.sm,
    lineHeight: theme.typography.fontSize.sm * theme.typography.lineHeight.tight,
    letterSpacing: theme.typography.letterSpacing.tight,
  },
  placeholder: {
    fontFamily: Fonts.regular,
    fontSize: theme.typography.fontSize.base,
    lineHeight: theme.typography.fontSize.base * theme.typography.lineHeight.normal,
    letterSpacing: theme.typography.letterSpacing.normal,
  },
  body: {
    fontFamily: Fonts.regular,
    fontSize: theme.typography.fontSize.base,
    lineHeight: theme.typography.fontSize.base * theme.typography.lineHeight.relaxed,
    letterSpacing: theme.typography.letterSpacing.normal,
  },
  h1: {
    fontFamily: Fonts.bold,
    fontSize: theme.typography.fontSize['4xl'],
    lineHeight: theme.typography.fontSize['4xl'] * theme.typography.lineHeight.tight,
    letterSpacing: theme.typography.letterSpacing.tight,
  },
  h2: {
    fontFamily: Fonts.bold,
    fontSize: theme.typography.fontSize['2xl'],
    lineHeight: theme.typography.fontSize['2xl'] * theme.typography.lineHeight.tight,
    letterSpacing: theme.typography.letterSpacing.tight,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: theme.typography.fontSize.xl,
    lineHeight: theme.typography.fontSize.xl * theme.typography.lineHeight.normal,
    letterSpacing: theme.typography.letterSpacing.tight,
  },
});
