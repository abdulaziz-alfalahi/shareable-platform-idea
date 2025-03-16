
import React from "react";
import { Student } from "@/types/student";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, BookOpen, MapPin } from "lucide-react";
import CulturalAchievements from "../CulturalAchievements";

interface CulturalTabProps {
  student: Student;
}

const CulturalTab: React.FC<CulturalTabProps> = ({ student }) => {
  return (
    <div className="space-y-6">
      <Card className="border-emirati-sandBeige/50">
        <CardContent className="p-6">
          <Tabs defaultValue="achievements" className="w-full">
            <TabsList className="mb-6 grid grid-cols-3 bg-emirati-sandBeige/20">
              <TabsTrigger
                value="achievements"
                className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white"
              >
                <Award size={16} className="mr-2" /> Achievements
              </TabsTrigger>
              <TabsTrigger
                value="heritage"
                className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white"
              >
                <BookOpen size={16} className="mr-2" /> Heritage
              </TabsTrigger>
              <TabsTrigger
                value="locations"
                className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white"
              >
                <MapPin size={16} className="mr-2" /> Cultural Sites
              </TabsTrigger>
            </TabsList>

            <TabsContent value="achievements">
              <CulturalAchievements student={student} />
            </TabsContent>

            <TabsContent value="heritage">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-emirati-desertRed flex items-center">
                  <BookOpen className="h-6 w-6 mr-2 text-emirati-oasisGreen" />
                  UAE Heritage & Values
                </h2>
                <p className="text-muted-foreground">
                  Explore the rich heritage and cultural values of the United Arab Emirates that shape the workforce and society.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {culturalValues.map((value) => (
                    <div 
                      key={value.id}
                      className="p-4 rounded-lg border border-emirati-sandBeige/30 bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-semibold text-lg text-emirati-desertRed">{value.name}</h3>
                      <p className="text-muted-foreground mt-1">{value.description}</p>
                      
                      {value.careerConnection && (
                        <div className="mt-3 p-2 bg-emirati-sandBeige/10 rounded-md">
                          <span className="text-sm font-medium text-emirati-desertRed">Career Connection:</span>
                          <p className="text-sm text-muted-foreground mt-1">{value.careerConnection}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="locations">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-emirati-desertRed flex items-center">
                  <MapPin className="h-6 w-6 mr-2 text-emirati-oasisGreen" />
                  Cultural Sites to Visit
                </h2>
                <p className="text-muted-foreground">
                  Visit these important cultural and historical sites to earn special achievements in your career passport.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  {culturalSites.map((site) => (
                    <div 
                      key={site.id}
                      className="p-4 rounded-lg border border-emirati-sandBeige/30 bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="h-40 bg-emirati-sandBeige/20 rounded-md mb-3 flex items-center justify-center">
                        <MapPin className="h-8 w-8 text-emirati-desertRed/50" />
                      </div>
                      <h3 className="font-semibold text-lg text-emirati-desertRed">{site.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{site.location}</p>
                      <p className="text-sm mt-2">{site.description}</p>
                      
                      {site.achievementName && (
                        <div className="mt-3 flex items-center">
                          <Award className="h-4 w-4 mr-1 text-emirati-oasisGreen" />
                          <span className="text-sm font-medium">Achievement: {site.achievementName}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

// Sample cultural values data
const culturalValues = [
  {
    id: "hospitality",
    name: "Hospitality (Diyafa)",
    description: "The tradition of welcoming guests with warmth and generosity is deeply rooted in Emirati culture.",
    careerConnection: "This value translates to excellent customer service skills and the ability to work with diverse teams in the workplace."
  },
  {
    id: "respect",
    name: "Respect (Ehteram)",
    description: "Showing respect to elders, authority figures, and peers is a fundamental aspect of UAE culture.",
    careerConnection: "Workplace hierarchies and professional relationships benefit from this cultural foundation of respect."
  },
  {
    id: "perseverance",
    name: "Perseverance (Al-Azima)",
    description: "The UAE's desert heritage instilled a strong sense of perseverance against challenges and obstacles.",
    careerConnection: "This resilience is valuable in facing workplace challenges and pursuing long-term career goals."
  },
  {
    id: "wisdom",
    name: "Wisdom (Hikma)",
    description: "Valuing wisdom and learning from experience, often passed down through generations in the form of stories and proverbs.",
    careerConnection: "Contributes to thoughtful decision-making and appreciation for mentorship in professional settings."
  }
];

// Sample cultural sites data
const culturalSites = [
  {
    id: "sheikhzayedmosque",
    name: "Sheikh Zayed Grand Mosque",
    location: "Abu Dhabi",
    description: "One of the world's largest mosques and an architectural marvel that artfully blends elements from many Islamic countries.",
    achievementName: "Architectural Heritage Explorer"
  },
  {
    id: "alfahididistrict",
    name: "Al Fahidi Historical District",
    location: "Dubai",
    description: "One of Dubai's oldest heritage sites with wind-tower architecture, giving a glimpse into the city's pre-oil era.",
    achievementName: "Traditional Architecture Enthusiast"
  },
  {
    id: "louvreabudhabi",
    name: "Louvre Abu Dhabi",
    location: "Abu Dhabi",
    description: "A universal museum showcasing the interconnectedness of different civilizations and cultures from around the world.",
    achievementName: "Global Arts Connector"
  }
];

export default CulturalTab;
