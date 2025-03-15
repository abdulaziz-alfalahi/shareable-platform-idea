
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Gift, 
  Ticket, 
  Medal, 
  Award, 
  Heart, 
  BookOpen, 
  Coffee 
} from 'lucide-react';
import { useGamification } from '@/contexts/GamificationContext';
import { motion } from 'framer-motion';

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  category: 'virtual' | 'physical' | 'experience';
  iconName: string;
  available: boolean;
}

const RewardShop: React.FC = () => {
  const { points, redeemReward } = useGamification();
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [redeemingReward, setRedeemingReward] = useState(false);
  const [redemptionSuccess, setRedemptionSuccess] = useState(false);
  
  const rewards: Reward[] = [
    {
      id: 'virtual-badge-1',
      title: 'Premium Profile Badge',
      description: 'Show off your achievements with this exclusive badge on your profile.',
      points: 100,
      category: 'virtual',
      iconName: 'award',
      available: true
    },
    {
      id: 'exp-mentorship-1',
      title: 'Executive Mentorship Session',
      description: 'One-on-one mentorship session with an industry executive.',
      points: 500,
      category: 'experience',
      iconName: 'users',
      available: true
    },
    {
      id: 'physical-coffeecard-1',
      title: 'Coffee Card',
      description: 'A gift card for your favorite coffee shop.',
      points: 300,
      category: 'physical',
      iconName: 'coffee',
      available: true
    },
    {
      id: 'virtual-certificate-1',
      title: 'Skill Certificate',
      description: 'A shareable certificate recognizing your skill mastery.',
      points: 200,
      category: 'virtual',
      iconName: 'file',
      available: true
    },
    {
      id: 'exp-workshop-1',
      title: 'Exclusive Workshop Access',
      description: 'Access to a premium industry workshop.',
      points: 400,
      category: 'experience',
      iconName: 'book',
      available: true
    },
    {
      id: 'physical-notebook-1',
      title: 'Premium Notebook',
      description: 'A high-quality notebook with UAE-inspired design.',
      points: 250,
      category: 'physical',
      iconName: 'book-open',
      available: true
    },
  ];
  
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'award': return <Award />;
      case 'users': return <Medal />;
      case 'coffee': return <Coffee />;
      case 'file': return <Ticket />;
      case 'book': return <BookOpen />;
      case 'book-open': return <BookOpen />;
      default: return <Gift />;
    }
  };
  
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'virtual': return 'Digital Reward';
      case 'physical': return 'Physical Item';
      case 'experience': return 'Experience';
      default: return 'Reward';
    }
  };

  const handleSelectReward = (reward: Reward) => {
    setSelectedReward(reward);
    setRedemptionSuccess(false);
    setIsDialogOpen(true);
  };
  
  const handleRedeemReward = async () => {
    if (!selectedReward) return;
    
    setRedeemingReward(true);
    
    try {
      const success = await redeemReward(selectedReward.id, selectedReward.points);
      if (success) {
        setRedemptionSuccess(true);
      }
    } catch (error) {
      console.error('Error redeeming reward:', error);
    } finally {
      setRedeemingReward(false);
    }
  };
  
  const canAfford = (rewardPoints: number) => points >= rewardPoints;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Gift className="h-5 w-5 text-pink-500" />
            Rewards Shop
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Redeem your points for exclusive rewards
            </p>
            <div className="bg-amber-50 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
              {points} points available
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rewards.map((reward) => (
              <motion.div 
                key={reward.id}
                whileHover={{ scale: 1.02 }}
                className={`border rounded-lg p-4 ${canAfford(reward.points) 
                  ? 'cursor-pointer hover:border-primary' 
                  : 'opacity-60'
                }`}
                onClick={() => canAfford(reward.points) && handleSelectReward(reward)}
              >
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-full bg-primary/10">
                    {getIconComponent(reward.iconName)}
                  </div>
                  <span className="text-sm font-semibold">
                    {reward.points} pts
                  </span>
                </div>
                
                <h3 className="font-medium mt-3">{reward.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {reward.description}
                </p>
                
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                    {getCategoryLabel(reward.category)}
                  </span>
                  
                  {!canAfford(reward.points) && (
                    <span className="text-xs text-red-500">
                      Need {reward.points - points} more points
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {redemptionSuccess 
                ? "Redemption Successful!" 
                : `Redeem ${selectedReward?.title}`}
            </DialogTitle>
            <DialogDescription>
              {redemptionSuccess 
                ? "Your reward has been redeemed successfully." 
                : `This will cost you ${selectedReward?.points} points.`}
            </DialogDescription>
          </DialogHeader>
          
          {redemptionSuccess ? (
            <div className="py-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4"
              >
                <Heart className="h-8 w-8" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">Thank You!</h3>
              <p className="text-muted-foreground">
                Your reward has been added to your account. Check your notifications for details on how to claim it.
              </p>
            </div>
          ) : (
            <div className="py-4">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 rounded-full bg-primary/10">
                  {selectedReward && getIconComponent(selectedReward.iconName)}
                </div>
                <div>
                  <h3 className="font-medium">{selectedReward?.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedReward?.description}
                  </p>
                </div>
              </div>
              
              <div className="bg-muted p-3 rounded-md text-sm">
                <p className="flex justify-between">
                  <span>Your points:</span>
                  <span>{points}</span>
                </p>
                <p className="flex justify-between text-red-500">
                  <span>Cost:</span>
                  <span>-{selectedReward?.points}</span>
                </p>
                <div className="border-t my-2"></div>
                <p className="flex justify-between font-medium">
                  <span>Remaining:</span>
                  <span>{points - (selectedReward?.points || 0)}</span>
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            {redemptionSuccess ? (
              <Button onClick={() => setIsDialogOpen(false)}>
                Close
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleRedeemReward}
                  disabled={redeemingReward}
                >
                  {redeemingReward ? "Processing..." : "Confirm Redemption"}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RewardShop;
