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

export const semanticColors = {
  $type: 'color',

  primary: {
    default: { $value: colorPrimitives.purple[500].$value, $description: '{color.purple.500}' },
    hover: { $value: colorPrimitives.purple[600].$value, $description: '{color.purple.600}' },
    pressed: { $value: colorPrimitives.purple[700].$value, $description: '{color.purple.700}' },
    disabled: { $value: colorPrimitives.purple[100].$value, $description: '{color.purple.100}' },
  },

  secondary: {
    default: { $value: colorPrimitives.pink[500].$value, $description: '{color.pink.500}' },
    hover: { $value: colorPrimitives.pink[200].$value, $description: '{color.pink.200}' },
    pressed: { $value: colorPrimitives.pink[600].$value, $description: '{color.pink.600}' },
    light: { $value: colorPrimitives.pink[100].$value, $description: '{color.pink.100}' },
  },

  background: {
    default: { $value: colorPrimitives.neutral[0].$value, $description: '{color.neutral.0}' },
    secondary: { $value: colorPrimitives.neutral[150].$value, $description: '{color.neutral.150}' },
    tertiary: { $value: colorPrimitives.neutral[100].$value, $description: '{color.neutral.100}' },
    hover: { $value: colorPrimitives.neutral[200].$value, $description: '{color.neutral.200}' },
    disabled: { $value: colorPrimitives.neutral[300].$value, $description: '{color.neutral.300}' },
    feed: { $value: colorPrimitives.neutral[50].$value, $description: '{color.neutral.50}' },
  },

  text: {
    primary: { $value: colorPrimitives.neutral[1000].$value, $description: '{color.neutral.1000}' },
    secondary: { $value: colorPrimitives.neutral[700].$value, $description: '{color.neutral.700}' },
    disabled: { $value: colorPrimitives.neutral[600].$value, $description: '{color.neutral.600}' },
    placeholder: {
      $value: colorPrimitives.neutral[500].$value,
      $description: '{color.neutral.500}',
    },
    inverse: { $value: colorPrimitives.neutral[0].$value, $description: '{color.neutral.0}' },
  },

  border: {
    default: { $value: colorPrimitives.neutral[400].$value, $description: '{color.neutral.400}' },
    focus: { $value: colorPrimitives.neutral[150].$value, $description: '{color.neutral.150}' },
  },

  icon: {
    default: { $value: colorPrimitives.neutral[700].$value, $description: '{color.neutral.700}' },
    disabled: { $value: colorPrimitives.neutral[500].$value, $description: '{color.neutral.500}' },
    active: { $value: colorPrimitives.pink[500].$value, $description: '{color.pink.500}' },
  },

  skeleton: {
    base: { $value: colorPrimitives.skeleton.base.$value, $description: '{color.skeleton.base}' },
    highlight: {
      $value: colorPrimitives.skeleton.highlight.$value,
      $description: '{color.skeleton.highlight}',
    },
  },
} as const;

export const semanticStates = {
  primary: {
    default: {
      background: {
        $type: 'color',
        $value: colorPrimitives.purple[500].$value,
        $description: '{color.purple.500}',
      },
      text: {
        $type: 'color',
        $value: colorPrimitives.neutral[0].$value,
        $description: '{color.neutral.0}',
      },
      icon: {
        $type: 'color',
        $value: colorPrimitives.neutral[0].$value,
        $description: '{color.neutral.0}',
      },
    },
    hover: {
      background: {
        $type: 'color',
        $value: colorPrimitives.purple[600].$value,
        $description: '{color.purple.600}',
      },
      text: {
        $type: 'color',
        $value: colorPrimitives.neutral[0].$value,
        $description: '{color.neutral.0}',
      },
      icon: {
        $type: 'color',
        $value: colorPrimitives.neutral[0].$value,
        $description: '{color.neutral.0}',
      },
    },
    pressed: {
      background: {
        $type: 'color',
        $value: colorPrimitives.purple[700].$value,
        $description: '{color.purple.700}',
      },
      text: {
        $type: 'color',
        $value: colorPrimitives.neutral[0].$value,
        $description: '{color.neutral.0}',
      },
      icon: {
        $type: 'color',
        $value: colorPrimitives.neutral[0].$value,
        $description: '{color.neutral.0}',
      },
    },
    disabled: {
      background: {
        $type: 'color',
        $value: colorPrimitives.purple[100].$value,
        $description: '{color.purple.100}',
      },
      text: {
        $type: 'color',
        $value: colorPrimitives.neutral[0].$value,
        $description: '{color.neutral.0}',
      },
      icon: {
        $type: 'color',
        $value: colorPrimitives.neutral[0].$value,
        $description: '{color.neutral.0}',
      },
    },
  },
} as const;

export const semanticSpacing = {
  $type: 'dimension',

  xs: { $value: spacingPrimitives.xs.$value, $description: '{spacing.xs}' },
  sm: { $value: spacingPrimitives.sm.$value, $description: '{spacing.sm}' },
  md: { $value: spacingPrimitives.md.$value, $description: '{spacing.md}' },
  base: { $value: spacingPrimitives.base.$value, $description: '{spacing.base}' },
  lg: { $value: spacingPrimitives.lg.$value, $description: '{spacing.lg}' },
  xl: { $value: spacingPrimitives.xl.$value, $description: '{spacing.xl}' },
  '2xl': { $value: spacingPrimitives['2xl'].$value, $description: '{spacing.2xl}' },
  '3xl': { $value: spacingPrimitives['3xl'].$value, $description: '{spacing.3xl}' },
  '4xl': { $value: spacingPrimitives['4xl'].$value, $description: '{spacing.4xl}' },
  '5xl': { $value: spacingPrimitives['5xl'].$value, $description: '{spacing.5xl}' },
  '6xl': { $value: spacingPrimitives['6xl'].$value, $description: '{spacing.6xl}' },
} as const;

export const semanticBorderRadius = {
  $type: 'dimension',

  none: { $value: borderRadiusPrimitives.none.$value, $description: '{borderRadius.none}' },
  sm: { $value: borderRadiusPrimitives.sm.$value, $description: '{borderRadius.sm}' },
  md: { $value: borderRadiusPrimitives.md.$value, $description: '{borderRadius.md}' },
  lg: { $value: borderRadiusPrimitives.lg.$value, $description: '{borderRadius.lg}' },
  xl: { $value: borderRadiusPrimitives.xl.$value, $description: '{borderRadius.xl}' },
  '2xl': { $value: borderRadiusPrimitives['2xl'].$value, $description: '{borderRadius.2xl}' },
  full: { $value: borderRadiusPrimitives.full.$value, $description: '{borderRadius.full}' },
} as const;

export const semanticTypography = {
  fontSize: {
    $type: 'dimension',
    xs: { $value: fontSizePrimitives.xs.$value, $description: '{fontSize.xs}' },
    sm: { $value: fontSizePrimitives.sm.$value, $description: '{fontSize.sm}' },
    base: { $value: fontSizePrimitives.base.$value, $description: '{fontSize.base}' },
    lg: { $value: fontSizePrimitives.lg.$value, $description: '{fontSize.lg}' },
    xl: { $value: fontSizePrimitives.xl.$value, $description: '{fontSize.xl}' },
    '2xl': { $value: fontSizePrimitives['2xl'].$value, $description: '{fontSize.2xl}' },
    '3xl': { $value: fontSizePrimitives['3xl'].$value, $description: '{fontSize.3xl}' },
    '4xl': { $value: fontSizePrimitives['4xl'].$value, $description: '{fontSize.4xl}' },
  },

  fontWeight: {
    $type: 'fontWeight',
    regular: { $value: fontWeightPrimitives.regular.$value, $description: '{fontWeight.regular}' },
    medium: { $value: fontWeightPrimitives.medium.$value, $description: '{fontWeight.medium}' },
    semibold: {
      $value: fontWeightPrimitives.semibold.$value,
      $description: '{fontWeight.semibold}',
    },
    bold: { $value: fontWeightPrimitives.bold.$value, $description: '{fontWeight.bold}' },
  },

  lineHeight: {
    $type: 'number',
    tight: { $value: lineHeightPrimitives.tight.$value, $description: '{lineHeight.tight}' },
    normal: { $value: lineHeightPrimitives.normal.$value, $description: '{lineHeight.normal}' },
    relaxed: { $value: lineHeightPrimitives.relaxed.$value, $description: '{lineHeight.relaxed}' },
    loose: { $value: lineHeightPrimitives.loose.$value, $description: '{lineHeight.loose}' },
  },

  letterSpacing: {
    $type: 'number',
    tight: { $value: letterSpacingPrimitives.tight.$value, $description: '{letterSpacing.tight}' },
    normal: {
      $value: letterSpacingPrimitives.normal.$value,
      $description: '{letterSpacing.normal}',
    },
    wide: { $value: letterSpacingPrimitives.wide.$value, $description: '{letterSpacing.wide}' },
  },

  fontFamily: {
    $type: 'fontFamily',
    primary: { $value: fontFamilyPrimitives.primary.$value, $description: '{fontFamily.primary}' },
  },
} as const;

export const semantic = {
  colors: semanticColors,
  states: semanticStates,
  spacing: semanticSpacing,
  borderRadius: semanticBorderRadius,
  typography: semanticTypography,
} as const;

export type Semantic = typeof semantic;
