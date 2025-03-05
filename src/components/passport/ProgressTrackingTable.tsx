
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Award, ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProgressItem {
  id: string;
  category: string;
  title: string;
  progress: number;
  lastUpdated: string;
  nextMilestone: string;
  status: 'In Progress' | 'Completed' | 'Not Started';
}

interface ProgressTrackingTableProps {
  progressItems: ProgressItem[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'In Progress':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'Not Started':
      return 'bg-gray-100 text-gray-800 border-gray-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const ProgressTrackingTable: React.FC<ProgressTrackingTableProps> = ({ progressItems }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[180px]">Service</TableHead>
            <TableHead className="w-[120px]">Category</TableHead>
            <TableHead className="w-[200px]">Progress</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[140px]">Last Updated</TableHead>
            <TableHead className="text-right">Next Milestone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {progressItems.map((item) => (
            <TableRow key={item.id} className="hover:bg-muted/30">
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>
                <Badge variant="outline">{item.category}</Badge>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>{item.progress}%</span>
                    {item.progress === 100 ? (
                      <span className="flex items-center text-green-600">
                        <Award className="h-3 w-3 mr-1" /> Complete
                      </span>
                    ) : (
                      <span className="flex items-center text-amber-600">
                        <Clock className="h-3 w-3 mr-1" /> In progress
                      </span>
                    )}
                  </div>
                  <Progress 
                    value={item.progress} 
                    className="h-2" 
                    // Add UAE-themed color gradient for progress bars
                    style={{
                      background: 'linear-gradient(to right, #f5e8c7, #f5e8c7)',
                    }}
                    // The actual progress indicator with UAE-inspired green
                    indicatorStyle={{
                      background: 'linear-gradient(to right, #2c4a2e, #4a7c31)',
                    }}
                  />
                </div>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {item.lastUpdated}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-1 text-sm">
                  <span>{item.nextMilestone}</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProgressTrackingTable;
