
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const uaeDividerVariants = cva(
  "w-full my-6 relative",
  {
    variants: {
      variant: {
        default: "h-px bg-border",
        gradient: "h-px bg-gradient-to-r from-transparent via-emirati-desertGold to-transparent",
        double: "h-[3px] border-t border-b border-emirati-desertGold/30",
        dotted: "border-t border-dotted border-emirati-desertGold/50",
        ornate: "h-5 flex items-center justify-center",
      },
      withSymbol: {
        none: "",
        center: "flex items-center justify-center",
      },
    },
    defaultVariants: {
      variant: "default",
      withSymbol: "none",
    },
  }
);

export interface UaeDividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof uaeDividerVariants> {
  symbol?: React.ReactNode;
}

const UaeDivider = React.forwardRef<HTMLDivElement, UaeDividerProps>(
  ({ className, variant, withSymbol, symbol, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(uaeDividerVariants({ variant, withSymbol, className }))}
        {...props}
      >
        {variant === 'ornate' ? (
          <>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-emirati-desertGold/60"></div>
            <div className="mx-4 flex items-center justify-center">
              {symbol || (
                <div className="h-3 w-3 bg-emirati-desertGold/60 rounded-full transform rotate-45"></div>
              )}
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-emirati-desertGold/60"></div>
          </>
        ) : withSymbol === 'center' && symbol ? (
          <>
            <div className="flex-1 h-px bg-current"></div>
            <div className="mx-2">{symbol}</div>
            <div className="flex-1 h-px bg-current"></div>
          </>
        ) : null}
      </div>
    );
  }
);

UaeDivider.displayName = "UaeDivider";

export { UaeDivider, uaeDividerVariants };
