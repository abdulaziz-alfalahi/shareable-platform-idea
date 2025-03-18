
import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Lightbulb } from 'lucide-react';
import SkillItem from './recommendations/SkillItem';
import TrainingItem from './recommendations/TrainingItem';
import EmptyState from './recommendations/EmptyState';
import RecommendationCard from './recommendations/RecommendationCard';

interface RecommendationsSectionProps {
  requiredSkills: string[];
  recommendedTraining: string[];
}

const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  requiredSkills,
  recommendedTraining
}) => {
  // Animation variants for section container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="space-y-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <h3 className="text-lg font-medium text-emirati-desertRed flex items-center gap-2 mb-3 pb-2 border-b border-emirati-sandBeige/20">
          <Lightbulb className="h-5 w-5" />
          Skills & Training Recommendations
        </h3>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Required Skills Card */}
        <RecommendationCard 
          title="Required Skills" 
          icon={<Award className="h-5 w-5 text-emirati-desertRed" />}
          delay={0.1}
        >
          {requiredSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {requiredSkills.map((skill, index) => (
                <SkillItem key={index} skill={skill} index={index} />
              ))}
            </div>
          ) : (
            <EmptyState message="No specific skills identified. Please complete an assessment first." />
          )}
        </RecommendationCard>
        
        {/* Recommended Training Card */}
        <RecommendationCard 
          title="Recommended Training" 
          icon={<GraduationCap className="h-5 w-5 text-emirati-desertRed" />}
          delay={0.2}
        >
          {recommendedTraining.length > 0 ? (
            <ul className="space-y-3">
              {recommendedTraining.map((training, index) => (
                <TrainingItem key={index} training={training} index={index} />
              ))}
            </ul>
          ) : (
            <EmptyState message="No specific training recommendations available." />
          )}
        </RecommendationCard>
      </div>
    </motion.div>
  );
};

export default RecommendationsSection;
