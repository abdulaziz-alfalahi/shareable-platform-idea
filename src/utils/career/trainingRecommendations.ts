
// Helper function to generate training recommendations
export const generateRecommendedTraining = (skills: string[]): string[] => {
  // In a real implementation, this would use an AI recommendation system
  // For now, we'll use a simplified mapping
  const trainingMap: Record<string, string> = {
    'Data Analysis': 'Advanced Data Analytics with Python',
    'Leadership': 'Strategic Leadership for UAE Professionals',
    'Project Management': 'PMP Certification Course',
    'Programming': 'Full-Stack Development Bootcamp',
    'Communication': 'Business Communication Masterclass',
    'AI': 'Artificial Intelligence Fundamentals',
    'Blockchain': 'Blockchain Applications in Finance',
    'Cloud Computing': 'AWS Solutions Architect Training',
    'Digital Marketing': 'Digital Marketing Certification',
    'Financial Analysis': 'Financial Modeling & Valuation',
    'Healthcare Management': 'Healthcare Administration Certificate',
    'Cybersecurity': 'Certified Information Systems Security Professional (CISSP)',
    'Renewable Energy': 'Sustainable Energy Solutions Course',
    'UX Design': 'User Experience Design Certificate'
  };
  
  return skills
    .filter(skill => trainingMap[skill])
    .map(skill => trainingMap[skill])
    .slice(0, 3); // Return top 3 recommendations
};
