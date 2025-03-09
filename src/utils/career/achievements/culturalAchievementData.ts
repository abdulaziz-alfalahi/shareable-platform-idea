
import { CulturalAchievement } from '../types';

// Define cultural achievements tied to Emirati heritage
export const culturalAchievements: CulturalAchievement[] = [
  {
    id: "bedouin-resilience",
    name: "Bedouin Resilience",
    description: "Displayed remarkable persistence by completing 10 challenges, embodying the resilience of Bedouin ancestors who thrived in challenging environments.",
    iconName: "palm-tree", // Using palmtree icon
    requiredCount: 10,
    category: "Resilience",
    stampLevel: "Silver"
  },
  {
    id: "falcon-vision",
    name: "Falcon Vision",
    description: "Demonstrated exceptional mentorship by guiding 5 peers, honoring the UAE's reverence for falcons as symbols of vision and guidance.",
    iconName: "eagle", // Using bird icon as replacement
    requiredCount: 5,
    category: "Mentorship",
    stampLevel: "Gold"
  },
  {
    id: "majlis-wisdom",
    name: "Majlis Wisdom",
    description: "Shared knowledge in 3 discussion forums, continuing the tradition of the majlis as a place of community learning and discourse.",
    iconName: "users",
    requiredCount: 3,
    category: "Leadership",
    stampLevel: "Bronze"
  },
  {
    id: "pearl-diver",
    name: "Pearl Diver",
    description: "Discovered valuable opportunities by completing 5 assessment challenges, embodying the spirit of traditional pearl divers who sought treasures beneath the surface.",
    iconName: "gem",
    requiredCount: 5,
    category: "Innovation",
    stampLevel: "Silver"
  },
  {
    id: "desert-navigator",
    name: "Desert Navigator",
    description: "Successfully guided your career journey through 3 major milestones, much like traditional navigators who used stars to cross the vast deserts.",
    iconName: "compass",
    requiredCount: 3,
    category: "Heritage",
    stampLevel: "Bronze"
  }
];
