
import React from "react";
import { useThemeContext } from "./ThemeContext";
import ThemeToggleOption from "./ThemeToggleOption";
import { themeOptions } from "./themeOptions";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useThemeContext();

  return (
    <div className="mb-8">
      <p className="text-center text-sm text-emirati-deepBrown mb-3">Cultural Heritage Themes</p>
      <div className="flex justify-center gap-2 flex-wrap">
        {themeOptions.map((option) => (
          <ThemeToggleOption
            key={option.id}
            option={option}
            currentTheme={theme}
            onSelect={setTheme}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeToggle;
