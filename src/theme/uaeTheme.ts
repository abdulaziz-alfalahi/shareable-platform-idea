
/**
 * UAE-inspired theme configuration with colors reflecting the nation's heritage
 * and natural landscape: desert sands, oasis greens, and coastal blues.
 */

export const uaeTheme = {
  colors: {
    // Primary palette inspired by UAE flag
    primary: {
      red: "#EF4135", // UAE flag red
      green: "#009736", // UAE flag green
      white: "#FFFFFF", // UAE flag white
      black: "#000000", // UAE flag black
    },
    // Natural UAE landscape colors
    desert: {
      light: "#F5E8C7", // Light sand
      medium: "#E6CCAB", // Medium sand
      dark: "#D4A373", // Dark sand/gold
      accent: "#CB8A58", // Desert sunset
    },
    oasis: {
      light: "#DAF1DE", // Light foliage
      medium: "#7EA98E", // Medium foliage
      dark: "#2C4A2E", // Deep foliage
      accent: "#5B8C5A", // Lush palm
    },
    sea: {
      light: "#E0F2F7", // Light coastal waters
      medium: "#A9CADE", // Medium coastal waters
      dark: "#4A88B3", // Deep gulf waters
      accent: "#1A5B92", // Deep sea
    },
    neutral: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#E5E5E5",
      300: "#D4D4D4",
      400: "#A3A3A3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
    },
  },
  // Traditional geometric patterns for borders, dividers, etc.
  patterns: {
    geometric: "repeating-linear-gradient(45deg, #0001, #0001 5px, transparent 5px, transparent 15px)",
    arabesque: "url('/patterns/arabesque.svg')",
    mashrabiya: "url('/patterns/mashrabiya.svg')",
  },
  // Fonts pairing traditional Arabic with modern sans-serif
  fonts: {
    heading: "'Amiri', 'Scheherazade New', serif",
    body: "'Tajawal', 'Dubai', sans-serif",
    decorative: "'Aref Ruqaa', serif",
  },
  // Border radius for different components
  radii: {
    none: "0",
    sm: "0.125rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px",
  },
  // Shadows with a slight golden/warm tint
  shadows: {
    sm: "0 1px 2px 0 rgba(203, 138, 88, 0.05)",
    md: "0 4px 6px -1px rgba(203, 138, 88, 0.1), 0 2px 4px -1px rgba(203, 138, 88, 0.06)",
    lg: "0 10px 15px -3px rgba(203, 138, 88, 0.1), 0 4px 6px -2px rgba(203, 138, 88, 0.05)",
    xl: "0 20px 25px -5px rgba(203, 138, 88, 0.1), 0 10px 10px -5px rgba(203, 138, 88, 0.04)",
  },
};

// Component-specific theme configurations
export const componentThemes = {
  button: {
    // Button variants inspired by UAE landscapes and flag colors
    variants: {
      desert: {
        backgroundColor: uaeTheme.colors.desert.medium,
        hoverBackgroundColor: uaeTheme.colors.desert.dark,
        textColor: uaeTheme.colors.neutral[800],
        borderColor: uaeTheme.colors.desert.dark,
      },
      oasis: {
        backgroundColor: uaeTheme.colors.oasis.dark,
        hoverBackgroundColor: uaeTheme.colors.oasis.accent,
        textColor: uaeTheme.colors.neutral[50],
        borderColor: uaeTheme.colors.oasis.dark,
      },
      sea: {
        backgroundColor: uaeTheme.colors.sea.dark,
        hoverBackgroundColor: uaeTheme.colors.sea.accent,
        textColor: uaeTheme.colors.neutral[50],
        borderColor: uaeTheme.colors.sea.dark,
      },
      flag: {
        backgroundColor: uaeTheme.colors.primary.red,
        hoverBackgroundColor: "#c93029", // Darker red
        textColor: uaeTheme.colors.primary.white,
        borderColor: uaeTheme.colors.primary.red,
      },
      outline: {
        backgroundColor: "transparent",
        hoverBackgroundColor: uaeTheme.colors.neutral[100],
        textColor: uaeTheme.colors.neutral[800],
        borderColor: uaeTheme.colors.neutral[300],
      },
      ghost: {
        backgroundColor: "transparent",
        hoverBackgroundColor: uaeTheme.colors.neutral[100],
        textColor: uaeTheme.colors.neutral[800],
        borderColor: "transparent",
      },
    },
    // Button sizes
    sizes: {
      sm: {
        paddingX: "0.75rem",
        paddingY: "0.375rem",
        fontSize: "0.875rem",
        borderRadius: uaeTheme.radii.md,
      },
      md: {
        paddingX: "1rem",
        paddingY: "0.5rem",
        fontSize: "1rem",
        borderRadius: uaeTheme.radii.md,
      },
      lg: {
        paddingX: "1.5rem",
        paddingY: "0.75rem",
        fontSize: "1.125rem",
        borderRadius: uaeTheme.radii.lg,
      },
    },
  },
  card: {
    variants: {
      default: {
        backgroundColor: uaeTheme.colors.neutral[50],
        borderColor: uaeTheme.colors.neutral[200],
        shadowColor: uaeTheme.shadows.md,
      },
      desert: {
        backgroundColor: uaeTheme.colors.desert.light,
        borderColor: uaeTheme.colors.desert.medium,
        shadowColor: uaeTheme.shadows.md,
      },
      oasis: {
        backgroundColor: uaeTheme.colors.oasis.light,
        borderColor: uaeTheme.colors.oasis.medium,
        shadowColor: uaeTheme.shadows.md,
      },
      flag: {
        backgroundColor: uaeTheme.colors.primary.white,
        borderColor: uaeTheme.colors.primary.red,
        shadowColor: uaeTheme.shadows.md,
      },
    },
  },
  // ... Add other component themes as needed
};

export default uaeTheme;
