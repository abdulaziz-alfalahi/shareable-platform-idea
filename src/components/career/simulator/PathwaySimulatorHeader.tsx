
import React from 'react';
import { CardTitle, CardDescription } from '@/components/ui/card';

const PathwaySimulatorHeader: React.FC = () => {
  return (
    <>
      <CardTitle className="text-2xl font-bold text-emirati-desertRed">
        Career Pathway Simulator
      </CardTitle>
      <CardDescription>
        Explore different career paths and visualize your journey to success
      </CardDescription>
    </>
  );
};

export default PathwaySimulatorHeader;
