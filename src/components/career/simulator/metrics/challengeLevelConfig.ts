
import React from 'react';
import { Award, BadgeCheck, Target } from 'lucide-react';

/**
 * Configuration for different challenge levels with associated styling and icons
 */
export const challengeLevelConfig = {
  low: { 
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    icon: <Target className="h-6 w-6 text-emerald-600" />,
    label: 'Low'
  },
  medium: { 
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    icon: <BadgeCheck className="h-6 w-6 text-amber-600" />,
    label: 'Medium'
  },
  high: { 
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    icon: <Award className="h-6 w-6 text-red-600" />,
    label: 'High'
  }
};

export type ChallengeLevel = keyof typeof challengeLevelConfig;
