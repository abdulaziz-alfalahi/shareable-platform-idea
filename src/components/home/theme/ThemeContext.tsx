
import React, { createContext, useContext, useState, useEffect } from "react";

export type UaeTheme = "default" | "desert" | "oasis" | "modern";

type ThemeContextType = {
  theme: UaeTheme;
  setTheme: (theme: UaeTheme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<UaeTheme>(() => {
    const savedTheme = localStorage.getItem("uae-theme") as UaeTheme;
    return savedTheme || "default";
  });

  useEffect(() => {
    localStorage.setItem("uae-theme", theme);
    
    // Apply theme classes to the document body
    document.body.classList.remove("theme-default", "theme-desert", "theme-oasis", "theme-modern");
    document.body.classList.add(`theme-${theme}`);
    
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
