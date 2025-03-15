
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

const ProgramsTab: React.FC<ProgramsTabProps> = ({ trainingData }) => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold">Training Programs</h2>
      <Button>Create New Program</Button>
    </div>
    
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Upcoming Courses</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trainingData.upcomingCourses.map((course) => (
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
        ))}
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Active Programs</h3>
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrolled</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3, 4].map((program) => (
                <tr key={program}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Program {program}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">12 weeks</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{15 + program * 5} students</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="link" size="sm">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

export default ProgramsTab;
