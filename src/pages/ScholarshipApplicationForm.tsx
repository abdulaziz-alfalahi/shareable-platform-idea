
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { notifyInfo } from '@/utils/notification';

const ScholarshipApplicationForm = () => {
  const { id } = useParams<{ id: string }>();
  
  // This is a placeholder. In a real implementation,
  // we would fetch the application data from the API and
  // implement the form with proper validation
  
  const handleSaveDraft = () => {
    notifyInfo({ title: "Application saved as draft" });
  };
  
  const handleSubmit = () => {
    notifyInfo({ title: "This is a placeholder. Application submission feature coming soon." });
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
          <CardTitle className="text-2xl">Scholarship Application</CardTitle>
          <CardDescription className="mt-1">
            Emirates Excellence Scholarship Program - Application Form
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <AlertTitle>This is a placeholder</AlertTitle>
            <AlertDescription>
              In a real implementation, this would be a full application form with fields for personal information,
              academic details, essays, and document uploads. Currently showing the UI structure only.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-3">Personal Information</h3>
              <p className="text-gray-600">
                Placeholder for personal information form fields.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-3">Academic Information</h3>
              <p className="text-gray-600">
                Placeholder for academic information form fields.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-3">Financial Information</h3>
              <p className="text-gray-600">
                Placeholder for financial information form fields.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-3">Essay Questions</h3>
              <p className="text-gray-600">
                Placeholder for essay questions form fields.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-3">Document Upload</h3>
              <p className="text-gray-600">
                Placeholder for document upload fields.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleSaveDraft}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={handleSubmit}>
            <Send className="h-4 w-4 mr-2" />
            Submit Application
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ScholarshipApplicationForm;
