
// Helper functions for skill gap components

// Get demand level badge color
export const getDemandLevelColor = (level: 'high' | 'medium' | 'low'): string => {
  switch (level) {
    case 'high': return "bg-red-100 text-red-800";
    case 'medium': return "bg-orange-100 text-orange-800";
    case 'low': return "bg-blue-100 text-blue-800";
  }
};
