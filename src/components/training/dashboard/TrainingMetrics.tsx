
import React from "react";
import { GraduationCap, Users, Award, TrendingUp } from "lucide-react";
import { DashboardMetric } from "@/components/dashboard/RoleDashboardLayout";

interface TrainingMetricsProps {
  trainingData: {
    instituteName: string;
    activePrograms: number;
    totalStudents: number;
    completionRate: number;
  };
}

export const generateTrainingMetrics = (trainingData: TrainingMetricsProps["trainingData"]): DashboardMetric[] => {
  return [
    { 
      label: "Active Programs", 
      value: trainingData.activePrograms, 
      change: "+2 this quarter", 
      trend: "up", 
      icon: <GraduationCap className="w-4 h-4" />
    },
    { 
      label: "Total Students", 
      value: trainingData.totalStudents, 
      change: "+45 this month", 
      trend: "up", 
      icon: <Users className="w-4 h-4" />
    },
    { 
      label: "Completion Rate", 
      value: `${trainingData.completionRate}%`, 
      change: "+3% vs last quarter", 
      trend: "up", 
      icon: <Award className="w-4 h-4" />
    },
    { 
      label: "Placement Rate", 
      value: "72%", 
      description: "Graduates in relevant jobs", 
      icon: <TrendingUp className="w-4 h-4" />
    }
  ];
};

const TrainingMetrics: React.FC<TrainingMetricsProps> = ({ trainingData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {generateTrainingMetrics(trainingData).map((metric, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-500">{metric.label}</h3>
            <div className="p-2 rounded-full bg-blue-100">{metric.icon}</div>
          </div>
          <p className="text-2xl font-bold">{metric.value}</p>
          {metric.change && (
            <p className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {metric.change}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default TrainingMetrics;
