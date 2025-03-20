
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Search, GraduationCap, Filter } from "lucide-react";
import { fetchScholarships, getScholarshipMatches } from "@/services/scholarship"; // Updated import
import { Scholarship, ScholarshipMatch } from "@/types/scholarship";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const Scholarships = () => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [filteredScholarships, setFilteredScholarships] = useState<Scholarship[]>([]);
  const [matches, setMatches] = useState<ScholarshipMatch[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const scholarshipsData = await fetchScholarships();
      setScholarships(scholarshipsData);
      setFilteredScholarships(scholarshipsData);
      
      try {
        const matchesData = await getScholarshipMatches();
        setMatches(matchesData);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
      
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  useEffect(() => {
    let results = scholarships;
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(
        (scholarship) =>
          scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (scholarship.description && scholarship.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (scholarship.sponsor && scholarship.sponsor.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (filter !== "all") {
      if (filter === "matched") {
        const matchIds = matches.map(match => match.scholarship_id);
        results = results.filter(scholarship => matchIds.includes(scholarship.id));
      } else if (filter === "deadline-soon") {
        const oneMonthFromNow = new Date();
        oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
        results = results.filter(
          scholarship => new Date(scholarship.application_deadline) <= oneMonthFromNow
        );
      }
      // Add more filter options as needed
    }
    
    setFilteredScholarships(results);
  }, [searchTerm, filter, scholarships, matches]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-emirati-deepBlue mb-2">Scholarships</h1>
          <p className="text-gray-600 max-w-2xl">
            Discover financial support opportunities from government entities, educational institutions, and private companies.
          </p>
        </div>
        <div className="mt-4 lg:mt-0">
          <Button asChild className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90">
            <Link to="/scholarship-profile">Manage Your Profile</Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search scholarships..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Scholarships</SelectItem>
            <SelectItem value="matched">Matched for You</SelectItem>
            <SelectItem value="deadline-soon">Deadline Soon</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardContent>
              <CardFooter>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : filteredScholarships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScholarships.map((scholarship) => {
            const matchInfo = matches.find(m => m.scholarship_id === scholarship.id);
            const isHighMatch = matchInfo && matchInfo.match_score > 70;
            
            return (
              <Card key={scholarship.id} className="relative overflow-hidden">
                {isHighMatch && (
                  <div className="absolute -right-10 top-6 bg-emirati-oasisGreen text-white px-10 py-1 transform rotate-45">
                    High Match
                  </div>
                )}
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-xl">{scholarship.title}</CardTitle>
                  </div>
                  <CardDescription>{scholarship.sponsor}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-2 text-gray-700">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    <span className="font-semibold">{formatAmount(scholarship.award_amount)}</span>
                  </div>
                  <div className="flex items-center mb-4 text-gray-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      Deadline: {format(new Date(scholarship.application_deadline), 'MMM dd, yyyy')}
                    </span>
                  </div>
                  <p className="text-gray-600 line-clamp-3">
                    {scholarship.description}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button asChild variant="outline">
                    <Link to={`/scholarships/${scholarship.id}`}>View Details</Link>
                  </Button>
                  {matchInfo && (
                    <Badge 
                      variant="outline" 
                      className={`${
                        matchInfo.match_score > 70 
                          ? 'bg-green-50 text-green-700 border-green-200' 
                          : matchInfo.match_score > 40 
                            ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                            : 'bg-gray-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {matchInfo.match_score}% Match
                    </Badge>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <GraduationCap className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No scholarships found</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Try adjusting your search or filters to find more opportunities.
          </p>
        </div>
      )}
    </div>
  );
};

export default Scholarships;
