
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { SimulationResult } from '@/utils/career/pathwayTypes';
import ResultsMetrics from './ResultsMetrics';
import RecommendationsSection from './RecommendationsSection';
import { motion } from 'framer-motion';

interface SimulationResultsProps {
  simulationResult: SimulationResult;
  onModifyPath: () => void;
}

const SimulationResults: React.FC<SimulationResultsProps> = ({
  simulationResult,
  onModifyPath
}) => {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Summary Panel */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-emirati-sandBeige/20 to-emirati-oasisGreen/10 p-6 rounded-lg border border-emirati-sandBeige/30">
        <h3 className="text-xl font-semibold text-emirati-desertRed mb-2">Pathway Simulation Summary</h3>
        <p className="text-muted-foreground">
          Based on your career path selections, here are the projected outcomes and recommendations.
        </p>
      </motion.div>
      
      {/* Key Metrics Section */}
      <motion.div variants={itemVariants}>
        <ResultsMetrics 
          timeToComplete={simulationResult.timeToComplete}
          potentialSalary={simulationResult.potentialSalary}
          challengeLevel={simulationResult.challengeLevel}
        />
      </motion.div>
      
      {/* Recommendations Section */}
      <motion.div variants={itemVariants}>
        <RecommendationsSection 
          requiredSkills={simulationResult.requiredSkills}
          recommendedTraining={simulationResult.recommendedTraining}
        />
      </motion.div>
      
      {/* Actions Section */}
      <motion.div variants={itemVariants} className="flex justify-between pt-4 border-t border-emirati-sandBeige/30">
        <Button
          variant="outline"
          onClick={onModifyPath}
          className="border-emirati-desertRed text-emirati-desertRed hover:bg-emirati-desertRed/10"
        >
          Modify Career Path
        </Button>
        <Button
          onClick={() => navigate('/training-centers')}
          className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
        >
          Explore Training Options
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default SimulationResults;
