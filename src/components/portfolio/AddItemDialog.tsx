
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  DialogContent, DialogHeader, DialogTitle, DialogFooter 
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { notifySuccess } from "@/utils/notification";
import { PortfolioItem } from "./PortfolioItemCard";

// Form validation schema
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  date: z.string().min(1, "Date is required"),
  type: z.enum(["project", "certification", "achievement"]),
  tags: z.string().min(3, "Add at least one tag")
});

interface AddItemDialogProps {
  onAddItem: (newItem: PortfolioItem) => void;
}

const AddItemDialog: React.FC<AddItemDialogProps> = ({ onAddItem }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      type: "project",
      tags: ""
    }
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // Create a new portfolio item
    const newItem: PortfolioItem = {
      id: `item-${Date.now()}`, // Generate a unique ID
      title: values.title,
      description: values.description,
      date: values.date,
      type: values.type,
      tags: values.tags.split(",").map(tag => tag.trim()) // Convert comma-separated tags to array
    };

    // Add the new item to the portfolio
    onAddItem(newItem);

    // Show success notification
    notifySuccess({
      title: "Portfolio item added",
      description: "Your new item has been added to the portfolio"
    });

    // Reset the form
    form.reset();
  };

  return (
    <DialogContent className="sm:max-w-[550px]">
      <DialogHeader>
        <DialogTitle>Add New Portfolio Item</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-2">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Item Type</FormLabel>
                <FormControl>
                  <RadioGroup 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="project" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">Project</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="certification" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">Certification</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="achievement" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">Achievement</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter a description" 
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
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="e.g., January 2023" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Separate tags with commas (e.g., Design, Web Development)" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter className="mt-6">
            <Button type="submit">Add Item</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default AddItemDialog;
