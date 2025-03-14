
import React from "react";
import { Sun, Moon, TreePalm, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import { UaeTheme, useThemeContext } from "./ThemeContext";
import { UaeButton } from "@/components/ui/uae";

const themeOptions = [
  { id: "default" as UaeTheme, icon: <Sun className="h-4 w-4" />, label: "Default" },
  { id: "desert" as UaeTheme, icon: <TreePalm className="h-4 w-4" />, label: "Desert" },
  { id: "oasis" as UaeTheme, icon: <Moon className="h-4 w-4" />, label: "Oasis" },
  { id: "modern" as UaeTheme, icon: <Building className="h-4 w-4" />, label: "Modern" }
];

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useThemeContext();

  return (
    <div className="mb-8">
      <p className="text-center text-sm text-emirati-deepBrown mb-3">Cultural Heritage Themes</p>
      <div className="flex justify-center gap-2 flex-wrap">
        {themeOptions.map((option) => (
          <UaeButton
            key={option.id}
            variant={theme === option.id ? "oasis" : "desert"}
            size="sm"
            onClick={() => setTheme(option.id)}
            className={cn(
              "transition-all duration-300",
              theme === option.id 
                ? "scale-105 shadow-md" 
                : "opacity-85 hover:opacity-100"
            )}
          >
            {option.icon}
            <span className="ml-1">{option.label}</span>
          </UaeButton>
        ))}
      </div>
    </div>
  );
};

export default ThemeToggle;
