import {
  borderRadiusPrimitives,
  colorPrimitives,
  fontFamilyPrimitives,
  fontSizePrimitives,
  fontWeightPrimitives,
  letterSpacingPrimitives,
  lineHeightPrimitives,
  spacingPrimitives,
} from './tokens.primitives';

export type { Primitives } from './tokens.primitives';
export { primitives } from './tokens.primitives';
export type { Semantic } from './tokens.semantic';
export { semantic } from './tokens.semantic';

export const tokens = {
  palette: {
    purple: {
      100: colorPrimitives.purple[100].$value,
      500: colorPrimitives.purple[500].$value,
      600: colorPrimitives.purple[600].$value,
      700: colorPrimitives.purple[700].$value,
    },
    pink: {
      100: colorPrimitives.pink[100].$value,
      200: colorPrimitives.pink[200].$value,
      500: colorPrimitives.pink[500].$value,
      600: colorPrimitives.pink[600].$value,
    },
    neutral: {
      0: colorPrimitives.neutral[0].$value,
      50: colorPrimitives.neutral[50].$value,
      100: colorPrimitives.neutral[100].$value,
      150: colorPrimitives.neutral[150].$value,
      200: colorPrimitives.neutral[200].$value,
      300: colorPrimitives.neutral[300].$value,
      400: colorPrimitives.neutral[400].$value,
      500: colorPrimitives.neutral[500].$value,
      600: colorPrimitives.neutral[600].$value,
      700: colorPrimitives.neutral[700].$value,
      1000: colorPrimitives.neutral[1000].$value,
    },
    skeleton: {
      base: colorPrimitives.skeleton.base.$value,
      highlight: colorPrimitives.skeleton.highlight.$value,
    },
  },

  fontSize: {
    xs: fontSizePrimitives.xs.$value.value,
    sm: fontSizePrimitives.sm.$value.value,
    base: fontSizePrimitives.base.$value.value,
    lg: fontSizePrimitives.lg.$value.value,
    xl: fontSizePrimitives.xl.$value.value,
    '2xl': fontSizePrimitives['2xl'].$value.value,
    '3xl': fontSizePrimitives['3xl'].$value.value,
    '4xl': fontSizePrimitives['4xl'].$value.value,
  },

  fontWeight: {
    regular: fontWeightPrimitives.regular.$value,
    medium: fontWeightPrimitives.medium.$value,
    semibold: fontWeightPrimitives.semibold.$value,
    bold: fontWeightPrimitives.bold.$value,
  },

  lineHeight: {
    tight: lineHeightPrimitives.tight.$value,
    normal: lineHeightPrimitives.normal.$value,
    relaxed: lineHeightPrimitives.relaxed.$value,
    loose: lineHeightPrimitives.loose.$value,
  },

  letterSpacing: {
    tight: letterSpacingPrimitives.tight.$value,
    normal: letterSpacingPrimitives.normal.$value,
    wide: letterSpacingPrimitives.wide.$value,
  },

  fontFamily: {
    primary: fontFamilyPrimitives.primary.$value,
  },

  spacing: {
    xs: spacingPrimitives.xs.$value.value,
    sm: spacingPrimitives.sm.$value.value,
    md: spacingPrimitives.md.$value.value,
    base: spacingPrimitives.base.$value.value,
    lg: spacingPrimitives.lg.$value.value,
    xl: spacingPrimitives.xl.$value.value,
    '2xl': spacingPrimitives['2xl'].$value.value,
    '3xl': spacingPrimitives['3xl'].$value.value,
    '4xl': spacingPrimitives['4xl'].$value.value,
    '5xl': spacingPrimitives['5xl'].$value.value,
    '6xl': spacingPrimitives['6xl'].$value.value,
  },

  borderRadius: {
    none: borderRadiusPrimitives.none.$value.value,
    sm: borderRadiusPrimitives.sm.$value.value,
    md: borderRadiusPrimitives.md.$value.value,
    lg: borderRadiusPrimitives.lg.$value.value,
    xl: borderRadiusPrimitives.xl.$value.value,
    '2xl': borderRadiusPrimitives['2xl'].$value.value,
    full: borderRadiusPrimitives.full.$value.value,
  },
} as const;

export type Tokens = typeof tokens;
