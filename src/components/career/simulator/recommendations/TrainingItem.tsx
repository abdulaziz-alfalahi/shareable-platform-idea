
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface TrainingItemProps {
  training: string;
  index: number;
}

const TrainingItem: React.FC<TrainingItemProps> = ({ training, index }) => (
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

export default TrainingItem;
