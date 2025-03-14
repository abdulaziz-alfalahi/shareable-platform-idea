
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

const uaeStatCardVariants = cva(
  "rounded-xl overflow-hidden transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-white border border-gray-200 shadow-sm",
        desert: "bg-emirati-sandBeige/50 border border-emirati-desertGold/30",
        oasis: "bg-emirati-oasisGreen/10 border border-emirati-oasisGreen/30",
        flag: "bg-white border-2 border-red-600/70",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface UaeStatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof uaeStatCardVariants> {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: "up" | "down";
  change?: string;
  description?: string;
}

const UaeStatCard = React.forwardRef<HTMLDivElement, UaeStatCardProps>(
  ({ 
    className, 
    variant, 
    size, 
    title, 
    value, 
    icon, 
    trend, 
    change, 
    description,
    ...props 
  }, ref) => (
    <div
      ref={ref}
      className={cn(uaeStatCardVariants({ variant, size, className }))}
      {...props}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <div className="flex items-baseline">
            <h3 className="text-2xl font-bold">{value}</h3>
            {trend && change && (
              <p className={`ml-2 text-sm font-medium ${
                trend === "up" ? "text-green-500" : "text-red-500"
              }`}>
                <span className="inline-flex items-center">
                  {trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {change}
                </span>
              </p>
            )}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {icon && (
          <div className="self-start">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
);

UaeStatCard.displayName = "UaeStatCard";

export { UaeStatCard, uaeStatCardVariants };
