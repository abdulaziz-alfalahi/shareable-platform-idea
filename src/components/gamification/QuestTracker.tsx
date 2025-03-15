
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Map, CheckCircle2, Clock, Award } from 'lucide-react';
import { useGamification } from '@/contexts/GamificationContext';

export interface Quest {
  id: string;
  title: string;
  description: string;
  steps: {
    id: string;
    title: string;
    description: string;
    pointsReward: number;
    isCompleted: boolean;
  }[];
  reward: {
    title: string;
    description: string;
    points: number;
    iconName: string;
  };
  deadline?: string;
  category: 'career' | 'skills' | 'education' | 'cultural';
}

interface QuestTrackerProps {
  quests: Quest[];
}

const QuestTracker: React.FC<QuestTrackerProps> = ({ quests }) => {
  const { questProgress, updateQuestProgress, addPoints } = useGamification();
  
  const handleCompleteStep = (questId: string, stepId: string, pointsReward: number) => {
    // Mark step as completed
    updateQuestProgress(questId, 100 / quests.find(q => q.id === questId)!.steps.length);
    
    // Award points
    addPoints(pointsReward, `Completed quest step: ${stepId}`);
  };
  
  return (
    <Card className="border-amber-100">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Map className="h-5 w-5 text-amber-500" />
          Quests & Missions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {quests.length === 0 ? (
          <div className="text-center py-6">
            <Award className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No active quests available.</p>
            <Button className="mt-4">Discover Quests</Button>
          </div>
        ) : (
          quests.map(quest => {
            const progress = questProgress[quest.id] || 0;
            const isCompleted = progress === 100;
            
            return (
              <div key={quest.id} className="border rounded-lg overflow-hidden">
                <div className="bg-muted p-3 border-b flex justify-between items-center">
                  <h3 className="font-medium">{quest.title}</h3>
                  {quest.deadline && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(quest.deadline).toLocaleDateString()}
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-4">{quest.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    {quest.steps.map((step, index) => {
                      const stepComplete = step.isCompleted || 
                        (progress >= ((index + 1) / quest.steps.length) * 100);
                      
                      return (
                        <div key={step.id} className="flex items-start gap-3">
                          <div className={`mt-0.5 p-1 rounded-full ${stepComplete ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                            <CheckCircle2 className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className={`text-sm font-medium ${stepComplete ? 'line-through text-muted-foreground' : ''}`}>
                                  {step.title}
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  {step.description}
                                </p>
                              </div>
                              <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded">
                                +{step.pointsReward} pts
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-4 pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Award className="h-4 w-4 text-amber-500 mr-2" />
                        <span className="text-sm font-medium">Reward: {quest.reward.title}</span>
                      </div>
                      <Button 
                        size="sm" 
                        disabled={isCompleted}
                        onClick={() => handleCompleteStep(
                          quest.id, 
                          quest.steps.find(s => !s.isCompleted)?.id || '',
                          quest.steps.find(s => !s.isCompleted)?.pointsReward || 0
                        )}
                      >
                        {isCompleted ? 'Completed' : 'Complete Next Step'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};

export default QuestTracker;
