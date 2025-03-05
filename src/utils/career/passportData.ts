
// Function to fetch student passport data
export const fetchStudentPassportData = async (studentId: number) => {
  // In production, this would be a database query
  console.log(`Fetching passport data for student ${studentId}`);
  
  // Mock implementation for demonstration
  // Simulate a delay to mimic API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Return mock data
  return {
    stamps: [
      {
        id: 1,
        title: "Workshop Completion",
        description: "Completed a career workshop",
        category: "Workshop",
        iconName: "star",
        dateEarned: "2023-01-15",
        level: "Bronze",
        featured: false
      },
      {
        id: 2,
        title: "Assessment Excellence",
        description: "Scored 90%+ on skill assessment",
        category: "Assessment",
        iconName: "award",
        dateEarned: "2023-02-01",
        level: "Silver",
        featured: true
      }
    ],
    totalPoints: 150,
    level: 2,
    recentMilestones: [
      {
        id: 1,
        title: "Workshop Starter",
        description: "Completed first workshop",
        dateAchieved: "2023-01-15",
        points: 50
      }
    ]
  };
};
