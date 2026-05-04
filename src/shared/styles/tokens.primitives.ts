export const colorPrimitives = {
  $type: 'color',

  purple: {
    100: { $value: '#d5c9ff' },
    500: { $value: '#6115cd' },
    600: { $value: '#4e11a4' },
    700: { $value: '#3a0d7b' },
  },

  pink: {
    100: { $value: '#ffeaf1' },
    200: { $value: '#ffbad2' },
    500: { $value: '#ff2b75' },
    600: { $value: '#de2465' },
  },

  neutral: {
    0: { $value: '#ffffff' },
    50: { $value: '#f5f8fd' },
    100: { $value: '#f3f3f3' },
    150: { $value: '#eff2f7' },
    200: { $value: '#e6e9ef' },
    300: { $value: '#dddddd' },
    400: { $value: '#e8ecef' },
    500: { $value: '#b6bec8' },
    600: { $value: '#c3cad1' },
    700: { $value: '#57626f' },
    1000: { $value: '#000000' },
  },

  skeleton: {
    base: { $value: '#eeeff1' },
    highlight: { $value: '#f8f8f8' },
  },
} as const;

export const spacingPrimitives = {
  $type: 'dimension',

  xs: { $value: { value: 4, unit: 'px' } },
  sm: { $value: { value: 6, unit: 'px' } },
  md: { $value: { value: 8, unit: 'px' } },
  base: { $value: { value: 10, unit: 'px' } },
  lg: { $value: { value: 12, unit: 'px' } },
  xl: { $value: { value: 16, unit: 'px' } },
  '2xl': { $value: { value: 20, unit: 'px' } },
  '3xl': { $value: { value: 24, unit: 'px' } },
  '4xl': { $value: { value: 32, unit: 'px' } },
  '5xl': { $value: { value: 40, unit: 'px' } },
  '6xl': { $value: { value: 48, unit: 'px' } },
} as const;

export const borderRadiusPrimitives = {
  $type: 'dimension',

  none: { $value: { value: 0, unit: 'px' } },
  sm: { $value: { value: 4, unit: 'px' } },
  md: { $value: { value: 8, unit: 'px' } },
  lg: { $value: { value: 14, unit: 'px' } },
  xl: { $value: { value: 20, unit: 'px' } },
  '2xl': { $value: { value: 22, unit: 'px' } },
  full: { $value: { value: 9999, unit: 'px' } },
} as const;

export const fontSizePrimitives = {
  $type: 'dimension',

  xs: { $value: { value: 12, unit: 'px' } },
  sm: { $value: { value: 14, unit: 'px' } },
  base: { $value: { value: 15, unit: 'px' } },
  lg: { $value: { value: 16, unit: 'px' } },
  xl: { $value: { value: 18, unit: 'px' } },
  '2xl': { $value: { value: 20, unit: 'px' } },
  '3xl': { $value: { value: 24, unit: 'px' } },
  '4xl': { $value: { value: 28, unit: 'px' } },
} as const;

export const fontWeightPrimitives = {
  $type: 'fontWeight',

  regular: { $value: 400 },
  medium: { $value: 500 },
  semibold: { $value: 600 },
  bold: { $value: 700 },
} as const;

export const lineHeightPrimitives = {
  $type: 'number',

  tight: { $value: 1.2 },
  normal: { $value: 1.333 },
  relaxed: { $value: 1.384 },
  loose: { $value: 1.5 },
} as const;

export const letterSpacingPrimitives = {
  $type: 'number',

  tight: { $value: -0.02 },
  normal: { $value: 0 },
  wide: { $value: 0.02 },
} as const;

export const fontFamilyPrimitives = {
  $type: 'fontFamily',

  primary: { $value: 'Manrope' },
} as const;

export const primitives = {
  color: colorPrimitives,
  spacing: spacingPrimitives,
  borderRadius: borderRadiusPrimitives,
  fontSize: fontSizePrimitives,
  fontWeight: fontWeightPrimitives,
  lineHeight: lineHeightPrimitives,
  letterSpacing: letterSpacingPrimitives,
  fontFamily: fontFamilyPrimitives,
} as const;

export type Primitives = typeof primitives;
