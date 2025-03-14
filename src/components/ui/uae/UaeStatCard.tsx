
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import { UaeCard, UaeCardContent, UaeCardDescription, UaeCardHeader, UaeCardTitle } from "./UaeCard";

const uaeStatCardVariants = cva(
  "transition-all",
  {
    variants: {
      variant: {
        default: "",
        desert: "bg-gradient-to-br from-emirati-sandBeige/30 to-emirati-desertGold/10",
        oasis: "bg-gradient-to-br from-emirati-oasisGreen/30 to-emirati-oasisGreen/5",
        flag: "bg-gradient-to-br from-red-600/10 to-red-500/5 border-l-4 border-red-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface UaeStatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof uaeStatCardVariants> {
  icon?: React.ReactNode;
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down";
  description?: string;
}

const UaeStatCard = React.forwardRef<HTMLDivElement, UaeStatCardProps>(
  ({ 
    className, 
    variant, 
    icon, 
    title, 
    value, 
    change, 
    trend, 
    description, 
    ...props 
  }, ref) => {
    return (
      <UaeCard ref={ref} className={cn(uaeStatCardVariants({ variant, className }))} {...props}>
        <UaeCardHeader className="flex flex-row items-center justify-between pb-2">
          <UaeCardTitle className="text-sm font-medium">{title}</UaeCardTitle>
          {icon && <div className="w-4 h-4 text-muted-foreground">{icon}</div>}
        </UaeCardHeader>
        <UaeCardContent>
          <div className="text-2xl font-bold">{value}</div>
          {(change || trend) && (
            <div className="flex items-center mt-1">
              {trend && (
                <span className={`mr-1 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                </span>
              )}
              {change && (
                <span 
                  className={`text-xs font-medium ${
                    trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : ''
                  }`}
                >
                  {change}
                </span>
              )}
            </div>
          )}
          {description && (
            <UaeCardDescription className="mt-2 text-xs">
              {description}
            </UaeCardDescription>
          )}
        </UaeCardContent>
      </UaeCard>
    );
  }
);

UaeStatCard.displayName = "UaeStatCard";

export { UaeStatCard, uaeStatCardVariants };
