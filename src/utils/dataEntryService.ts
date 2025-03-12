
import { supabase } from "@/integrations/supabase/client";
import { StudentFormData } from "@/components/data-entry/form/types";
import { Json } from "@/integrations/supabase/types";
import { StudentRecord } from "@/components/data-entry/types";

/**
 * Creates a new student record in the database
 */
export const createStudentRecord = async (data: StudentFormData) => {
  try {
    // Convert subjects array to JSON-compatible format
    const jsonSubjects = data.subjects as unknown as Json;
    
    const { error } = await supabase
      .from('student_records')
      .insert({
        student_id: data.studentId,
        student_name: data.studentName,
        national_id: data.nationalId,
        email: data.email,
        school: data.school,
        grade: data.grade,
        date_of_birth: data.dateOfBirth ? new Date(data.dateOfBirth).toISOString() : null,
        subjects: jsonSubjects,
        additional_notes: data.additionalNotes
      });

    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error("Error creating student record:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    };
  }
};

/**
 * Fetches all student records from the database
 */
export const fetchStudentRecords = async (): Promise<{
  success: boolean;
  data: StudentRecord[];
  error?: string;
}> => {
  try {
    const { data, error } = await supabase
      .from('student_records')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    // Transform the data to match our StudentRecord type
    const transformedData: StudentRecord[] = data.map(record => ({
      id: record.student_id,
      name: record.student_name,
      school: record.school || 'Not specified',
      grade: record.grade || 'Not specified',
      lastUpdated: record.updated_at || record.created_at,
      status: "verified" as const // Default status
    }));
    
    return { success: true, data: transformedData };
  } catch (error) {
    console.error("Error fetching student records:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred",
      data: [] 
    };
  }
};

/**
 * Fetches a single student record by ID
 */
export const fetchStudentById = async (studentId: string) => {
  try {
    const { data, error } = await supabase
      .from('student_records')
      .select('*')
      .eq('student_id', studentId)
      .maybeSingle();

    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error(`Error fetching student with ID ${studentId}:`, error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred",
      data: null 
    };
  }
};

/**
 * Updates an existing student record
 */
export const updateStudentRecord = async (studentId: string, data: Partial<StudentFormData>) => {
  try {
    const updateData: any = {};
    
    // Map form fields to database columns
    if (data.studentName) updateData.student_name = data.studentName;
    if (data.nationalId) updateData.national_id = data.nationalId;
    if (data.email) updateData.email = data.email;
    if (data.school) updateData.school = data.school;
    if (data.grade) updateData.grade = data.grade;
    if (data.dateOfBirth) updateData.date_of_birth = new Date(data.dateOfBirth).toISOString();
    if (data.subjects) updateData.subjects = data.subjects as unknown as Json;
    if (data.additionalNotes) updateData.additional_notes = data.additionalNotes;
    
    // Add updated_at timestamp
    updateData.updated_at = new Date().toISOString();
    
    const { error } = await supabase
      .from('student_records')
      .update(updateData)
      .eq('student_id', studentId);

    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error(`Error updating student with ID ${studentId}:`, error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    };
  }
};

/**
 * Deletes a student record
 */
export const deleteStudentRecord = async (studentId: string) => {
  try {
    const { error } = await supabase
      .from('student_records')
      .delete()
      .eq('student_id', studentId);

    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error(`Error deleting student with ID ${studentId}:`, error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    };
  }
};

/**
 * Exports student records to CSV format
 */
export const exportStudentRecordsToCSV = async () => {
  try {
    const result = await fetchStudentRecords();
    
    if (!result.success) {
      throw new Error(result.error || "Failed to fetch records for export");
    }
    
    const records = result.data;
    
    // Format data for CSV
    const csvData = records.map(record => ({
      ID: record.id,
      Name: record.name,
      School: record.school,
      Grade: record.grade,
      'Last Updated': new Date(record.lastUpdated).toLocaleDateString(),
      Status: record.status
    }));
    
    // Create CSV content
    const headers = Object.keys(csvData[0]).join(',');
    const rows = csvData.map(row => Object.values(row).join(','));
    const csvContent = [headers, ...rows].join('\n');
    
    return { 
      success: true, 
      data: csvContent 
    };
  } catch (error) {
    console.error("Error exporting student records:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    };
  }
};
