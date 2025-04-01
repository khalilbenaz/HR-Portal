
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, Target } from "lucide-react";
import { Goal } from "@/lib/types";

interface PerformanceGoalsProps {
  goals: Goal[];
  loading: boolean;
}

const PerformanceGoals = ({ goals, loading }: PerformanceGoalsProps) => {
  if (loading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <p className="text-muted-foreground">Loading goals...</p>
      </div>
    );
  }

  if (goals.length === 0) {
    return (
      <div className="h-[300px] flex flex-col items-center justify-center">
        <p className="text-muted-foreground">No performance goals found</p>
      </div>
    );
  }

  // Sort goals by status (in progress first) and then by target date
  const sortedGoals = [...goals].sort((a, b) => {
    if (a.status === 'IN_PROGRESS' && b.status !== 'IN_PROGRESS') return -1;
    if (a.status !== 'IN_PROGRESS' && b.status === 'IN_PROGRESS') return 1;
    return new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime();
  });

  return (
    <div className="space-y-4">
      {sortedGoals.map((goal) => (
        <Card key={goal.id} className="overflow-hidden">
          <div className={`h-1 ${
            goal.status === 'COMPLETED' 
              ? 'bg-green-500' 
              : goal.status === 'IN_PROGRESS' 
              ? 'bg-blue-500' 
              : 'bg-amber-500'
          }`} />
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-lg">{goal.title}</h3>
                  <p className="text-muted-foreground text-sm">{goal.description}</p>
                </div>
                <div className={`px-2 py-1 text-xs rounded-full ${
                  goal.status === 'COMPLETED' 
                    ? 'bg-green-100 text-green-800' 
                    : goal.status === 'IN_PROGRESS' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {goal.status === 'COMPLETED' ? 'Completed' : goal.status === 'IN_PROGRESS' ? 'In Progress' : 'Not Started'}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Start: {new Date(goal.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
                </div>
                {goal.completedDate && (
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Completed: {new Date(goal.completedDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-medium">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
              
              {goal.status !== 'COMPLETED' && (
                <div className="pt-2">
                  <Button variant="outline" size="sm">
                    Update Progress
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PerformanceGoals;
