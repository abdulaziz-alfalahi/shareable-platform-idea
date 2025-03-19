
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, GraduationCap, FileText, School, Calculator } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notifyInfo } from '@/utils/notification';

const ScholarshipProfile = () => {
  const navigate = useNavigate();
  
  // This is a placeholder. In a real implementation,
  // we would fetch the profile data from the API and
  // implement the form with proper validation
  
  const handleSave = () => {
    notifyInfo({ title: "This is a placeholder. Profile save feature coming soon." });
  };
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Button 
        variant="ghost" 
        className="mb-4" 
        asChild
      >
        <Link to="/student-dashboard?tab=scholarships">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Scholarships
        </Link>
      </Button>
      
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">Scholarship Profile</CardTitle>
              <CardDescription className="mt-1">
                Keep your profile updated to find the best scholarship matches
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <AlertTitle>This is a placeholder</AlertTitle>
            <AlertDescription>
              In a real implementation, this would be a full profile form with fields for academic information,
              financial details, areas of interest, and more. Currently showing the UI structure only.
            </AlertDescription>
          </Alert>
          
          <Tabs defaultValue="academic">
            <TabsList className="mb-6">
              <TabsTrigger value="academic">
                <School className="h-4 w-4 mr-2" />
                Academic
              </TabsTrigger>
              <TabsTrigger value="financial">
                <Calculator className="h-4 w-4 mr-2" />
                Financial
              </TabsTrigger>
              <TabsTrigger value="interests">
                <GraduationCap className="h-4 w-4 mr-2" />
                Interests
              </TabsTrigger>
              <TabsTrigger value="documents">
                <FileText className="h-4 w-4 mr-2" />
                Documents
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="academic">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-3">Academic Information</h3>
                  <p className="text-gray-600">
                    Placeholder for academic information form fields.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="financial">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-3">Financial Information</h3>
                  <p className="text-gray-600">
                    Placeholder for financial information form fields.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="interests">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-3">Areas of Interest</h3>
                  <p className="text-gray-600">
                    Placeholder for areas of interest form fields.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-3">Achievements</h3>
                  <p className="text-gray-600">
                    Placeholder for achievements form fields.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="documents">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-3">Document Upload</h3>
                  <p className="text-gray-600">
                    Placeholder for document upload fields.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button 
            className="ml-auto" 
            onClick={handleSave}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Profile
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ScholarshipProfile;
