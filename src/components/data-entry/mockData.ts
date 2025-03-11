
import { StatusType, StudentRecord } from "./types";

// Mock data - in a real application, this would come from an API
export const mockStudents: StudentRecord[] = [
  {
    id: "ST00123",
    name: "Ahmed Al Mansoori",
    school: "Dubai National School",
    grade: "Grade 11",
    lastUpdated: "2023-06-12",
    status: "verified"
  },
  {
    id: "ST00124",
    name: "Fatima Al Hashimi",
    school: "Abu Dhabi Grammar School",
    grade: "Grade 10",
    lastUpdated: "2023-06-10",
    status: "pending"
  },
  {
    id: "ST00125",
    name: "Mohammed Al Shamsi",
    school: "Sharjah American Academy",
    grade: "Grade 12",
    lastUpdated: "2023-06-08",
    status: "verified"
  },
  {
    id: "ST00126",
    name: "Hessa Al Muhairi",
    school: "Emirates International School",
    grade: "Grade 11",
    lastUpdated: "2023-06-07",
    status: "error"
  },
  {
    id: "ST00127",
    name: "Saeed Al Nuaimi",
    school: "Ras Al Khaimah Academy",
    grade: "Grade 10",
    lastUpdated: "2023-06-05",
    status: "verified"
  },
  {
    id: "ST00128",
    name: "Noora Al Suwaidi",
    school: "Al Ain English Speaking School",
    grade: "Grade 12",
    lastUpdated: "2023-06-03",
    status: "pending"
  },
  {
    id: "ST00129",
    name: "Khalid Al Marzouqi",
    school: "Dubai International Academy",
    grade: "Grade 11",
    lastUpdated: "2023-06-01",
    status: "verified"
  }
];
