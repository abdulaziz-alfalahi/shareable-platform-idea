
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const uaeBadgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80 border-transparent",
        desert: "bg-emirati-sandBeige text-emirati-deepBrown hover:bg-emirati-sandBeige/80 border-emirati-desertGold/20",
        oasis: "bg-emirati-oasisGreen/90 text-white hover:bg-emirati-oasisGreen/70 border-transparent",
        flag: "bg-red-600 text-white hover:bg-red-500 border-transparent",
        outline: "text-foreground bg-transparent border-current hover:bg-accent/20",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent",
        gold: "bg-yellow-500/90 text-yellow-950 hover:bg-yellow-500/70 border-yellow-600/30",
      },
      size: {
        default: "text-xs py-0.5 px-2.5",
        sm: "text-[0.65rem] py-0 px-2",
        lg: "text-sm py-1 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface UaeBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof uaeBadgeVariants> {}

function UaeBadge({ className, variant, size, ...props }: UaeBadgeProps) {
  return (
    <div className={cn(uaeBadgeVariants({ variant, size, className }))} {...props} />
  );
}

export { UaeBadge, uaeBadgeVariants };
