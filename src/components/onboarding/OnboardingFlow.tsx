
import React, { useState, useEffect } from "react";
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
  Target,
  Map,
  Calendar,
  MessageSquare
} from "lucide-react";
import { UserRole } from "@/components/notifications/RoleNotifications";
import { uaeLocations } from "@/utils/locationUtils";

// Steps in the onboarding process - now with a cultural elements step
const STEPS = [
  "profile", 
  "role", 
  "location",
  "cultural",
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

// Extended interests list with more UAE-specific sectors
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
  { id: "aerospace", name: "Aerospace & Defense" },
  { id: "logistics", name: "Logistics & Supply Chain" },
  { id: "maritime", name: "Maritime & Port Operations" },
  { id: "financial-services", name: "Financial Services" },
  { id: "cybersecurity", name: "Cybersecurity" },
  { id: "smart-cities", name: "Smart Cities & Urban Planning" }
];

// Cultural values aligned with UAE Vision
const culturalValues = [
  { id: "tolerance", name: "Tolerance & Respect", description: "Embracing diversity and promoting respect for all cultures" },
  { id: "excellence", name: "Pursuit of Excellence", description: "Striving for the highest standards in all endeavors" },
  { id: "innovation", name: "Innovation & Creativity", description: "Finding new solutions to challenges" },
  { id: "leadership", name: "Leadership & Responsibility", description: "Taking initiative and responsibility in professional and community roles" },
  { id: "heritage", name: "Cultural Heritage", description: "Honoring and preserving Emirati traditions and culture" },
  { id: "sustainability", name: "Sustainability", description: "Contributing to environmental and economic sustainability" }
];

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

export interface OnboardingData {
  role: UserRole;
  name: string;
  interests: string[];
  goals: string[];
  culturalValues: string[];
  location: string;
  profileImage?: string;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    role: "student",
    name: "",
    interests: [],
    goals: [],
    culturalValues: [],
    location: "",
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
    // In a real app, save to localStorage or database
    localStorage.setItem('hasCompletedOnboarding', 'true');
    localStorage.setItem('userProfile', JSON.stringify(data));
    onComplete(data);
  };

  const handleRoleSelect = (role: UserRole) => {
    setData({ ...data, role });
    handleNext();
  };
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, name: e.target.value });
  };
  
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, location: e.target.value });
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
  
  const toggleCulturalValue = (valueId: string) => {
    if (data.culturalValues.includes(valueId)) {
      setData({
        ...data,
        culturalValues: data.culturalValues.filter(id => id !== valueId)
      });
    } else {
      setData({
        ...data,
        culturalValues: [...data.culturalValues, valueId]
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

  // Filter location suggestions based on user input
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const handleLocationSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setData({ ...data, location: value });
    
    if (value.length >= 2) {
      // Filter UAE locations based on input
      const suggestions = uaeLocations.filter(
        location => location.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setLocationSuggestions(suggestions);
    } else {
      setLocationSuggestions([]);
    }
  };

  const selectLocation = (location: string) => {
    setData({ ...data, location });
    setLocationSuggestions([]);
  };

  // Get role-specific content for the completion page
  const getRoleSpecificContent = () => {
    switch(data.role) {
      case "student":
        return {
          title: "Ready to Begin Your Learning Journey!",
          message: "Explore courses, connect with mentors, build your skills portfolio, and set your career path.",
          nextSteps: ["Explore available courses", "Connect with mentors in your field", "Complete your skills assessment"]
        };
      case "recruiter":
        return {
          title: "Ready to Find Top Emirati Talent!",
          message: "Post job opportunities, search for qualified candidates, and connect with training institutes.",
          nextSteps: ["Post your first job opportunity", "Browse candidate profiles", "Set up your company profile"]
        };
      case "advisor":
        return {
          title: "Ready to Guide the Next Generation!",
          message: "Help students discover their potential, provide career guidance, and track their progress.",
          nextSteps: ["View your assigned students", "Schedule guidance sessions", "Create career path recommendations"]
        };
      case "training":
        return {
          title: "Ready to Upskill the Workforce!",
          message: "Offer training programs, certifications, and skills development opportunities.",
          nextSteps: ["Add your training programs", "Connect with industry partners", "View skill gaps in the market"]
        };
      case "parent":
        return {
          title: "Ready to Support Your Child's Journey!",
          message: "Monitor progress, communicate with educators, and help guide educational decisions.",
          nextSteps: ["Link to your child's account", "View upcoming assessments", "Explore career options together"]
        };
      default:
        return {
          title: "Setup Complete!",
          message: "Your Emirati Journey profile is now ready.",
          nextSteps: ["Complete your profile", "Explore the platform", "Connect with others"]
        };
    }
  };
  
  const renderStep = () => {
    switch (STEPS[currentStep]) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-emirati-desertRed">مرحباً | Welcome to Emirati Journey</h2>
              <p className="text-center text-muted-foreground">Let's set up your profile to personalize your journey.</p>
              
              <div className="mt-6 flex justify-center">
                <div className="p-4 w-20 h-20 rounded-full bg-emirati-sandBeige/40 flex items-center justify-center">
                  <User className="w-10 h-10 text-emirati-oasisGreen" />
                </div>
              </div>
            </div>
            
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

      case 'location':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-emirati-desertRed text-center">Where Are You Located?</h2>
            <p className="text-center text-muted-foreground">This helps us personalize opportunities near you.</p>
            
            <div className="space-y-4 mt-6">
              <div className="relative">
                <label htmlFor="location" className="block text-sm font-medium mb-1">
                  Your Location in UAE
                </label>
                <div className="flex items-center">
                  <Map className="h-5 w-5 text-emirati-camelBrown absolute left-3" />
                  <input 
                    type="text" 
                    id="location" 
                    value={data.location} 
                    onChange={handleLocationSearch}
                    className="w-full pl-10 px-4 py-2 border border-emirati-sandBeige rounded-md focus:outline-none focus:ring-2 focus:ring-emirati-oasisGreen"
                    placeholder="Enter your city or emirate"
                  />
                </div>
                
                {locationSuggestions.length > 0 && (
                  <div className="absolute w-full mt-1 bg-white shadow-lg border border-emirati-sandBeige rounded-md z-10">
                    {locationSuggestions.map((location, index) => (
                      <div 
                        key={index}
                        onClick={() => selectLocation(location)}
                        className="px-4 py-2 cursor-pointer hover:bg-emirati-sandBeige/20"
                      >
                        {location}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  The UAE consists of seven emirates: Abu Dhabi, Dubai, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah, and Fujairah.
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button 
                onClick={handleNext}
                disabled={!data.location.trim()}
                className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
              >
                Continue <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case 'cultural':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-emirati-desertRed text-center">Cultural Values</h2>
            <p className="text-center text-muted-foreground">Select values that align with your personal and professional journey.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {culturalValues.map((value) => (
                <div 
                  key={value.id}
                  onClick={() => toggleCulturalValue(value.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    data.culturalValues.includes(value.id) 
                      ? 'border-emirati-oasisGreen bg-emirati-sandBeige/10' 
                      : 'border-emirati-sandBeige hover:border-emirati-desertGold'
                  }`}
                >
                  <h3 className="font-semibold">{value.name}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button 
                onClick={handleNext}
                disabled={data.culturalValues.length === 0}
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
        const roleContent = getRoleSpecificContent();
        
        return (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-emirati-oasisGreen" />
            </div>
            
            <h2 className="text-2xl font-bold text-emirati-desertRed">{roleContent.title}</h2>
            <p className="text-muted-foreground">
              Thank you, {data.name}. {roleContent.message}
            </p>
            
            <div className="mt-4 bg-emirati-sandBeige/10 p-4 rounded-md">
              <h3 className="font-semibold text-emirati-oasisGreen mb-2">Recommended Next Steps:</h3>
              <ul className="space-y-1 text-left">
                {roleContent.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-emirati-desertGold mr-2" />
                    {step}
                  </li>
                ))}
              </ul>
            </div>
            
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
