export const theme = {
  states: {
    primary: {
      default: { background: '#6115cd', text: '#ffffff', icon: '#ffffff' },
      hover: { background: '#4e11a4', text: '#ffffff', icon: '#ffffff' },
      pressed: { background: '#3a0d7b', text: '#ffffff', icon: '#ffffff' },
      disabled: { background: '#d5c9ff', text: '#ffffff', icon: '#ffffff' },
    },
  },
  colors: {
    primary: {
      default: '#6115cd',
      hover: '#4e11a4',
      pressed: '#3a0d7b',
      disabled: '#d5c9ff',
    },
    secondary: {
      default: '#ff2b75',
      hover: '#ffbad2',
      pressed: '#de2465',
      light: '#ffeaf1',
    },
    background: {
      default: '#ffffff',
      secondary: '#eff2f7',
      tertiary: '#f3f3f3',
      hover: '#e6e9ef',
      disabled: '#dddddd',
    },
    text: {
      primary: '#000000',
      secondary: '#57626f',
      disabled: '#c3cad1',
      placeholder: '#b6bec8',
      inverse: '#ffffff',
    },
    border: {
      default: '#e8ecef',
      focus: '#eff2f7',
    },
    icon: {
      default: '#57626f',
      disabled: '#b6bec8',
      active: '#ff2b75',
    },
  },
  typography: {
    fontFamily: {
      primary: 'Manrope',
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
};

export type AppTheme = typeof theme;
