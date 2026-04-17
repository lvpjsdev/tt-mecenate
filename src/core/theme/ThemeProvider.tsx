import { createContext, type FC, type ReactNode, useContext } from 'react';
import { theme } from './theme';

const ThemeContext = createContext(theme);

interface Props {
  title?: string;
  children: ReactNode; // Explicitly define children
}

export const ThemeProvider: FC<Props> = ({ children }) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
