
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Student } from '@/types/student';
import { PathwaySimulatorProvider } from './simulator/PathwaySimulatorContext';
import PathwaySimulatorHeader from './simulator/PathwaySimulatorHeader';
import PathwaySimulatorTabs from './simulator/PathwaySimulatorTabs';

interface PathwaySimulatorProps {
  student: Student;
}

const PathwaySimulator: React.FC<PathwaySimulatorProps> = ({ student }) => {
  const [activeTab, setActiveTab] = useState('path-selection');
  
  return (
    <PathwaySimulatorProvider student={student}>
      <Card className="border-emirati-sandBeige">
        <CardHeader className="border-b border-emirati-sandBeige/20 bg-emirati-sandBeige/10">
          <PathwaySimulatorHeader />
        </CardHeader>
        <CardContent className="p-6">
          <PathwaySimulatorTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </CardContent>
      </Card>
    </PathwaySimulatorProvider>
  );
};

export default PathwaySimulator;
