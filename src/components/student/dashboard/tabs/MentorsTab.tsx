
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import MentorMatchingCard from "@/components/passport/MentorMatchingCard";
import { studentData } from "@/data/studentMockData";
import { useMentorData } from "./mentors/useMentorData";
import ExploreMentorsTab from "./mentors/ExploreMentorsTab";
import RequestsTab from "./mentors/RequestsTab";

const MentorsTab = () => {
  const [activeTab, setActiveTab] = useState("explore");
  const { activeMentors, pendingRequests, isLoading, handleRequestMentor } = useMentorData();
  
  // Use the student data object for the MentorMatchingCard
  const student = studentData;

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
        
        <TabsContent value="explore">
          <ExploreMentorsTab 
            mentors={activeMentors}
            pendingRequests={pendingRequests}
            isLoading={isLoading}
            onRequestMentor={handleRequestMentor}
            setActiveTab={setActiveTab}
          />
        </TabsContent>
        
        <TabsContent value="requests">
          <RequestsTab 
            pendingRequests={pendingRequests}
            setActiveTab={setActiveTab}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MentorsTab;
