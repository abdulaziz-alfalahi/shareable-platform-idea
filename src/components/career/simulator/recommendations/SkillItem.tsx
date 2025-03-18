
import React from 'react';
import { motion } from 'framer-motion';

interface SkillItemProps {
  skill: string;
  index: number;
}

const SkillItem: React.FC<SkillItemProps> = ({ skill, index }) => (
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

export default SkillItem;
