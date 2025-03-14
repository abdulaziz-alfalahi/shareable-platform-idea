
# UAE-Themed UI Component Library

This component library provides UAE-inspired UI components that reflect the heritage, culture, and landscapes of the United Arab Emirates. The components are designed to create a cohesive and visually appealing user experience that resonates with the UAE's identity.

## Theme Inspiration

The library draws inspiration from:

- **UAE Flag Colors**: Red, green, white, and black
- **Desert Landscapes**: Various shades of sand and gold
- **Oasis Elements**: Green hues representing palm trees and vegetation
- **Coastal Features**: Blues representing the Arabian Gulf
- **Traditional Patterns**: Geometric and arabesque designs common in Islamic art

## Available Components

### Core Components

- `UaeButton`: Buttons with UAE-themed variants and optional arabesque decorations
- `UaeCard`: Card components with UAE-inspired styling and corner decorations
- `UaeBadge`: Small status indicators with UAE-themed colors
- `UaeAlert`: Notification components for different types of messages
- `UaeDivider`: Decorative dividers with geometric elements
- `UaeDecoContainer`: Decorated containers with patterns and ornate borders
- `UaeStatCard`: Data visualization cards for statistics and metrics

### Using the Components

```jsx
import { 
  UaeButton, 
  UaeCard, 
  UaeCardHeader, 
  UaeCardTitle, 
  UaeCardContent,
  UaeBadge,
  UaeDivider,
  UaeDecoContainer,
  UaeStatCard
} from "@/components/ui/uae";

// Example button usage
<UaeButton variant="desert" size="lg">
  Submit Application
</UaeButton>

// Example card usage
<UaeCard variant="oasis" pattern="corners">
  <UaeCardHeader>
    <UaeCardTitle>Career Opportunities</UaeCardTitle>
  </UaeCardHeader>
  <UaeCardContent>
    <p>Content goes here...</p>
  </UaeCardContent>
</UaeCard>

// Example stat card usage
<UaeStatCard
  variant="desert"
  title="Total Applications"
  value="1,234"
  change="+12.3%"
  trend="up"
  icon={<Icon />}
  description="Applications received this month"
/>
```

## Theme Provider

The library includes a theme provider and a hook to access theme values:

```jsx
import { ThemeProvider, useTheme } from "@/components/ui/uae";

// In your component
const { theme, components } = useTheme();

// Access theme values
const desertSand = theme.colors.desert.medium;
const buttonDesertTheme = components.button.variants.desert;
```

## Variants

Most components support these variants:

- `default`: Standard styling
- `desert`: Sand/gold colors inspired by UAE deserts
- `oasis`: Green colors inspired by UAE oases
- `flag`: Styling based on UAE flag colors
