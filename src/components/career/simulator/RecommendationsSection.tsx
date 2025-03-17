
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Award, GraduationCap, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkillItemProps {
  skill: string;
  index: number;
}

const SkillItem: React.FC<SkillItemProps> = ({ skill, index }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: index * 0.1 }}
    className="px-3 py-1 rounded-full bg-gradient-to-r from-emirati-sandBeige/20 to-emirati-oasisGreen/10 text-sm font-medium border border-emirati-sandBeige/30 flex items-center gap-1 hover:shadow-md hover:border-emirati-oasisGreen/30 transition-all"
  >
    <span className="w-2 h-2 rounded-full bg-emirati-oasisGreen"></span>
    {skill}
  </motion.div>
);

interface TrainingItemProps {
  training: string;
  index: number;
}

const TrainingItem: React.FC<TrainingItemProps> = ({ training, index }) => (
  <motion.li
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: index * 0.1 }}
    className="flex items-start gap-2 text-sm group"
  >
    <div className="mt-0.5 bg-emirati-oasisGreen/20 p-1 rounded-full group-hover:bg-emirati-oasisGreen/30 transition-colors">
      <Check className="h-3.5 w-3.5 text-emirati-oasisGreen" />
    </div>
    <span className="font-medium group-hover:text-emirati-desertRed/90 transition-colors">{training}</span>
  </motion.li>
);

interface RecommendationCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ 
  title, 
  icon, 
  children,
  className
}) => (
  <Card className={cn("border-emirati-sandBeige/50 overflow-hidden transition-all hover:shadow-md", className)}>
    <CardHeader className="bg-gradient-to-r from-emirati-sandBeige/10 to-transparent border-b border-emirati-sandBeige/20">
      <div className="flex items-center gap-2">
        {icon}
        <CardTitle className="text-lg">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="pt-4">
      {children}
    </CardContent>
  </Card>
);

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
        <h3 className="text-lg font-medium text-emirati-desertRed flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Skills & Training Recommendations
        </h3>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Required Skills Card */}
        <motion.div variants={itemVariants}>
          <RecommendationCard 
            title="Required Skills" 
            icon={<Award className="h-5 w-5 text-emirati-desertRed" />}
          >
            {requiredSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {requiredSkills.map((skill, index) => (
                  <SkillItem key={index} skill={skill} index={index} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground italic">
                No specific skills identified. Please complete an assessment first.
              </p>
            )}
          </RecommendationCard>
        </motion.div>
        
        {/* Recommended Training Card */}
        <motion.div variants={itemVariants}>
          <RecommendationCard 
            title="Recommended Training" 
            icon={<GraduationCap className="h-5 w-5 text-emirati-desertRed" />}
          >
            <ul className="space-y-3">
              {recommendedTraining.map((training, index) => (
                <TrainingItem key={index} training={training} index={index} />
              ))}
              {recommendedTraining.length === 0 && (
                <li className="text-muted-foreground italic">
                  No specific training recommendations available.
                </li>
              )}
            </ul>
          </RecommendationCard>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RecommendationsSection;
