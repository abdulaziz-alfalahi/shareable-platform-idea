
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const uaeAlertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        desert: "bg-emirati-sandBeige/40 border-emirati-desertGold/50 text-emirati-deepBrown",
        oasis: "bg-emirati-oasisGreen/10 border-emirati-oasisGreen/30 text-emirati-oasisGreen",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success: "bg-green-50 border-green-200 text-green-800 [&>svg]:text-green-600",
        warning: "bg-amber-50 border-amber-200 text-amber-800 [&>svg]:text-amber-600"
      },
      decoration: {
        none: "",
        pattern: "after:content-[''] after:absolute after:w-full after:h-1 after:bg-gradient-to-r after:from-transparent after:via-emirati-desertGold/60 after:to-transparent after:-bottom-px after:left-0",
        arrow: "before:content-[''] before:absolute before:w-0 before:h-0 before:border-8 before:border-transparent before:border-l-emirati-desertGold/50 before:-left-4 before:top-1/2 before:-translate-y-1/2"
      }
    },
    defaultVariants: {
      variant: "default",
      decoration: "none",
    },
  }
);

const UaeAlert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof uaeAlertVariants>
>(({ className, variant, decoration, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(uaeAlertVariants({ variant, decoration }), className)}
    {...props}
  />
));
UaeAlert.displayName = "UaeAlert";

const UaeAlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight font-serif", className)}
    {...props}
  />
));
UaeAlertTitle.displayName = "UaeAlertTitle";

const UaeAlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
UaeAlertDescription.displayName = "UaeAlertDescription";

export { UaeAlert, UaeAlertTitle, UaeAlertDescription };
