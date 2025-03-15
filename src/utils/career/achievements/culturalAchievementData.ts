
import { CulturalAchievement } from '@/utils/career/types';

// Add categories data
export const culturalAchievementCategories = [
  {
    id: "heritage",
    name: "UAE Heritage",
    description: "Achievements related to UAE's cultural heritage and history"
  },
  {
    id: "innovation",
    name: "Innovation",
    description: "Achievements related to innovation and modern development"
  },
  {
    id: "community",
    name: "Community",
    description: "Achievements related to community service and engagement"
  },
  {
    id: "language",
    name: "Language",
    description: "Achievements related to language proficiency and communication"
  },
  {
    id: "arts",
    name: "Arts & Crafts",
    description: "Achievements related to traditional arts and crafts"
  }
];

export const culturalAchievements: CulturalAchievement[] = [
  {
    id: "heritage-1",
    name: "Heritage Explorer",
    description: "Visit 5 historical sites in the UAE",
    requiredCount: 5,
    category: "heritage",
    iconName: "landmark",
    stampLevel: "Bronze"
  },
  {
    id: "heritage-2",
    name: "History Enthusiast",
    description: "Complete 3 courses on UAE history",
    requiredCount: 3,
    category: "heritage",
    iconName: "book-open",
    stampLevel: "Silver"
  },
  {
    id: "innovation-1",
    name: "Future Thinker",
    description: "Participate in an innovation challenge",
    requiredCount: 1,
    category: "innovation",
    iconName: "lightbulb",
    stampLevel: "Bronze"
  },
  {
    id: "community-1",
    name: "Community Builder",
    description: "Volunteer for 10 hours in community service",
    requiredCount: 10,
    category: "community",
    iconName: "users",
    stampLevel: "Silver"
  },
  {
    id: "language-1",
    name: "Arabic Linguist",
    description: "Reach intermediate level in Arabic language",
    requiredCount: 1,
    category: "language",
    iconName: "message-square",
    stampLevel: "Gold"
  },
  {
    id: "arts-1",
    name: "Cultural Artisan",
    description: "Learn a traditional UAE craft",
    requiredCount: 1,
    category: "arts",
    iconName: "scissors",
    stampLevel: "Bronze"
  }
];
