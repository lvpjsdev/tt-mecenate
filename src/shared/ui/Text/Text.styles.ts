import { StyleSheet } from 'react-native';
import { Fonts } from '../../styles/fonts';
import { tokens } from '../../styles/tokens';

export const stylesheet = StyleSheet.create({
  label: {
    fontFamily: Fonts.semibold,
    fontSize: tokens.fontSize.base,
    lineHeight: tokens.fontSize.base * tokens.lineHeight.tight,
    letterSpacing: tokens.letterSpacing.tight,
  },
  symbol: {
    fontFamily: Fonts.medium,
    fontSize: tokens.fontSize.sm,
    lineHeight: tokens.fontSize.sm * tokens.lineHeight.tight,
    letterSpacing: tokens.letterSpacing.tight,
  },
  placeholder: {
    fontFamily: Fonts.regular,
    fontSize: tokens.fontSize.base,
    lineHeight: tokens.fontSize.base * tokens.lineHeight.normal,
    letterSpacing: tokens.letterSpacing.normal,
  },
  body: {
    fontFamily: Fonts.regular,
    fontSize: tokens.fontSize.base,
    lineHeight: tokens.fontSize.base * tokens.lineHeight.relaxed,
    letterSpacing: tokens.letterSpacing.normal,
  },
  h1: {
    fontFamily: Fonts.bold,
    fontSize: tokens.fontSize['4xl'],
    lineHeight: tokens.fontSize['4xl'] * tokens.lineHeight.tight,
    letterSpacing: tokens.letterSpacing.tight,
  },
  h2: {
    fontFamily: Fonts.bold,
    fontSize: tokens.fontSize['2xl'],
    lineHeight: tokens.fontSize['2xl'] * tokens.lineHeight.tight,
    letterSpacing: tokens.letterSpacing.tight,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: tokens.fontSize.xl,
    lineHeight: tokens.fontSize.xl * tokens.lineHeight.normal,
    letterSpacing: tokens.letterSpacing.tight,
  },
});
