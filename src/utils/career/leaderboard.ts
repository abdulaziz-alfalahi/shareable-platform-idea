
// Get leaderboard data 
export const getLeaderboardData = async (category?: string, limit: number = 10): Promise<{name: string, score: number}[]> => {
  // In a real app, this would fetch from the database using the SQL provided
  console.log(`Fetching leaderboard data${category ? ` for ${category}` : ''}, limit: ${limit}`);
  
  // Return mock leaderboard data
  return [
    { name: "Ahmed Al Mansoori", score: 32 },
    { name: "Fatima Al Hashemi", score: 28 },
    { name: "Mohammed Al Marzooqi", score: 25 },
    { name: "Amna Al Suwaidi", score: 23 },
    { name: "Omar Al Shamsi", score: 21 },
    { name: "Mariam Al Zaabi", score: 19 },
    { name: "Saeed Al Dhaheri", score: 18 },
    { name: "Aisha Al Falasi", score: 17 },
    { name: "Ibrahim Al Mazrouei", score: 16 },
    { name: "Sara Al Qubaisi", score: 15 }
  ];
};
