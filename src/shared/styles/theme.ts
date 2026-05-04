import { semanticColors, semanticStates } from './tokens.semantic';

export const lightTheme = {
  states: {
    primary: {
      default: {
        background: semanticStates.primary.default.background.$value,
        text: semanticStates.primary.default.text.$value,
        icon: semanticStates.primary.default.icon.$value,
      },
      hover: {
        background: semanticStates.primary.hover.background.$value,
        text: semanticStates.primary.hover.text.$value,
        icon: semanticStates.primary.hover.icon.$value,
      },
      pressed: {
        background: semanticStates.primary.pressed.background.$value,
        text: semanticStates.primary.pressed.text.$value,
        icon: semanticStates.primary.pressed.icon.$value,
      },
      disabled: {
        background: semanticStates.primary.disabled.background.$value,
        text: semanticStates.primary.disabled.text.$value,
        icon: semanticStates.primary.disabled.icon.$value,
      },
    },
  },

  colors: {
    primary: {
      default: semanticColors.primary.default.$value,
      hover: semanticColors.primary.hover.$value,
      pressed: semanticColors.primary.pressed.$value,
      disabled: semanticColors.primary.disabled.$value,
    },
    secondary: {
      default: semanticColors.secondary.default.$value,
      hover: semanticColors.secondary.hover.$value,
      pressed: semanticColors.secondary.pressed.$value,
      light: semanticColors.secondary.light.$value,
    },
    background: {
      default: semanticColors.background.default.$value,
      secondary: semanticColors.background.secondary.$value,
      tertiary: semanticColors.background.tertiary.$value,
      hover: semanticColors.background.hover.$value,
      disabled: semanticColors.background.disabled.$value,
      feed: semanticColors.background.feed.$value,
    },
    text: {
      primary: semanticColors.text.primary.$value,
      secondary: semanticColors.text.secondary.$value,
      disabled: semanticColors.text.disabled.$value,
      placeholder: semanticColors.text.placeholder.$value,
      inverse: semanticColors.text.inverse.$value,
    },
    border: {
      default: semanticColors.border.default.$value,
      focus: semanticColors.border.focus.$value,
    },
    icon: {
      default: semanticColors.icon.default.$value,
      disabled: semanticColors.icon.disabled.$value,
      active: semanticColors.icon.active.$value,
    },
    skeleton: {
      base: semanticColors.skeleton.base.$value,
      highlight: semanticColors.skeleton.highlight.$value,
    },
  },
} as const;

export type AppTheme = typeof lightTheme;
export type ThemeMode = 'light';
