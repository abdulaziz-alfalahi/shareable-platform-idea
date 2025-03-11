
export type StatusType = "verified" | "pending" | "error";

export interface StudentRecord {
  id: string;
  name: string;
  school: string;
  grade: string;
  lastUpdated: string;
  status: StatusType;
}
