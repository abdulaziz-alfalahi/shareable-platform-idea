
/**
 * Type definitions for skill gap analysis
 */

// Define skill gap types
export interface SkillGap {
  skill: string;
  demandLevel: 'high' | 'medium' | 'low';
  relevanceScore: number; // 0-100
  suggestedTraining: TrainingRecommendation[];
}

export interface TrainingRecommendation {
  id: string;
  title: string;
  provider: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  format: 'online' | 'in-person' | 'hybrid';
  url?: string;
}

// UAE job market trend type
export interface JobMarketTrend {
  skill: string;
  growth: number;
  priority: 'high' | 'medium' | 'low';
  sector: string;
}
