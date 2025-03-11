
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';

interface RetirementRecommendationsProps {
  recommendations: string[];
}

const RetirementRecommendations: React.FC<RetirementRecommendationsProps> = ({
  recommendations
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {recommendations.map((recommendation, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm"
            >
              <Heart className="h-4 w-4 text-emirati-oasisGreen mt-0.5" />
              {recommendation}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RetirementRecommendations;
