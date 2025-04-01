
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string | number;
    positive: boolean;
  };
  icon: React.ReactNode;
  className?: string;
}

const StatCard = ({ title, value, change, icon, className }: StatCardProps) => {
  return (
    <div className={cn("bg-card rounded-lg p-4 shadow-sm border", className)}>
      <div className="flex justify-between">
        <div>
          <p className="text-muted-foreground text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          
          {change && (
            <div className="flex items-center mt-1">
              <span 
                className={cn(
                  "text-xs font-medium", 
                  change.positive ? "text-green-600" : "text-red-600"
                )}
              >
                {change.positive ? "+" : ""}{change.value}
              </span>
              <span className="text-xs text-muted-foreground ml-1">vs last month</span>
            </div>
          )}
        </div>
        
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
