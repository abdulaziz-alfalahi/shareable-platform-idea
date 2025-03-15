
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, UserCheck, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/toast";
import MentorMatchingCard from "@/components/passport/MentorMatchingCard";
import { Student } from "@/types/student";
import { studentData } from "@/data/studentMockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Mentor {
  id: string;
  name: string;
  industry: string;
  experience_years: number;
  expertise: string[];
  bio: string | null;
}

interface MentorshipRequest {
  id: string;
  mentor_id: string;
  status: string;
  created_at: string;
  mentor_name?: string;
  mentor_industry?: string;
}

const MentorsTab = () => {
  const { toast } = useToast();
  const [activeMentors, setActiveMentors] = useState<Mentor[]>([]);
  const [pendingRequests, setPendingRequests] = useState<MentorshipRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("explore");
  
  // Use the student data object for the MentorMatchingCard
  const student = studentData;

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

  useEffect(() => {
    fetchMentors();
  }, []);

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

  return (
    <div className="space-y-6">
      <MentorMatchingCard student={student} />
      
      <Tabs defaultValue="explore" className="w-full mt-6" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="explore">Explore Mentors</TabsTrigger>
          <TabsTrigger value="requests">
            My Requests
            {pendingRequests.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {pendingRequests.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="explore" className="space-y-4">
          <h2 className="text-xl font-bold">Available Mentors</h2>
          
          {activeMentors.length === 0 && !isLoading ? (
            <Card>
              <CardContent className="p-6 text-center">
                No mentors available at the moment.
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeMentors.map(mentor => (
                <Card key={mentor.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10">
                          {mentor.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="space-y-2 flex-1">
                        <div>
                          <h3 className="font-semibold">{mentor.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {mentor.industry} • {mentor.experience_years} years
                          </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 my-2">
                          {mentor.expertise.slice(0, 3).map(skill => (
                            <Badge key={skill} variant="outline" className="bg-primary/5">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        
                        {mentor.bio && (
                          <p className="text-sm mt-2">{mentor.bio}</p>
                        )}
                        
                        <div className="flex justify-end mt-4">
                          <Button 
                            size="sm" 
                            onClick={() => handleRequestMentor(mentor.id, mentor.name)}
                            disabled={pendingRequests.some(r => r.mentor_id === mentor.id)}
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            {pendingRequests.some(r => r.mentor_id === mentor.id) 
                              ? "Request Pending" 
                              : "Request Mentorship"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="requests" className="space-y-4">
          <h2 className="text-xl font-bold">My Mentorship Requests</h2>
          
          {pendingRequests.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p>You haven't sent any mentorship requests yet.</p>
                <Button 
                  variant="outline" 
                  className="mt-4" 
                  onClick={() => setActiveTab("explore")}
                >
                  Explore Mentors
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pendingRequests.map(request => (
                <Card key={request.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {request.mentor_name?.split(" ").map(n => n[0]).join("") || "M"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{request.mentor_name}</p>
                          <p className="text-sm text-muted-foreground">{request.mentor_industry}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {request.status === "pending" ? "Pending" : request.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MentorsTab;
