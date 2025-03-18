
import React from "react";
import SummerCampsCalendar from "@/components/calendar/SummerCampsCalendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UaeGeometricPattern } from "@/components/ui/uae";
import { Building, GraduationCap, Calendar, School, Users, Target } from "lucide-react";

const SummerCamps = () => {
  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div className="relative">
        <div className="absolute -z-10 top-0 right-0 opacity-5">
          <UaeGeometricPattern type="geometric" size="lg" />
        </div>
        
        <h1 className="text-3xl font-bold text-emirati-deepBrown mb-2">Summer Knowledge Camps</h1>
        <p className="text-muted-foreground mb-8">Discover enriching summer programs for students across the UAE</p>
      </div>

      <Tabs defaultValue="calendar">
        <TabsList className="mb-6">
          <TabsTrigger value="calendar" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Calendar View
          </TabsTrigger>
          <TabsTrigger value="providers" className="flex items-center">
            <Building className="h-4 w-4 mr-2" />
            Providers
          </TabsTrigger>
          <TabsTrigger value="my-camps" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            My Camps
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar">
          <SummerCampsCalendar />
        </TabsContent>
        
        <TabsContent value="providers">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <School className="mr-2 h-5 w-5 text-emirati-oasisGreen" />
                  School Programs
                </CardTitle>
                <CardDescription>Summer camps offered by UAE schools</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Browse enrichment programs from schools across the Emirates</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5 text-emirati-desertGold" />
                  University Programs
                </CardTitle>
                <CardDescription>Summer programs hosted by universities</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Explore academic and research opportunities at UAE higher education institutions</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Building className="mr-2 h-5 w-5 text-emirati-camelBrown" />
                  Industry Programs
                </CardTitle>
                <CardDescription>Summer camps by private sector companies</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Gain industry exposure through camps offered by UAE businesses</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="my-camps">
          <Card className="border-emirati-desertGold/20 relative overflow-hidden">
            <UaeGeometricPattern type="arabesque" position="corner" opacity={0.05} />
            <CardHeader>
              <CardTitle>Your Summer Camps</CardTitle>
              <CardDescription>Camps you've registered for or are interested in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Target className="h-16 w-16 text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-medium mb-2">No camps selected yet</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Browse the calendar and subscribe to camps you're interested in to see them displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SummerCamps;
