export const tokens = {
  palette: {
    purple: {
      100: '#d5c9ff',
      500: '#6115cd',
      600: '#4e11a4',
      700: '#3a0d7b',
    },
    pink: {
      100: '#ffeaf1',
      200: '#ffbad2',
      500: '#ff2b75',
      600: '#de2465',
    },
    neutral: {
      0: '#ffffff',
      50: '#f5f8fd',
      100: '#f3f3f3',
      150: '#eff2f7',
      200: '#e6e9ef',
      300: '#dddddd',
      400: '#e8ecef',
      500: '#b6bec8',
      600: '#c3cad1',
      700: '#57626f',
      1000: '#000000',
    },
    skeleton: {
      base: '#eeeff1',
      highlight: '#f8f8f8',
    },
  },

  fontSize: {
    xs: 12,
    sm: 13,
    base: 15,
    lg: 16,
    xl: 18,
    '2xl': 20,
    '3xl': 24,
    '4xl': 28,
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.333,
    relaxed: 1.384,
    loose: 1.5,
  },
  letterSpacing: {
    tight: -0.02,
    normal: 0,
    wide: 0.02,
  },
  fontFamily: {
    primary: 'Manrope',
  },

  spacing: {
    xs: 4,
    sm: 6,
    md: 8,
    base: 10,
    lg: 12,
    xl: 16,
    '2xl': 20,
    '3xl': 24,
    '4xl': 32,
    '5xl': 40,
    '6xl': 48,
  },

  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 14,
    xl: 20,
    '2xl': 22,
    full: 9999,
  },
} as const;

export type Tokens = typeof tokens;
