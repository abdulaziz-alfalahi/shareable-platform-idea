
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Lightbulb, Award, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

interface RecommendationsSectionProps {
  requiredSkills: string[];
  recommendedTraining: string[];
}

const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  requiredSkills,
  recommendedTraining
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-emirati-desertRed">Skills & Training Recommendations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Required Skills Card */}
        <Card className="border-emirati-sandBeige/50 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-emirati-sandBeige/10 to-transparent border-b border-emirati-sandBeige/20">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-emirati-desertRed" />
              <CardTitle className="text-lg">Required Skills</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-wrap gap-2">
              {requiredSkills.map((skill, index) => (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  key={index}
                  className="px-3 py-1 rounded-full bg-emirati-sandBeige/20 text-sm font-medium border border-emirati-sandBeige/30 flex items-center gap-1"
                >
                  <span className="w-2 h-2 rounded-full bg-emirati-oasisGreen"></span>
                  {skill}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Recommended Training Card */}
        <Card className="border-emirati-sandBeige/50 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-emirati-sandBeige/10 to-transparent border-b border-emirati-sandBeige/20">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-emirati-desertRed" />
              <CardTitle className="text-lg">Recommended Training</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-3">
              {recommendedTraining.map((training, index) => (
                <motion.li
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  key={index}
                  className="flex items-start gap-2 text-sm"
                >
                  <div className="mt-0.5 bg-emirati-oasisGreen/20 p-1 rounded-full">
                    <Check className="h-3.5 w-3.5 text-emirati-oasisGreen" />
                  </div>
                  <span className="font-medium">{training}</span>
                </motion.li>
              ))}
              {recommendedTraining.length === 0 && (
                <li className="text-muted-foreground italic">
                  No specific training recommendations available.
                </li>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecommendationsSection;
