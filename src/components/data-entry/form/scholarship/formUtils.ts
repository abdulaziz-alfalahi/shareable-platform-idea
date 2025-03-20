
import * as z from "zod";

export const scholarshipFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  sponsor: z.string().optional(),
  award_amount: z.coerce.number().positive("Award amount must be positive"),
  application_deadline: z.date(),
  website_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  status: z.enum(["active", "inactive", "draft", "expired"]),
  eligibility_criteria: z.record(z.any()).optional(),
});

export type ScholarshipFormValues = z.infer<typeof scholarshipFormSchema>;

export const defaultFormValues: Partial<ScholarshipFormValues> = {
  title: "",
  description: "",
  sponsor: "",
  award_amount: undefined,
  status: "draft",
  website_url: "",
  eligibility_criteria: {
    gpa: null,
    citizenship: null,
    fieldOfStudy: [],
    academicLevel: []
  }
};
