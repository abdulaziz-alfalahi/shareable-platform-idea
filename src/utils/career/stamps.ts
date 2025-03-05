
import { PassportStamp } from '@/types/student';
import { notifySuccess } from '../notification';

// Award a passport stamp with tiered levels (Bronze, Silver, Gold)
export const awardPassportStamp = async (userId: number, category: string, level: "Bronze" | "Silver" | "Gold" = "Bronze"): Promise<PassportStamp | null> => {
  // This would be a server call in production
  console.log(`Awarding ${level} ${category} stamp to user ${userId}`);
  
  // Create a new stamp with the appropriate level
  const stamp: PassportStamp = {
    id: Math.floor(Math.random() * 10000),
    title: getLeveledTitle(category, level),
    description: getLeveledDescription(category, level),
    category: category as "Workshop" | "Assessment" | "Training" | "Employment" | "Education" | "Skills",
    iconName: getCategoryIcon(category),
    dateEarned: new Date().toISOString().split('T')[0],
    level: level,
    featured: level === "Gold" // Gold stamps are featured by default
  };
  
  // Show success notification
  notifySuccess({
    title: "Achievement Unlocked!",
    description: `You've earned the ${stamp.title} stamp!`
  });
  
  return stamp;
};

// Get a title appropriate for the stamp level
export const getLeveledTitle = (category: string, level: "Bronze" | "Silver" | "Gold"): string => {
  switch (level) {
    case "Bronze":
      return `${category} Explorer`;
    case "Silver":
      return `${category} Specialist`;
    case "Gold":
      return `${category} Master`;
    default:
      return `${category} Achievement`;
  }
};

// Get a description appropriate for the stamp level
export const getLeveledDescription = (category: string, level: "Bronze" | "Silver" | "Gold"): string => {
  switch (level) {
    case "Bronze":
      return `Started your journey in ${category} with basic skills and knowledge.`;
    case "Silver":
      return `Demonstrated intermediate proficiency in ${category} with notable achievements.`;
    case "Gold":
      return `Achieved mastery level in ${category} with outstanding accomplishments.`;
    default:
      return `Recognized for achievements in ${category}.`;
  }
};

// Get appropriate icon based on category
export const getCategoryIcon = (category: string): string => {
  switch (category.toLowerCase()) {
    case "workshop":
      return "star";
    case "assessment":
      return "award";
    case "training":
      return "graduation-cap";
    case "employment":
      return "briefcase";
    case "education":
      return "graduation-cap";
    case "skills":
      return "code";
    default:
      return "award";
  }
};

// Subscribe to passport updates (real-time)
export const subscribeToPassportUpdates = (
  userId: number, 
  callback: (newStamp: PassportStamp) => void
): (() => void) => {
  // This would use Supabase or Firebase real-time subscriptions
  console.log(`Subscribing to passport updates for user ${userId}`);
  
  // For demonstration, we'll just simulate a new stamp after 5 seconds
  const timeoutId = setTimeout(() => {
    const newStamp: PassportStamp = {
      id: Math.floor(Math.random() * 10000),
      title: "Workshop Master",
      description: "Completed a series of industry workshops",
      category: "Workshop",
      iconName: "graduation-cap",
      dateEarned: new Date().toISOString().split('T')[0],
      level: "Silver",
      featured: true
    };
    
    callback(newStamp);
  }, 5000);
  
  // Return a function to unsubscribe
  return () => {
    clearTimeout(timeoutId);
    console.log(`Unsubscribed from passport updates for user ${userId}`);
  };
};

// Share achievement to social media
export const shareAchievementToSocial = (stampTitle: string, platform: "twitter" | "linkedin" | "facebook" = "twitter"): void => {
  const message = encodeURIComponent(`I just earned my "${stampTitle}" stamp on the Emirati Journey platform! #EmiratiJourney #CareerGrowth`);
  const url = encodeURIComponent(window.location.href);
  
  let shareUrl = '';
  
  switch (platform) {
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?text=${message}&url=${url}`;
      break;
    case "linkedin":
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${message}`;
      break;
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${message}`;
      break;
  }
  
  // Open in a new window
  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400');
    
    notifySuccess({
      title: "Shared Successfully",
      description: `Your achievement has been shared to ${platform.charAt(0).toUpperCase() + platform.slice(1)}.`
    });
  }
};
