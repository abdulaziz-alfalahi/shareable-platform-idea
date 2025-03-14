
import React from 'react';
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

const uaeButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        // UAE-inspired variants
        desert: "bg-emirati-sandBeige text-emirati-deepBrown hover:bg-emirati-desertGold border border-emirati-desertGold/30",
        oasis: "bg-emirati-oasisGreen text-white hover:bg-emirati-oasisGreen/90",
        sea: "bg-blue-600 text-white hover:bg-blue-700",
        flag: "bg-red-600 text-white hover:bg-red-700",
        gold: "bg-yellow-500 text-yellow-950 hover:bg-yellow-600 border border-yellow-600",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
      decoration: {
        default: "",
        arabesque: "relative overflow-hidden",
        geometric: "relative after:content-[''] after:absolute after:inset-0 after:border-2 after:border-white/20 after:rounded-[inherit] after:pointer-events-none",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      decoration: "default",
    },
  }
);

export interface UaeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof uaeButtonVariants> {
  asChild?: boolean;
}

const UaeButton = React.forwardRef<HTMLButtonElement, UaeButtonProps>(
  ({ className, variant, size, decoration, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    // Additional overlay classes for arabesque decoration
    const arabesque = decoration === "arabesque" ? (
      <span className="absolute inset-0 bg-repeat opacity-5" 
            style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/arabesque.png')"}} />
    ) : null;
    
    return (
      <Comp
        className={cn(uaeButtonVariants({ variant, size, decoration, className }))}
        ref={ref}
        {...props}
      >
        {arabesque}
        <span className="relative z-10 flex items-center gap-2">{props.children}</span>
      </Comp>
    );
  }
);

UaeButton.displayName = "UaeButton";

export { UaeButton, uaeButtonVariants };
