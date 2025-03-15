
import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  GraduationCap, 
  Briefcase, 
  Building, 
  User, 
  ChevronRight, 
  CheckCircle, 
  Target 
} from "lucide-react";
import { UserRole } from "@/components/notifications/RoleNotifications";

// Steps in the onboarding process
const STEPS = [
  "profile", 
  "role", 
  "interests", 
  "goals", 
  "complete"
];

interface RoleOption {
  id: UserRole;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const roleOptions: RoleOption[] = [
  {
    id: "student",
    name: "Student",
    icon: <GraduationCap className="w-8 h-8 text-emirati-oasisGreen" />,
    description: "Find your career path, build skills, and connect with mentors"
  },
  {
    id: "recruiter",
    name: "Recruiter",
    icon: <Briefcase className="w-8 h-8 text-emirati-desertRed" />,
    description: "Find qualified Emirati talent for your organization"
  },
  {
    id: "advisor",
    name: "Career Advisor",
    icon: <Target className="w-8 h-8 text-emirati-desertGold" />,
    description: "Guide students and professionals in their career journey"
  },
  {
    id: "training",
    name: "Training Institute",
    icon: <Building className="w-8 h-8 text-emirati-camelBrown" />,
    description: "Offer training programs to upskill Emirati workforce"
  },
  {
    id: "parent",
    name: "Parent",
    icon: <User className="w-8 h-8 text-emirati-linkedinBlue" />,
    description: "Support and monitor your child's educational journey"
  }
];

interface InterestOption {
  id: string;
  name: string;
}

const interestOptions: InterestOption[] = [
  { id: "technology", name: "Technology & Innovation" },
  { id: "business", name: "Business & Finance" },
  { id: "government", name: "Government Services" },
  { id: "education", name: "Education & Research" },
  { id: "energy", name: "Energy & Sustainability" },
  { id: "healthcare", name: "Healthcare & Sciences" },
  { id: "tourism", name: "Tourism & Hospitality" },
  { id: "engineering", name: "Engineering & Construction" },
  { id: "arts", name: "Arts & Culture" },
  { id: "aerospace", name: "Aerospace & Defense" }
];

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

export interface OnboardingData {
  role: UserRole;
  name: string;
  interests: string[];
  goals: string[];
  profileImage?: string;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    role: "student",
    name: "",
    interests: [],
    goals: [],
  });
  
  const progress = ((currentStep + 1) / STEPS.length) * 100;
  
  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleComplete = () => {
    onComplete(data);
  };

  const handleRoleSelect = (role: UserRole) => {
    setData({ ...data, role });
    handleNext();
  };
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, name: e.target.value });
  };
  
  const toggleInterest = (interestId: string) => {
    if (data.interests.includes(interestId)) {
      setData({
        ...data,
        interests: data.interests.filter(id => id !== interestId)
      });
    } else {
      setData({
        ...data,
        interests: [...data.interests, interestId]
      });
    }
  };
  
  const handleAddGoal = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      setData({
        ...data, 
        goals: [...data.goals, e.currentTarget.value.trim()]
      });
      e.currentTarget.value = '';
    }
  };
  
  const handleRemoveGoal = (index: number) => {
    setData({
      ...data,
      goals: data.goals.filter((_, i) => i !== index)
    });
  };
  
  const renderStep = () => {
    switch (STEPS[currentStep]) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-emirati-desertRed text-center">Welcome to Emirati Journey</h2>
            <p className="text-center text-muted-foreground">Let's set up your profile to get started.</p>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={data.name} 
                  onChange={handleNameChange}
                  className="w-full px-4 py-2 border border-emirati-sandBeige rounded-md focus:outline-none focus:ring-2 focus:ring-emirati-oasisGreen"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={handleNext} 
                  disabled={!data.name.trim()}
                  className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
                >
                  Continue <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        );
        
      case 'role':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-emirati-desertRed text-center">Choose Your Role</h2>
            <p className="text-center text-muted-foreground">Select the role that best describes you.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {roleOptions.map((role) => (
                <div 
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    data.role === role.id 
                      ? 'border-emirati-oasisGreen bg-emirati-sandBeige/10' 
                      : 'border-emirati-sandBeige hover:border-emirati-desertGold'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div>{role.icon}</div>
                    <div>
                      <h3 className="font-semibold">{role.name}</h3>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button 
                onClick={handleNext}
                className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
              >
                Continue <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
        
      case 'interests':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-emirati-desertRed text-center">Areas of Interest</h2>
            <p className="text-center text-muted-foreground">Select sectors or fields that interest you most.</p>
            
            <div className="flex flex-wrap gap-3 mt-6">
              {interestOptions.map((interest) => (
                <div 
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`px-4 py-2 rounded-full cursor-pointer transition-all ${
                    data.interests.includes(interest.id)
                      ? 'bg-emirati-oasisGreen text-white' 
                      : 'bg-emirati-sandBeige/20 hover:bg-emirati-sandBeige/40'
                  }`}
                >
                  {interest.name}
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button 
                onClick={handleNext}
                disabled={data.interests.length === 0}
                className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
              >
                Continue <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
        
      case 'goals':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-emirati-desertRed text-center">Your Career Goals</h2>
            <p className="text-center text-muted-foreground">What do you hope to achieve in your career journey?</p>
            
            <div className="space-y-4 mt-6">
              <div>
                <label htmlFor="goal" className="block text-sm font-medium mb-1">Add a goal (press Enter to add)</label>
                <input 
                  type="text" 
                  id="goal" 
                  onKeyDown={handleAddGoal}
                  className="w-full px-4 py-2 border border-emirati-sandBeige rounded-md focus:outline-none focus:ring-2 focus:ring-emirati-oasisGreen"
                  placeholder="e.g., Complete a professional certification"
                />
              </div>
              
              <div className="mt-4">
                {data.goals.length > 0 ? (
                  <ul className="space-y-2">
                    {data.goals.map((goal, index) => (
                      <li key={index} className="flex justify-between items-center p-2 bg-emirati-sandBeige/10 rounded">
                        <span>{goal}</span>
                        <button 
                          onClick={() => handleRemoveGoal(index)}
                          className="text-emirati-subtleRed hover:text-emirati-desertRed"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground text-center py-4">No goals added yet</p>
                )}
              </div>
            </div>
            
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button 
                onClick={handleNext}
                disabled={data.goals.length === 0}
                className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
              >
                Continue <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
        
      case 'complete':
        return (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-emirati-oasisGreen" />
            </div>
            
            <h2 className="text-2xl font-bold text-emirati-desertRed">Setup Complete!</h2>
            <p className="text-muted-foreground">
              Thank you, {data.name}. Your Emirati Journey profile is now ready.
            </p>
            
            <div className="mt-8">
              <Button 
                onClick={handleComplete}
                className="w-full bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
              >
                Start Your Journey
              </Button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-8">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>Getting Started</span>
          <span>{currentStep + 1} of {STEPS.length}</span>
        </div>
      </div>
      
      <Card className="p-6">{renderStep()}</Card>
    </div>
  );
};

export default OnboardingFlow;
