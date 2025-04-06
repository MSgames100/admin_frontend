import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export const StatCard = ({ title, value, icon, trend, className }) => {
  return (
    <Card className={cn("p-6 hover:shadow-md transition-shadow", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>

          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? "text-green-600" : "text-red-600"
                )}
              >
                {trend.isPositive ? "+" : "-"}
                {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">
                vs last month
              </span>
            </div>
          )}
        </div>

        {icon && (
          <div className="rounded-full p-2 bg-primary/10 text-primary">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};
