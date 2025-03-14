
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const uaeCardVariants = cva(
  "rounded-xl shadow transition-all duration-200 overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-white border border-gray-200",
        desert: "bg-emirati-sandBeige/50 border-emirati-desertGold/30 border",
        oasis: "bg-emirati-oasisGreen/10 border-emirati-oasisGreen/30 border",
        flag: "bg-white border-2 border-red-600/70",
        shadow: "bg-white shadow-md hover:shadow-lg",
      },
      pattern: {
        none: "",
        corners: "relative after:content-[''] after:absolute after:w-12 after:h-12 after:border-t-2 after:border-l-2 after:border-emirati-desertGold/50 after:top-0 after:left-0 before:content-[''] before:absolute before:w-12 before:h-12 before:border-b-2 before:border-r-2 before:border-emirati-desertGold/50 before:bottom-0 before:right-0",
        dot: "relative before:content-[''] before:absolute before:top-2 before:right-2 before:w-4 before:h-4 before:bg-emirati-desertGold/20 before:rounded-full",
      }
    },
    defaultVariants: {
      variant: "default",
      pattern: "none",
    },
  }
);

export interface UaeCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof uaeCardVariants> {}

const UaeCard = React.forwardRef<HTMLDivElement, UaeCardProps>(
  ({ className, variant, pattern, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(uaeCardVariants({ variant, pattern, className }))}
      {...props}
    />
  )
);
UaeCard.displayName = "UaeCard";

const UaeCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
UaeCardHeader.displayName = "UaeCardHeader";

const UaeCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight font-serif text-emirati-deepBrown",
      className
    )}
    {...props}
  />
));
UaeCardTitle.displayName = "UaeCardTitle";

const UaeCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
UaeCardDescription.displayName = "UaeCardDescription";

const UaeCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pt-0", className)}
    {...props}
  />
));
UaeCardContent.displayName = "UaeCardContent";

const UaeCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
UaeCardFooter.displayName = "UaeCardFooter";

export {
  UaeCard,
  UaeCardHeader,
  UaeCardFooter,
  UaeCardTitle,
  UaeCardDescription,
  UaeCardContent,
  uaeCardVariants,
};
