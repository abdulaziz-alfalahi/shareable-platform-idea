
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/toast";
import { Mentor, MentorshipRequest } from "./types";

export const useMentorData = () => {
  const { toast } = useToast();
  const [activeMentors, setActiveMentors] = useState<Mentor[]>([]);
  const [pendingRequests, setPendingRequests] = useState<MentorshipRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // In a real application, we would fetch from Supabase
  const fetchMentors = async () => {
    setIsLoading(true);
    try {
      // This would be a real Supabase query in a production app
      // Mock data for now
      const mockMentors = [
        {
          id: "m1",
          name: "Ahmed Al Mansoori",
          industry: "Information Technology",
          experience_years: 12,
          expertise: ["Software Development", "AI", "Career Coaching"],
          bio: "Senior software engineer with over 12 years of experience in leading tech companies."
        },
        {
          id: "m2",
          name: "Fatima Al Hashemi",
          industry: "Finance",
          experience_years: 8,
          expertise: ["Investment Banking", "Financial Analysis", "Mentorship"],
          bio: "Finance professional specializing in investment strategies and career development."
        },
        {
          id: "m3",
          name: "Mohammed Al Marzooqi",
          industry: "Engineering",
          experience_years: 15,
          expertise: ["Civil Engineering", "Project Management", "Leadership"],
          bio: "Civil engineer and project manager with experience in major UAE infrastructure projects."
        }
      ];
      
      setActiveMentors(mockMentors);
      
      // Mock pending requests
      const mockRequests = [
        {
          id: "r1",
          mentor_id: "m1",
          status: "pending",
          created_at: "2023-10-15T08:30:00Z",
          mentor_name: "Ahmed Al Mansoori",
          mentor_industry: "Information Technology"
        }
      ];
      
      setPendingRequests(mockRequests);
    } catch (error) {
      console.error("Error fetching mentors:", error);
      toast({
        title: "Error",
        description: "Failed to load mentors. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestMentor = async (mentorId: string, mentorName: string) => {
    try {
      // In a real app, this would be a Supabase insert
      console.log(`Requesting mentor: ${mentorId}`);
      
      // Optimistic UI update
      setPendingRequests(prev => [
        ...prev, 
        { 
          id: `new-${Date.now()}`, 
          mentor_id: mentorId, 
          status: "pending", 
          created_at: new Date().toISOString(),
          mentor_name: mentorName,
          mentor_industry: activeMentors.find(m => m.id === mentorId)?.industry
        }
      ]);
      
      toast({
        title: "Request Sent",
        description: `Your mentorship request has been sent to ${mentorName}.`,
      });
    } catch (error) {
      console.error("Error requesting mentor:", error);
      toast({
        title: "Error",
        description: "Failed to send mentorship request. Please try again.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  return {
    activeMentors,
    pendingRequests,
    isLoading,
    handleRequestMentor
  };
};
