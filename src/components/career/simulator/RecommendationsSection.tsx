
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Award, GraduationCap, Lightbulb, BookOpen, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Separate SkillItem component with improved styling
const SkillItem = ({ skill, index }: { skill: string; index: number }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: index * 0.1, duration: 0.3 }}
    className="px-3 py-1.5 rounded-full bg-gradient-to-r from-emirati-sandBeige/20 to-emirati-oasisGreen/10 
      text-sm font-medium border border-emirati-sandBeige/30 flex items-center gap-1.5 
      hover:shadow-md hover:border-emirati-oasisGreen/40 hover:bg-gradient-to-r hover:from-emirati-sandBeige/30 
      hover:to-emirati-oasisGreen/20 transition-all duration-300"
  >
    <span className="w-2 h-2 rounded-full bg-emirati-oasisGreen"></span>
    {skill}
  </motion.div>
);

// Enhanced TrainingItem with hover effects and cleaner styling
const TrainingItem = ({ training, index }: { training: string; index: number }) => (
  <motion.li
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: index * 0.1, duration: 0.3 }}
    className="flex items-start gap-2.5 text-sm group mb-2 last:mb-0"
  >
    <div className="mt-0.5 bg-emirati-oasisGreen/20 p-1 rounded-full group-hover:bg-emirati-oasisGreen/30 
      transition-colors duration-300">
      <Check className="h-3.5 w-3.5 text-emirati-oasisGreen" />
    </div>
    <span className="font-medium group-hover:text-emirati-desertRed/90 transition-colors duration-300">
      {training}
    </span>
  </motion.li>
);

// Extracted EmptyState component for better reusability
const EmptyState = ({ message }: { message: string }) => (
  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-muted-foreground italic text-sm flex items-center gap-2"
  >
    <BookOpen className="h-4 w-4 text-muted-foreground" />
    {message}
  </motion.p>
);

// Enhanced RecommendationCard component with consistent styling
interface RecommendationCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ 
  title, 
  icon, 
  children,
  className,
  delay = 0
}) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay, duration: 0.4 }}
    className="h-full"
  >
    <Card className={cn(
      "border-emirati-sandBeige/50 overflow-hidden transition-all duration-300 h-full",
      "hover:shadow-md hover:border-emirati-sandBeige/70",
      className
    )}>
      <CardHeader className="bg-gradient-to-r from-emirati-sandBeige/10 to-transparent border-b border-emirati-sandBeige/20 pb-3">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {children}
      </CardContent>
    </Card>
  </motion.div>
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
