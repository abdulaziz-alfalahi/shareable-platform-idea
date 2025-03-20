
import React from "react";
import { GraduationCap, Briefcase, BookOpen, TrendingUp } from "lucide-react";
import { CareerField } from "./types";

// Sample data for career fields
export const careerFields: CareerField[] = [
  {
    id: "stem",
    name: "Science & Technology",
    icon: <GraduationCap className="h-5 w-5 text-emirati-oasisGreen" />,
    specializations: [
      { name: "Computer Science", description: "Study algorithms, data structures, and computational systems", popularity: "High Demand" },
      { name: "Mechanical Engineering", description: "Design and analyze mechanical systems", popularity: "Medium Demand" },
      { name: "Biology", description: "Study living organisms and life processes", popularity: "Medium Demand" },
    ],
    pathways: [
      { title: "Software Development", salary: "25,000-45,000 AED", growth: "15%" },
      { title: "Biomedical Research", salary: "20,000-40,000 AED", growth: "8%" },
      { title: "Robotics Engineering", salary: "22,000-38,000 AED", growth: "12%" }
    ]
  },
  {
    id: "business",
    name: "Business & Finance",
    icon: <Briefcase className="h-5 w-5 text-emirati-oasisGreen" />,
    specializations: [
      { name: "Business Administration", description: "Learn to manage organizations and operations", popularity: "High Demand" },
      { name: "Finance", description: "Study financial systems, investments, and markets", popularity: "High Demand" },
      { name: "Marketing", description: "Learn strategies to promote products and services", popularity: "Medium Demand" },
    ],
    pathways: [
      { title: "Financial Analyst", salary: "20,000-35,000 AED", growth: "10%" },
      { title: "Business Consultant", salary: "25,000-50,000 AED", growth: "12%" },
      { title: "Marketing Manager", salary: "18,000-32,000 AED", growth: "8%" }
    ]
  },
  {
    id: "humanities",
    name: "Arts & Humanities",
    icon: <BookOpen className="h-5 w-5 text-emirati-oasisGreen" />,
    specializations: [
      { name: "International Relations", description: "Study international politics and diplomacy", popularity: "Medium Demand" },
      { name: "Communication", description: "Study media and communication strategies", popularity: "Medium Demand" },
      { name: "Art & Design", description: "Develop creative skills in various artistic mediums", popularity: "Moderate Demand" }
    ],
    pathways: [
      { title: "Diplomat", salary: "22,000-40,000 AED", growth: "5%" },
      { title: "Public Relations", salary: "18,000-30,000 AED", growth: "7%" },
      { title: "Digital Designer", salary: "15,000-28,000 AED", growth: "10%" }
    ]
  },
  {
    id: "healthcare",
    name: "Healthcare & Medicine",
    icon: <TrendingUp className="h-5 w-5 text-emirati-oasisGreen" />,
    specializations: [
      { name: "Medicine", description: "Train to diagnose and treat patients", popularity: "High Demand" },
      { name: "Nursing", description: "Learn patient care and health management", popularity: "Very High Demand" },
      { name: "Pharmacy", description: "Study medications and their effects", popularity: "High Demand" },
    ],
    pathways: [
      { title: "Doctor", salary: "35,000-70,000 AED", growth: "12%" },
      { title: "Nurse Practitioner", salary: "15,000-30,000 AED", growth: "18%" },
      { title: "Pharmacist", salary: "20,000-35,000 AED", growth: "9%" }
    ]
  }
];
