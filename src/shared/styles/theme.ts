/**
 * Semantic theme — maps color tokens to meaningful roles.
 * Only colors live here: switching themes means swapping these mappings.
 * Spacing, typography, and shape tokens are theme-independent — use tokens.ts directly.
 */
import { tokens } from './tokens';

export const lightTheme = {
  // --- Interactive state colors (e.g. Button) ---
  states: {
    primary: {
      default: {
        background: tokens.palette.purple[500],
        text: tokens.palette.neutral[0],
        icon: tokens.palette.neutral[0],
      },
      hover: {
        background: tokens.palette.purple[600],
        text: tokens.palette.neutral[0],
        icon: tokens.palette.neutral[0],
      },
      pressed: {
        background: tokens.palette.purple[700],
        text: tokens.palette.neutral[0],
        icon: tokens.palette.neutral[0],
      },
      disabled: {
        background: tokens.palette.purple[100],
        text: tokens.palette.neutral[0],
        icon: tokens.palette.neutral[0],
      },
    },
  },

  // --- Semantic color roles ---
  colors: {
    primary: {
      default: tokens.palette.purple[500],
      hover: tokens.palette.purple[600],
      pressed: tokens.palette.purple[700],
      disabled: tokens.palette.purple[100],
    },
    secondary: {
      default: tokens.palette.pink[500],
      hover: tokens.palette.pink[200],
      pressed: tokens.palette.pink[600],
      light: tokens.palette.pink[100],
    },
    background: {
      default: tokens.palette.neutral[0],
      secondary: tokens.palette.neutral[150],
      tertiary: tokens.palette.neutral[100],
      hover: tokens.palette.neutral[200],
      disabled: tokens.palette.neutral[300],
    },
    text: {
      primary: tokens.palette.neutral[1000],
      secondary: tokens.palette.neutral[700],
      disabled: tokens.palette.neutral[600],
      placeholder: tokens.palette.neutral[500],
      inverse: tokens.palette.neutral[0],
    },
    border: {
      default: tokens.palette.neutral[400],
      focus: tokens.palette.neutral[150],
    },
    icon: {
      default: tokens.palette.neutral[700],
      disabled: tokens.palette.neutral[500],
      active: tokens.palette.pink[500],
    },
    skeleton: {
      base: tokens.palette.skeleton.base,
      highlight: tokens.palette.skeleton.highlight,
    },
  },
} as const;

export type AppTheme = typeof lightTheme;
export type ThemeMode = 'light';
