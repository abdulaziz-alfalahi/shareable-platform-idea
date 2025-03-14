
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const uaeDecoContainerVariants = cva(
  "relative rounded-xl p-6",
  {
    variants: {
      variant: {
        default: "bg-background border border-border",
        desert: "bg-emirati-sandBeige/20 border border-emirati-desertGold/30",
        oasis: "bg-emirati-oasisGreen/10 border border-emirati-oasisGreen/20",
        ornate: "border-2 border-emirati-desertGold/40",
      },
      decoration: {
        none: "",
        corners: "after:content-[''] after:absolute after:w-6 after:h-6 after:border-t-2 after:border-l-2 after:border-emirati-desertGold after:top-4 after:left-4 before:content-[''] before:absolute before:w-6 before:h-6 before:border-b-2 before:border-r-2 before:border-emirati-desertGold before:bottom-4 before:right-4",
        pattern: "before:content-[''] before:absolute before:inset-0 before:bg-repeat before:opacity-[0.03] before:pointer-events-none before:rounded-[inherit]",
        shadow: "before:content-[''] before:absolute before:inset-0 before:shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] before:rounded-[inherit] before:pointer-events-none",
      }
    },
    defaultVariants: {
      variant: "default",
      decoration: "none",
    },
  }
);

export interface UaeDecoContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof uaeDecoContainerVariants> {
  patternUrl?: string;
}

const UaeDecoContainer = React.forwardRef<HTMLDivElement, UaeDecoContainerProps>(
  ({ className, variant, decoration, patternUrl, style, ...props }, ref) => {
    const decorationStyles = decoration === 'pattern' && patternUrl ? {
      ...style,
      '--pattern-url': `url(${patternUrl})`,
    } as React.CSSProperties : style;

    return (
      <div
        ref={ref}
        className={cn(uaeDecoContainerVariants({ variant, decoration, className }))}
        style={decorationStyles}
        {...props}
      />
    );
  }
);

UaeDecoContainer.displayName = "UaeDecoContainer";

export { UaeDecoContainer, uaeDecoContainerVariants };
