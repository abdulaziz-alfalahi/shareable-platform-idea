
import { Sun, Moon, TreePalm, Building, Star } from "lucide-react";
import { UaeTheme } from "./ThemeContext";
import React from "react";

export interface ThemeOption {
  id: UaeTheme;
  icon: React.ReactNode;
  label: string;
  description?: string;
}

export const themeOptions: ThemeOption[] = [
  { 
    id: "default" as UaeTheme, 
    icon: React.createElement(Sun, { className: "h-4 w-4" }), 
    label: "Default",
    description: "Modern UAE interface with clean design" 
  },
  { 
    id: "desert" as UaeTheme, 
    icon: React.createElement(TreePalm, { className: "h-4 w-4" }), 
    label: "Desert",
    description: "Warm sand tones inspired by UAE deserts" 
  },
  { 
    id: "oasis" as UaeTheme, 
    icon: React.createElement(Moon, { className: "h-4 w-4" }), 
    label: "Oasis",
    description: "Refreshing green shades of Emirati oases" 
  },
  { 
    id: "modern" as UaeTheme, 
    icon: React.createElement(Building, { className: "h-4 w-4" }), 
    label: "Modern",
    description: "Contemporary style reflecting UAE's innovation" 
  },
  { 
    id: "premium" as UaeTheme, 
    icon: React.createElement(Star, { className: "h-4 w-4" }), 
    label: "Premium",
    description: "Elegant premium design with gold accents" 
  }
];
