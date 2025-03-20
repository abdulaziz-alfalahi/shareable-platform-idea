
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";
import { Mentor, MentorshipRequest } from "./types";

interface ExploreMentorsTabProps {
  mentors: Mentor[];
  pendingRequests: MentorshipRequest[];
  isLoading: boolean;
  onRequestMentor: (mentorId: string, mentorName: string) => void;
  setActiveTab: (tab: string) => void;
}

const ExploreMentorsTab: React.FC<ExploreMentorsTabProps> = ({
  mentors,
  pendingRequests,
  isLoading,
  onRequestMentor,
  setActiveTab
}) => {
  if (mentors.length === 0 && !isLoading) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          No mentors available at the moment.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Available Mentors</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mentors.map(mentor => (
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
                      onClick={() => onRequestMentor(mentor.id, mentor.name)}
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
    </div>
  );
};

export default ExploreMentorsTab;
