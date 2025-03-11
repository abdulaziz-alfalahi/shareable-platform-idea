
export interface SubjectEntry {
  name: string;
  grade: string;
}

export interface StudentFormData {
  studentId: string;
  studentName: string;
  nationalId: string;
  email: string;
  school: string;
  grade: string;
  dateOfBirth: string;
  subjects: SubjectEntry[];
  additionalNotes: string;
}

export const initialFormData: StudentFormData = {
  studentId: "",
  studentName: "",
  nationalId: "",
  email: "",
  school: "",
  grade: "",
  dateOfBirth: "",
  subjects: [
    { name: "", grade: "" }
  ],
  additionalNotes: ""
};
