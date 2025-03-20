
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { saveScholarship } from "@/services/scholarship";
import { scholarshipFormSchema, defaultFormValues, ScholarshipFormValues } from "./formUtils";
import BasicInfoSection from "./BasicInfoSection";
import RequirementsSection from "./RequirementsSection";

interface ScholarshipFormProps {
  onSuccess?: () => void;
}

const ScholarshipForm: React.FC<ScholarshipFormProps> = ({ onSuccess }) => {
  const [requirements, setRequirements] = useState<string[]>([]);
  const [documentRequirements, setDocumentRequirements] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ScholarshipFormValues>({
    resolver: zodResolver(scholarshipFormSchema),
    defaultValues: defaultFormValues,
  });
  
  const onSubmit = async (values: ScholarshipFormValues) => {
    try {
      setIsSubmitting(true);
      
      const scholarshipData = {
        ...values,
        requirements,
        document_requirements: documentRequirements,
        application_deadline: values.application_deadline.toISOString(),
      };
      
      const scholarshipId = await saveScholarship(scholarshipData);
      
      if (scholarshipId) {
        toast.success("Scholarship saved successfully");
        form.reset();
        setRequirements([]);
        setDocumentRequirements([]);
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error("Error saving scholarship:", error);
      toast.error("Failed to save scholarship");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BasicInfoSection />
            <RequirementsSection 
              requirements={requirements}
              documentRequirements={documentRequirements}
              setRequirements={setRequirements}
              setDocumentRequirements={setDocumentRequirements}
            />
          </div>
          
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-emirati-deepBlue hover:bg-emirati-deepBlue/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Scholarship
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
};

export default ScholarshipForm;
