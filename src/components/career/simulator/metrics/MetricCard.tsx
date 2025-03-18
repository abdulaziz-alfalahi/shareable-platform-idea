
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: React.ReactNode;
  description: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  delay: number;
}

/**
 * MetricCard - A reusable animated card component for displaying metrics 
 * with customizable styling and animation delays
 */
const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  title,
  value,
  description,
  bgColor,
  borderColor,
  textColor,
  delay
}) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay, duration: 0.4, ease: "easeOut" }}
    className="h-full"
  >
    <Card className="border-emirati-sandBeige/50 h-full shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className={cn("rounded-full p-3 mb-3 flex items-center justify-center", bgColor, borderColor)}>
          {icon}
        </div>
        <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
        <p className={cn("text-2xl font-bold", textColor)}>{value}</p>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

export default MetricCard;
