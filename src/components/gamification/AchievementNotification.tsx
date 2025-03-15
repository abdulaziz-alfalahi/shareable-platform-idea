
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PassportStamp } from '@/types/student';

interface AchievementNotificationProps {
  achievement: PassportStamp | null;
  onClose: () => void;
}

const AchievementNotification: React.FC<AchievementNotificationProps> = ({
  achievement,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [achievement]);
  
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for exit animation to complete
  };
  
  if (!achievement) return null;
  
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Gold": return "bg-yellow-500";
      case "Silver": return "bg-slate-400";
      default: return "bg-amber-500";
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 inset-x-0 mx-auto z-50 max-w-md"
        >
          <div className="bg-emirati-sandBeige border-2 border-emirati-desertGold rounded-lg shadow-lg p-4 mx-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`p-2 rounded-full ${getLevelColor(achievement.level)} text-white`}
                >
                  <Award className="h-6 w-6" />
                </motion.div>
                <div>
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="font-bold text-lg"
                  >
                    Achievement Unlocked!
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="font-medium"
                  >
                    {achievement.title}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-sm text-gray-600"
                  >
                    {achievement.description}
                  </motion.p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleClose} className="h-6 w-6">
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 5 }}
              className="h-1 bg-primary mt-2 rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementNotification;
