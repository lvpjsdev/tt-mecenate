import { createContext, type FC, type ReactNode, useContext, useMemo, useState } from 'react';
import type { AppTheme, ThemeMode } from '@/shared/styles/theme';
import { lightTheme } from '@/shared/styles/theme';

interface Props {
  mode?: ThemeMode;
  children: ReactNode;
}

type ThemeContextValue = {
  theme: AppTheme;
  mode: ThemeMode;
  toggleTheme: (m: ThemeMode) => void;
};

const getTheme = (mode: ThemeMode): AppTheme => {
  switch (mode) {
    case 'light':
      return lightTheme;
    default:
      return lightTheme;
  }
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider: FC<Props> = ({ mode = 'light', children }) => {
  const [themeMode, setMode] = useState(mode);

  const theme = useMemo(() => {
    return getTheme(themeMode);
  }, [themeMode]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        mode: themeMode,
        toggleTheme: setMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

/** Returns the current AppTheme object directly. Throws if used outside ThemeProvider. */
export const useTheme = (): AppTheme => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx.theme;
};

/** Returns the full theme context (theme, mode, toggleTheme). Throws if used outside ThemeProvider. */
export const useThemeContext = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeContext must be used within a ThemeProvider');
  return ctx;
};
