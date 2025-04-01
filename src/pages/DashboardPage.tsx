
import { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  UserCheck, 
  Calendar, 
  Briefcase 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StatCard from '@/components/dashboard/StatCard';
import EmployeeChart from '@/components/dashboard/EmployeeChart';
import LeaveRequestsChart from '@/components/dashboard/LeaveRequestsChart';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { DepartmentStats, Activity } from '@/lib/types';

import { useQuery } from '@apollo/client';
import { GET_DEPARTMENT_STATS, DepartmentStatsResponse } from '@/lib/graphql/departments';
import { GET_RECENT_ACTIVITIES, ActivitiesResponse } from '@/lib/graphql/activities';

const DashboardPage = () => {
  const [departmentData, setDepartmentData] = useState<DepartmentStats[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  // Requête pour obtenir les statistiques des départements
  const { loading: deptLoading } = useQuery<DepartmentStatsResponse>(GET_DEPARTMENT_STATS, {
    onCompleted: (data) => {
      if (data?.departmentStats) {
        setDepartmentData(data.departmentStats);
      }
    },
    onError: (error) => {
      console.error('Erreur lors de la récupération des statistiques des départements:', error);
      // Fallback sur des données mockées en cas d'erreur
      setDepartmentData([
        { name: 'Engineering', employeeCount: 42 },
        { name: 'Marketing', employeeCount: 18 },
        { name: 'Sales', employeeCount: 27 },
        { name: 'HR', employeeCount: 12 },
        { name: 'Finance', employeeCount: 15 }
      ]);
    }
  });

  // Requête pour obtenir les activités récentes
  const { loading: activitiesLoading } = useQuery<ActivitiesResponse>(GET_RECENT_ACTIVITIES, {
    variables: { limit: 6 },
    onCompleted: (data) => {
      if (data?.recentActivities) {
        setActivities(data.recentActivities as Activity[]);
      }
    },
    onError: (error) => {
      console.error('Erreur lors de la récupération des activités récentes:', error);
      // Fallback sur des données mockées en cas d'erreur
      setActivities([
        {
          id: '1',
          type: 'EMPLOYEE_ADDED',
          message: 'New employee John Doe was added to Engineering department',
          date: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
          user: { id: '1', name: 'HR Manager' }
        },
        {
          id: '2',
          type: 'LEAVE_REQUESTED',
          message: 'Sarah Johnson requested annual leave from June 15 to June 22',
          date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
          user: { id: '2', name: 'Sarah Johnson' }
        },
        {
          id: '3',
          type: 'LEAVE_APPROVED',
          message: 'Leave request from Michael Brown was approved',
          date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
          user: { id: '3', name: 'Department Manager' }
        },
        {
          id: '4',
          type: 'EMPLOYEE_UPDATED',
          message: 'Emily Wilson was promoted to Senior Developer',
          date: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
          user: { id: '1', name: 'HR Manager' }
        },
        {
          id: '5',
          type: 'PAYSLIP_GENERATED',
          message: 'Payslips for May 2023 have been generated and are ready for review',
          date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
          user: { id: '1', name: 'HR Manager' }
        },
        {
          id: '6',
          type: 'LEAVE_REJECTED',
          message: 'Leave request from Alex Johnson was rejected due to staffing constraints',
          date: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 1.5 days ago
          user: { id: '4', name: 'Department Manager' }
        }
      ]);
    }
  });

  // Mettre à jour l'état de chargement global
  useEffect(() => {
    setLoading(deptLoading || activitiesLoading);
  }, [deptLoading, activitiesLoading]);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your HR management dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Employees" 
          value={114}
          change={{ value: "8%", positive: true }}
          icon={<Users size={24} />}
        />
        
        <StatCard 
          title="New Hires (MTD)" 
          value={7}
          change={{ value: "12%", positive: true }}
          icon={<UserPlus size={24} />}
        />
        
        <StatCard 
          title="Active Employees" 
          value={108}
          change={{ value: "3%", positive: true }}
          icon={<UserCheck size={24} />}
        />
        
        <StatCard 
          title="Leave Requests" 
          value={12}
          change={{ value: "5%", positive: false }}
          icon={<Calendar size={24} />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
            <CardDescription>Employee count by department</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">Loading chart data...</p>
              </div>
            ) : (
              <EmployeeChart data={departmentData} />
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Leave Requests</CardTitle>
            <CardDescription>Monthly breakdown of leave requests</CardDescription>
          </CardHeader>
          <CardContent>
            <LeaveRequestsChart />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and actions</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">Loading activities...</p>
            </div>
          ) : (
            <RecentActivity activities={activities} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
