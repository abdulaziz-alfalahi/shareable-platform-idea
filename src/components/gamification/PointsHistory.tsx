
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpCircle, ArrowDownCircle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useGamification } from '@/contexts/GamificationContext';

const PointsHistory: React.FC = () => {
  const { pointsHistory } = useGamification();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Points History</CardTitle>
      </CardHeader>
      <CardContent>
        {pointsHistory.length === 0 ? (
          <div className="text-center py-6">
            <Clock className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No points history yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pointsHistory.map((entry, index) => (
              <div key={index} className="flex items-start justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    entry.points > 0 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {entry.points > 0 
                      ? <ArrowUpCircle className="h-4 w-4" /> 
                      : <ArrowDownCircle className="h-4 w-4" />
                    }
                  </div>
                  <div>
                    <p className="font-medium">{entry.reason}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(entry.date), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <span className={`font-semibold ${
                  entry.points > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {entry.points > 0 ? '+' : ''}{entry.points}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PointsHistory;
