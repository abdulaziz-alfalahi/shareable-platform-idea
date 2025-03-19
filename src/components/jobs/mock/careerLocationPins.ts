
import { JobLocation } from "@/types/map";

// Mock career location pins data with explicit coordinates
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
      latitude: 25.2650,
      longitude: 55.3010,
      address: "Area 2071, Emirates Towers, Dubai"
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
      latitude: 25.2644,
      longitude: 55.2900,
      address: "Dubai International Financial Centre"
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
      latitude: 25.2707,
      longitude: 55.3200,
      address: "Dubai Healthcare City"
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
      latitude: 25.2600,
      longitude: 55.3050,
      address: "Jumeirah Beach Road, Dubai"
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
      latitude: 25.2730,
      longitude: 55.3080,
      address: "Al Quoz, Dubai"
    },
    matchPercentage: 90
  }
];
