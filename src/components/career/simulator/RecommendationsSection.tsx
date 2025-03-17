
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface RecommendationsSectionProps {
  requiredSkills: string[];
  recommendedTraining: string[];
}

const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  requiredSkills,
  recommendedTraining
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Required Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {requiredSkills.map((skill, index) => (
              <div
                key={index}
                className="px-3 py-1 rounded-full bg-emirati-sandBeige/20 text-sm"
              >
                {skill}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recommended Training</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {recommendedTraining.map((training, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm"
              >
                <Check className="h-4 w-4 text-emirati-oasisGreen mt-0.5" />
                {training}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecommendationsSection;
