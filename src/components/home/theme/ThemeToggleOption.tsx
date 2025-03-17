
import React from "react";
import { cn } from "@/lib/utils";
import { UaeButton } from "@/components/ui/uae";
import { UaeTheme } from "./ThemeContext";
import { ThemeOption } from "./themeOptions";

interface ThemeToggleOptionProps {
  option: ThemeOption;
  currentTheme: UaeTheme;
  onSelect: (theme: UaeTheme) => void;
}

const ThemeToggleOption: React.FC<ThemeToggleOptionProps> = ({ 
  option, 
  currentTheme, 
  onSelect 
}) => {
  const isActive = currentTheme === option.id;
  
  return (
    <UaeButton
      variant={isActive ? "oasis" : "desert"}
      size="sm"
      onClick={() => onSelect(option.id)}
      className={cn(
        "transition-all duration-300",
        isActive 
          ? "scale-105 shadow-md" 
          : "opacity-85 hover:opacity-100"
      )}
      title={option.description}
    >
      {option.icon}
      <span className="ml-1">{option.label}</span>
    </UaeButton>
  );
};

export default ThemeToggleOption;
