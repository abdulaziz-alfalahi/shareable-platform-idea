
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Calendar, Award, AlertCircle, Edit, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { notifyInfo } from '@/utils/notification';

const ScholarshipApplication = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // This is a placeholder. In a real implementation,
  // we would fetch the application data from the API
  
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
              <CardTitle className="text-2xl">Scholarship Application</CardTitle>
              <CardDescription className="mt-1">Emirates Excellence Scholarship Program</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link to={`/scholarships/applications/${id}/edit`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Link>
              </Button>
              <Button variant="outline" onClick={() => notifyInfo({ title: "Download feature coming soon" })}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-blue-50 text-blue-600 border-blue-200">
              Submitted
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center">
              <Award className="h-5 w-5 mr-3 text-emirati-desertRed" />
              <div>
                <div className="text-sm text-gray-500">Award Amount</div>
                <div className="font-medium">
                  AED 50,000
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-3 text-emirati-desertRed" />
              <div>
                <div className="text-sm text-gray-500">Submitted On</div>
                <div className="font-medium">
                  March 15, 2025
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <FileText className="h-5 w-5 mr-3 text-emirati-desertRed" />
              <div>
                <div className="text-sm text-gray-500">Documents</div>
                <div className="font-medium">
                  4 Uploaded
                </div>
              </div>
            </div>
          </div>
          
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Application Under Review</AlertTitle>
            <AlertDescription>
              Your application has been received and is currently being reviewed by the scholarship committee.
              You will be notified once a decision has been made.
            </AlertDescription>
          </Alert>
          
          <Separator className="my-6" />
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-3">Application Summary</h3>
              <p className="text-gray-600">
                This is a placeholder for the application summary. In a real implementation,
                this would show a summary of the student's application information.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-3">Uploaded Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-blue-500 mr-3" />
                        <div>
                          <h4 className="font-medium">Academic Transcript</h4>
                          <p className="text-xs text-gray-500">PDF, 2.1 MB</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => notifyInfo({ title: "Download feature coming soon" })}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-blue-500 mr-3" />
                        <div>
                          <h4 className="font-medium">Recommendation Letter</h4>
                          <p className="text-xs text-gray-500">PDF, 1.8 MB</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => notifyInfo({ title: "Download feature coming soon" })}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScholarshipApplication;
