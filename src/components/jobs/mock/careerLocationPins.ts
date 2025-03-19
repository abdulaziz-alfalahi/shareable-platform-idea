
import { JobLocation } from "@/types/map";

// Mock career location pins data with coordinates near Al Fahidi Fort
export const careerLocationPins: JobLocation[] = [
  {
    id: "career-tech-hub",
    title: "Technology Innovation Hub",
    company: "Dubai Future Foundation",
    careerPathPin: {
      type: "Technology",
      icon: "cpu",
      color: "#3b82f6" // Blue
    },
    location: {
      latitude: 25.2647,
      longitude: 55.2982,
      address: "Near Al Fahidi Fort, Dubai"
    },
    matchPercentage: 95
  },
  {
    id: "career-finance-center",
    title: "Financial Services District",
    company: "DIFC",
    careerPathPin: {
      type: "Finance",
      icon: "trending-up",
      color: "#10b981" // Green
    },
    location: {
      latitude: 25.2627,
      longitude: 55.3000,
      address: "Near Al Fahidi Fort, Dubai"
    },
    matchPercentage: 88
  },
  {
    id: "career-healthcare-hub",
    title: "Healthcare Excellence Center",
    company: "Dubai Healthcare City",
    careerPathPin: {
      type: "Healthcare",
      icon: "activity",
      color: "#ef4444" // Red
    },
    location: {
      latitude: 25.2657,
      longitude: 55.2960,
      address: "Near Al Fahidi Fort, Dubai"
    },
    matchPercentage: 75
  },
  {
    id: "career-hospitality-academy",
    title: "Hospitality Management Institute",
    company: "Emirates Academy of Hospitality",
    careerPathPin: {
      type: "Hospitality",
      icon: "utensils",
      color: "#f59e0b" // Amber
    },
    location: {
      latitude: 25.2637,
      longitude: 55.2942,
      address: "Near Al Fahidi Fort, Dubai"
    },
    matchPercentage: 82
  },
  {
    id: "career-energy-center",
    title: "Sustainable Energy Research Center",
    company: "DEWA Innovation Hub",
    careerPathPin: {
      type: "Energy",
      icon: "zap",
      color: "#8b5cf6" // Purple
    },
    location: {
      latitude: 25.2617,
      longitude: 55.2972,
      address: "Near Al Fahidi Fort, Dubai"
    },
    matchPercentage: 90
  }
];
