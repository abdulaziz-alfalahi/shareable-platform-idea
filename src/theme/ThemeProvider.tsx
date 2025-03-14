
import React, { createContext, useContext, ReactNode } from 'react';
import { uaeTheme, componentThemes } from './uaeTheme';

type ThemeContextType = {
  theme: typeof uaeTheme;
  components: typeof componentThemes;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: uaeTheme,
  components: componentThemes,
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const value = {
    theme: uaeTheme,
    components: componentThemes,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
