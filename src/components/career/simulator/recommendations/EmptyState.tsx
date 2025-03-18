
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => (
  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-muted-foreground italic text-sm flex items-center gap-2"
  >
    <BookOpen className="h-4 w-4 text-muted-foreground" />
    {message}
  </motion.p>
);

export default EmptyState;
