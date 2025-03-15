
/**
 * Get color based on assessment score
 */
export const getScoreColor = (score: number): string => {
  if (score >= 80) return 'bg-green-100 text-green-800';
  if (score >= 60) return 'bg-blue-100 text-blue-800';
  if (score >= 40) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
};

/**
 * Get label based on assessment score
 */
export const getScoreLabel = (score: number): string => {
  if (score >= 80) return 'Expert';
  if (score >= 60) return 'Advanced';
  if (score >= 40) return 'Intermediate';
  return 'Beginner';
};

/**
 * Get personalized feedback based on score and skill
 */
export const getPersonalizedFeedback = (skill: string, score: number): string => {
  if (score >= 80) {
    return `You demonstrate expertise in ${skill}. Consider mentoring others or pursuing specialized advanced training.`;
  }
  if (score >= 60) {
    return `You show strong capabilities in ${skill}. Focus on specific advanced techniques to reach expert level.`;
  }
  if (score >= 40) {
    return `You have intermediate knowledge of ${skill}. Targeted practice and structured learning will help you advance.`;
  }
  return `You're at a beginning level with ${skill}. A comprehensive foundational course is recommended.`;
};
