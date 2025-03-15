
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProgramsTabProps {
  trainingData: {
    upcomingCourses: Array<{
      id: number;
      title: string;
      startDate: string;
      enrolledStudents: number;
    }>;
  };
}

const ProgramsTab: React.FC<ProgramsTabProps> = ({ trainingData }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter and sort upcoming courses
  const filteredCourses = trainingData.upcomingCourses
    .filter((course) => {
      // Filter by search query (case insensitive)
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by status if needed
      if (statusFilter === "all") return matchesSearch;
      if (statusFilter === "highEnrollment") return matchesSearch && course.enrolledStudents >= 20;
      if (statusFilter === "lowEnrollment") return matchesSearch && course.enrolledStudents < 20;
      
      return matchesSearch;
    })
    .sort((a, b) => {
      // Sort by selected field
      if (sortBy === "title") {
        return sortOrder === "asc" 
          ? a.title.localeCompare(b.title) 
          : b.title.localeCompare(a.title);
      } else if (sortBy === "date") {
        return sortOrder === "asc" 
          ? new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          : new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      } else if (sortBy === "enrollment") {
        return sortOrder === "asc" 
          ? a.enrolledStudents - b.enrolledStudents 
          : b.enrolledStudents - a.enrolledStudents;
      }
      return 0;
    });

  // Toggle sort order
  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Training Programs</h2>
        <Button>Create New Program</Button>
      </div>
      
      {/* Search and filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search programs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-full">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Programs</SelectItem>
            <SelectItem value="highEnrollment">High Enrollment (20+)</SelectItem>
            <SelectItem value="lowEnrollment">Low Enrollment (&lt;20)</SelectItem>
          </SelectContent>
        </Select>
        
        <Select
          value={sortBy}
          onValueChange={(value) => {
            setSortBy(value);
            setSortOrder("asc");
          }}
        >
          <SelectTrigger className="w-full">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Course Title</SelectItem>
            <SelectItem value="date">Start Date</SelectItem>
            <SelectItem value="enrollment">Enrollment</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Upcoming Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.length === 0 ? (
            <p className="col-span-full text-center py-4 text-gray-500">No courses match your search criteria</p>
          ) : (
            filteredCourses.map((course) => (
              <Card key={course.id} className="p-4 hover:shadow-md transition-shadow">
                <h4 className="font-medium text-emirati-desertRed">{course.title}</h4>
                <div className="mt-2 text-sm">
                  <p>Start Date: {course.startDate}</p>
                  <p>Enrolled: {course.enrolledStudents} students</p>
                </div>
                <div className="mt-4 flex justify-between">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button size="sm">View Details</Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Active Programs</h3>
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer" onClick={() => toggleSort("title")}>
                  Program Name {sortBy === "title" && (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="cursor-pointer" onClick={() => toggleSort("enrollment")}>
                  Enrolled {sortBy === "enrollment" && (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4].map((program) => (
                <TableRow key={program} className="hover:bg-muted/50">
                  <TableCell className="font-medium">Program {program}</TableCell>
                  <TableCell>12 weeks</TableCell>
                  <TableCell>{15 + program * 5} students</TableCell>
                  <TableCell>
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="link" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default ProgramsTab;
