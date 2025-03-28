import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, Star, Map, Briefcase, GraduationCap, Code, Share2, Twitter, Linkedin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { PassportStamp } from "@/types/student";
import { notifySuccess } from "@/utils/notification";
import { shareAchievementToSocial } from "@/utils/career";

interface InteractivePassportStampProps {
  stamp: PassportStamp;
}

// Map category to a specific color for visual distinction
const getCategoryColor = (category: string): string => {
  switch (category) {
    case "Workshop":
      return "bg-amber-100 text-amber-800 border-amber-300";
    case "Assessment":
      return "bg-violet-100 text-violet-800 border-violet-300";
    case "Training":
      return "bg-emerald-100 text-emerald-800 border-emerald-300";
    case "Employment":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "Education":
      return "bg-rose-100 text-rose-800 border-rose-300";
    case "Skills":
      return "bg-cyan-100 text-cyan-800 border-cyan-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

// Map level to badge color
const getLevelBadgeColor = (level: string): string => {
  switch (level) {
    case "Bronze":
      return "bg-amber-500";
    case "Silver":
      return "bg-slate-400";
    case "Gold":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
};

// Cached icon components to improve performance
const IconComponents = {
  award: <Award className="h-5 w-5" />,
  star: <Star className="h-5 w-5" />,
  map: <Map className="h-5 w-5" />,
  briefcase: <Briefcase className="h-5 w-5" />,
  "graduation-cap": <GraduationCap className="h-5 w-5" />,
  code: <Code className="h-5 w-5" />
};

// Get icon component with fallback
const getIconComponent = (iconName: string) => {
  return IconComponents[iconName as keyof typeof IconComponents] || IconComponents.award;
};

const InteractivePassportStamp: React.FC<InteractivePassportStampProps> = ({ stamp }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSharingExpanded, setIsSharingExpanded] = useState(false);

  const handleStampClick = () => {
    setIsAnimating(true);
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
      setIsDialogOpen(true);
    }, 500);
  };

  const handleShareAchievement = () => {
    setIsSharingExpanded(!isSharingExpanded);
  };

  const handleShareToSocial = (platform: "twitter" | "linkedin" | "facebook") => {
    shareAchievementToSocial(stamp.title, platform);
    setIsSharingExpanded(false);
  };

  // Animation variants for UAE-inspired animation
  const stampVariants = {
    initial: { scale: 1, rotate: 0 },
    animate: { scale: [1, 1.2, 1], rotate: [0, -10, 0], transition: { duration: 0.5 } }
  };

  // Memoized category color for better performance
  const categoryColor = React.useMemo(() => getCategoryColor(stamp.category), [stamp.category]);
  
  // Memoized level badge color for better performance
  const levelBadgeColor = React.useMemo(() => getLevelBadgeColor(stamp.level), [stamp.level]);

  return (
    <>
      <motion.div
        className={`border-2 rounded-lg p-4 flex items-start space-x-3 cursor-pointer transition-shadow hover:shadow-md ${categoryColor}`}
        onClick={handleStampClick}
        variants={stampVariants}
        initial="initial"
        animate={isAnimating ? "animate" : "initial"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className={`p-2 rounded-full bg-white`}>
          {getIconComponent(stamp.iconName)}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className="font-semibold">{stamp.title}</h4>
            <span className={`px-2 py-0.5 rounded-full text-xs text-white ${levelBadgeColor}`}>
              {stamp.level}
            </span>
          </div>
          <p className="text-sm mt-1 line-clamp-2">{stamp.description}</p>
          <div className="mt-1">
            <span className="text-xs">{stamp.dateEarned}</span>
          </div>
        </div>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{stamp.title}</DialogTitle>
            <DialogDescription>
              Achievement earned on {stamp.dateEarned}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-start space-x-4 mt-4">
            <div className={`p-3 rounded-full ${categoryColor}`}>
              {getIconComponent(stamp.iconName)}
            </div>
            <div>
              <div className="mb-2">
                <span className={`px-2 py-0.5 rounded-full text-xs text-white ${levelBadgeColor}`}>
                  {stamp.level} Level
                </span>
                <span className="ml-2 text-sm text-muted-foreground">{stamp.category}</span>
              </div>
              <p className="text-sm">{stamp.description}</p>
              <div className="mt-4 p-3 bg-muted rounded-md">
                <h4 className="text-sm font-medium">Skill Points Earned</h4>
                <div className="flex justify-between items-center mt-1">
                  <span>+{stamp.level === "Gold" ? 100 : stamp.level === "Silver" ? 50 : 25} points</span>
                  <Award className="h-4 w-4 text-yellow-500" />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="sm:justify-between flex-col sm:flex-row">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDialogOpen(false)}
            >
              Close
            </Button>
            <div className="relative">
              <Button
                size="sm"
                onClick={handleShareAchievement}
                className="flex items-center"
              >
                <Share2 className="h-4 w-4 mr-1" /> Share Achievement
              </Button>
              
              {isSharingExpanded && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 p-2 bg-white rounded-md shadow-lg z-10 flex space-x-2"
                >
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleShareToSocial("twitter")}
                    className="flex items-center"
                  >
                    <Twitter className="h-4 w-4 mr-1 text-blue-400" />
                    X
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleShareToSocial("linkedin")}
                    className="flex items-center"
                  >
                    <Linkedin className="h-4 w-4 mr-1 text-blue-600" />
                    LinkedIn
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleShareToSocial("facebook")}
                    className="flex items-center"
                  >
                    <Facebook className="h-4 w-4 mr-1 text-blue-500" />
                    Facebook
                  </Button>
                </motion.div>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default React.memo(InteractivePassportStamp);
