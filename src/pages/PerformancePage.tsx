
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, CheckCircle, Target } from 'lucide-react';
import PerformanceReviews from '@/components/performance/PerformanceReviews';
import PerformanceGoals from '@/components/performance/PerformanceGoals';
import { Review, Goal } from '@/lib/types';

const PerformancePage = () => {
  const { auth } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockReviews: Review[] = [
        {
          id: '1',
          employeeId: '1',
          reviewerId: '3',
          reviewerName: 'Department Manager',
          period: 'Q1 2023',
          submissionDate: '2023-03-31',
          score: 4.5,
          strengths: 'Great communication, strong technical skills',
          improvements: 'Could improve project management skills',
          status: 'COMPLETED'
        },
        {
          id: '2',
          employeeId: '1',
          reviewerId: '3',
          reviewerName: 'Department Manager',
          period: 'Q2 2023',
          submissionDate: '2023-06-30',
          score: 4.7,
          strengths: 'Excellent problem-solving, good team collaboration',
          improvements: 'Could benefit from more leadership opportunities',
          status: 'COMPLETED'
        },
        {
          id: '3',
          employeeId: '1',
          reviewerId: '3',
          reviewerName: 'Department Manager',
          period: 'Q3 2023',
          submissionDate: '',
          score: 0,
          strengths: '',
          improvements: '',
          status: 'PENDING'
        }
      ];
      
      const mockGoals: Goal[] = [
        {
          id: '1',
          employeeId: '1',
          title: 'Complete Advanced React Training',
          description: 'Finish the advanced React course and apply learning to current projects',
          startDate: '2023-01-15',
          targetDate: '2023-03-31',
          completedDate: '2023-03-25',
          progress: 100,
          status: 'COMPLETED'
        },
        {
          id: '2',
          employeeId: '1',
          title: 'Improve Code Quality',
          description: 'Reduce code smells and increase test coverage to >85%',
          startDate: '2023-04-01',
          targetDate: '2023-06-30',
          completedDate: '2023-06-28',
          progress: 100,
          status: 'COMPLETED'
        },
        {
          id: '3',
          employeeId: '1',
          title: 'Learn GraphQL',
          description: 'Master GraphQL concepts and implement in a project',
          startDate: '2023-07-01',
          targetDate: '2023-09-30',
          completedDate: '',
          progress: 65,
          status: 'IN_PROGRESS'
        },
        {
          id: '4',
          employeeId: '1',
          title: 'Mentorship Program',
          description: 'Mentor a junior developer throughout Q4',
          startDate: '2023-10-01',
          targetDate: '2023-12-31',
          completedDate: '',
          progress: 20,
          status: 'IN_PROGRESS'
        }
      ];
      
      setReviews(mockReviews);
      setGoals(mockGoals);
      setLoading(false);
    }, 1000);
  }, []);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Performance</h1>
        <p className="text-muted-foreground">Track your performance goals and reviews</p>
      </div>
      
      <Tabs defaultValue="reviews" className="w-full">
        <TabsList>
          <TabsTrigger value="reviews" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            <span>Performance Reviews</span>
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span>Goals</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Performance Reviews</CardTitle>
              <CardDescription>Your quarterly performance evaluations</CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceReviews reviews={reviews} loading={loading} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="goals">
          <Card>
            <CardHeader>
              <CardTitle>Performance Goals</CardTitle>
              <CardDescription>Your current and past performance goals</CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceGoals goals={goals} loading={loading} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformancePage;
