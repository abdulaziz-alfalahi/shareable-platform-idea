
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, FileText, CheckCircle, Clock, AlertCircle, Calendar } from "lucide-react";
import { fetchUserApplications } from "@/services/scholarship/scholarshipService";
import { ScholarshipApplication } from "@/types/scholarship";
import { format } from "date-fns";

const ScholarshipApplications = () => {
  const [applications, setApplications] = useState<ScholarshipApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadApplications = async () => {
      setIsLoading(true);
      const data = await fetchUserApplications();
      setApplications(data);
      setIsLoading(false);
    };
    
    loadApplications();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            <Clock className="h-3 w-3 mr-1" />
            Draft
          </Badge>
        );
      case 'submitted':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <FileText className="h-3 w-3 mr-1" />
            Submitted
          </Badge>
        );
      case 'under_review':
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Under Review
          </Badge>
        );
      case 'approved':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      case 'waitlisted':
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            <Clock className="h-3 w-3 mr-1" />
            Waitlisted
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <Button variant="ghost" asChild className="mb-2 -ml-4">
            <Link to="/scholarships" className="flex items-center text-gray-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Scholarships
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-emirati-deepBlue">My Scholarship Applications</h1>
          <p className="text-gray-600 mt-2">
            Track and manage all your scholarship applications.
          </p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button asChild variant="outline">
            <Link to="/scholarship-profile">Edit Profile</Link>
          </Button>
          <Button asChild className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90">
            <Link to="/scholarships">Browse Scholarships</Link>
          </Button>
        </div>
      </div>

      {applications.length > 0 ? (
        <div className="space-y-6">
          {applications.map((application: any) => (
            <Card key={application.id}>
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div>
                    <CardTitle>{application.scholarships.title}</CardTitle>
                    <CardDescription>{application.scholarships.sponsor}</CardDescription>
                  </div>
                  {getStatusBadge(application.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <span>
                      <span className="font-medium">Applied:</span>{" "}
                      {format(new Date(application.created_at), 'MMM dd, yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <span>
                      <span className="font-medium">Deadline:</span>{" "}
                      {format(new Date(application.scholarships.application_deadline), 'MMM dd, yyyy')}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <Button asChild variant="outline" className="sm:flex-1">
                    <Link to={`/scholarships/${application.scholarship_id}`}>View Scholarship</Link>
                  </Button>
                  {application.status === 'draft' ? (
                    <Button className="sm:flex-1 bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90">
                      Continue Application
                    </Button>
                  ) : (
                    <Button variant="secondary" className="sm:flex-1">
                      View Application
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="bg-gray-50 rounded-full p-4 inline-flex items-center justify-center mb-6">
            <FileText className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No applications yet</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            You haven't applied for any scholarships yet. Browse available scholarships to get started.
          </p>
          <Button asChild className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90">
            <Link to="/scholarships">Browse Scholarships</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ScholarshipApplications;
