
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

const DashboardPage = () => {
  // Sample data - would come from GraphQL API in a real app
  const [departmentData, setDepartmentData] = useState<DepartmentStats[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDepartmentData([
        { name: 'Engineering', employeeCount: 42 },
        { name: 'Marketing', employeeCount: 18 },
        { name: 'Sales', employeeCount: 27 },
        { name: 'HR', employeeCount: 12 },
        { name: 'Finance', employeeCount: 15 }
      ]);
      
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
        }
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);
  
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
