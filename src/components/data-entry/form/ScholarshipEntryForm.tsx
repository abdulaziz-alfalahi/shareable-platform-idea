
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Save, Plus, Trash2 } from "lucide-react";
import { saveScholarship } from "@/services/scholarship"; // Updated import
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  sponsor: z.string().optional(),
  award_amount: z.coerce.number().positive("Award amount must be positive"),
  application_deadline: z.date(),
  website_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  status: z.enum(["active", "inactive", "draft", "expired"]),
  eligibility_criteria: z.record(z.any()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ScholarshipEntryForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [requirements, setRequirements] = useState<string[]>([]);
  const [documentRequirements, setDocumentRequirements] = useState<string[]>([]);
  const [newRequirement, setNewRequirement] = useState("");
  const [newDocumentRequirement, setNewDocumentRequirement] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
    },
  });
  
  const handleAddRequirement = () => {
    if (newRequirement.trim()) {
      setRequirements([...requirements, newRequirement.trim()]);
      setNewRequirement("");
    }
  };

  const handleAddDocumentRequirement = () => {
    if (newDocumentRequirement.trim()) {
      setDocumentRequirements([...documentRequirements, newDocumentRequirement.trim()]);
      setNewDocumentRequirement("");
    }
  };

  const handleRemoveRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const handleRemoveDocumentRequirement = (index: number) => {
    setDocumentRequirements(documentRequirements.filter((_, i) => i !== index));
  };

  const onSubmit = async (values: FormValues) => {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Basic Information</h3>
              
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Scholarship Title*</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Engineering Excellence Scholarship" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the scholarship purpose and benefits"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="sponsor"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Sponsor/Provider</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., ABC Corporation" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="award_amount"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Award Amount (AED)*</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="10000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="website_url"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/scholarship" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="application_deadline"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Application Deadline*</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Status</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="expired">Expired</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Requirements & Eligibility</h3>
              
              <div className="mb-4">
                <FormLabel>Scholarship Requirements</FormLabel>
                <div className="flex mt-2">
                  <Input 
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    placeholder="Add requirement"
                    className="mr-2"
                  />
                  <Button 
                    type="button" 
                    onClick={handleAddRequirement}
                    variant="outline"
                    size="icon"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mt-2">
                  {requirements.map((req, index) => (
                    <div key={index} className="flex items-center mt-2 p-2 bg-muted rounded-md">
                      <span className="flex-1">{req}</span>
                      <Button 
                        type="button" 
                        onClick={() => handleRemoveRequirement(index)}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <FormLabel>Required Documents</FormLabel>
                <div className="flex mt-2">
                  <Input 
                    value={newDocumentRequirement}
                    onChange={(e) => setNewDocumentRequirement(e.target.value)}
                    placeholder="Add document requirement"
                    className="mr-2"
                  />
                  <Button 
                    type="button" 
                    onClick={handleAddDocumentRequirement}
                    variant="outline"
                    size="icon"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mt-2">
                  {documentRequirements.map((req, index) => (
                    <div key={index} className="flex items-center mt-2 p-2 bg-muted rounded-md">
                      <span className="flex-1">{req}</span>
                      <Button 
                        type="button" 
                        onClick={() => handleRemoveDocumentRequirement(index)}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Simple eligibility criteria fields - can be expanded based on requirements */}
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Eligibility Criteria</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FormLabel className="text-xs">Minimum GPA</FormLabel>
                    <Input 
                      type="number" 
                      placeholder="e.g., 3.5"
                      min="0"
                      max="4" 
                      step="0.1"
                      onChange={(e) => {
                        const criteria = { ...form.getValues().eligibility_criteria };
                        criteria.gpa = e.target.value ? parseFloat(e.target.value) : null;
                        form.setValue("eligibility_criteria", criteria);
                      }}
                    />
                  </div>
                  <div>
                    <FormLabel className="text-xs">Citizenship</FormLabel>
                    <Input 
                      placeholder="e.g., UAE Nationals"
                      onChange={(e) => {
                        const criteria = { ...form.getValues().eligibility_criteria };
                        criteria.citizenship = e.target.value || null;
                        form.setValue("eligibility_criteria", criteria);
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
  );
};

export default ScholarshipEntryForm;
