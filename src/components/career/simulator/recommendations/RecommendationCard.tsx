
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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

export default RecommendationCard;
