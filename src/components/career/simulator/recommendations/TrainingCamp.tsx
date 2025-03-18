
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Flame } from 'lucide-react';

interface TrainingCampProps {
  name: string;
  provider: string;
  date: string;
  duration: string;
  index: number;
}

const TrainingCamp: React.FC<TrainingCampProps> = ({ name, provider, date, duration, index }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: index * 0.1, duration: 0.3 }}
    className="p-3 rounded-md bg-gradient-to-r from-emirati-sandBeige/20 to-emirati-desertGold/20 
      border border-emirati-desertGold/30 hover:shadow-md hover:border-emirati-desertGold/60 
      transition-all duration-300 space-y-2"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Flame className="h-4 w-4 text-emirati-oasisGreen" />
        <h4 className="font-medium text-emirati-deepBrown">{name}</h4>
      </div>
      <span className="text-xs bg-emirati-oasisGreen/20 text-emirati-oasisGreen px-2 py-0.5 rounded-full">Summer Camp</span>
    </div>
    <div className="text-sm text-muted-foreground">{provider}</div>
    <div className="flex items-center justify-between text-xs text-muted-foreground">
      <div className="flex items-center gap-1">
        <Calendar className="h-3 w-3" />
        <span>{date}</span>
      </div>
      <span>{duration}</span>
    </div>
  </motion.div>
);

export default TrainingCamp;
