
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Loader2 } from 'lucide-react';

interface SimulationButtonProps {
  isSimulating: boolean;
  canRunSimulation: boolean;
  runSimulation: () => void;
}

const SimulationButton: React.FC<SimulationButtonProps> = ({
  isSimulating,
  canRunSimulation,
  runSimulation
}) => {
  return (
    <div className="flex justify-end mt-6">
      <Button
        onClick={runSimulation}
        disabled={!canRunSimulation}
        className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
      >
        {isSimulating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Simulating...
          </>
        ) : (
          <>
            Run Simulation
            <ChevronRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};

export default SimulationButton;
