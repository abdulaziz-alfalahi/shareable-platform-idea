
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, GraduationCap, Filter } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchScholarships } from '@/utils/scholarshipService';
import ScholarshipCard from '@/components/scholarship/ScholarshipCard';
import { Link } from 'react-router-dom';

const Scholarships = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ['scholarships'],
    queryFn: fetchScholarships
  });
  
  // Filter scholarships based on search
  const filteredScholarships = scholarships.filter(
    scholarship => scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  (scholarship.description && scholarship.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (scholarship.sponsor && scholarship.sponsor.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-emirati-deepBlue">Scholarships</h1>
            <p className="text-gray-600 mt-1">
              Explore opportunities to fund your education journey
            </p>
          </div>
          <Button asChild>
            <Link to="/profile/scholarship">
              <GraduationCap className="mr-2 h-4 w-4" />
              Update Scholarship Profile
            </Link>
          </Button>
        </div>
      </div>
      
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle>Find Scholarships</CardTitle>
          <CardDescription>
            Search for scholarships based on field of study, award amount, or sponsoring organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search scholarships..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {isLoading ? (
        <div className="text-center py-12">Loading scholarships...</div>
      ) : filteredScholarships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScholarships.map(scholarship => (
            <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <GraduationCap className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">No Scholarships Found</h2>
          <p className="text-gray-600 mb-6">Try adjusting your search terms or check back later for new opportunities.</p>
        </div>
      )}
    </div>
  );
};

export default Scholarships;
