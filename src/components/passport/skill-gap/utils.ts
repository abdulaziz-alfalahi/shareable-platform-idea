
/**
 * Helper functions for skill gap analysis display
 */

/**
 * Get appropriate color class for skill demand level
 */
export const getDemandLevelColor = (level: 'high' | 'medium' | 'low'): string => {
  switch (level) {
    case 'high':
      return 'bg-emirati-oasisGreen text-white';
    case 'medium':
      return 'bg-emirati-desertGold text-white';
    case 'low':
      return 'bg-emirati-camelBrown/50 text-white';
    default:
      return 'bg-gray-200 text-gray-700';
  }
};

/**
 * Get appropriate color for skill gap progress bar
 */
export const getSkillRelevanceColor = (score: number): string => {
  if (score >= 75) return 'bg-emirati-oasisGreen';
  if (score >= 50) return 'bg-emirati-desertGold';
  return 'bg-emirati-camelBrown';
};

/**
 * Format skill level for display
 */
export const formatSkillLevel = (level: string): string => {
  return level.charAt(0).toUpperCase() + level.slice(1);
};

/**
 * Get icon for training format
 */
export const getTrainingFormatLabel = (format: 'online' | 'in-person' | 'hybrid'): string => {
  switch (format) {
    case 'online': return 'Online Course';
    case 'in-person': return 'In-Person Training';
    case 'hybrid': return 'Hybrid Program';
  }
};
