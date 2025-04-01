
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import LeaveRequestList from '@/components/leaves/LeaveRequestList';
import { LeaveRequest } from '@/lib/types';
import { toast } from '@/components/ui/use-toast';

const LeaveRequestsPage = () => {
  const { auth } = useAuth();
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockLeaveRequests: LeaveRequest[] = [
        {
          id: '1',
          employeeId: '1',
          employee: {
            id: '1',
            userId: 'u1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '(555) 123-4567',
            position: 'Senior Developer',
            department: { id: 'd1', name: 'Engineering', managerId: 'm1', employeeCount: 42 },
            manager: null,
            hireDate: '2021-03-15',
            status: 'ACTIVE'
          },
          startDate: '2023-06-15',
          endDate: '2023-06-22',
          type: 'ANNUAL',
          status: 'APPROVED',
          reason: 'Family vacation',
          createdAt: '2023-06-01T10:30:00Z',
          updatedAt: '2023-06-02T14:20:00Z'
        },
        {
          id: '2',
          employeeId: '2',
          employee: {
            id: '2',
            userId: 'u2',
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            phone: '(555) 987-6543',
            position: 'Marketing Manager',
            department: { id: 'd2', name: 'Marketing', managerId: 'm2', employeeCount: 18 },
            manager: null,
            hireDate: '2020-07-22',
            status: 'ACTIVE'
          },
          startDate: '2023-07-03',
          endDate: '2023-07-07',
          type: 'SICK',
          status: 'PENDING',
          reason: 'Medical appointment',
          createdAt: '2023-06-28T09:15:00Z',
          updatedAt: '2023-06-28T09:15:00Z'
        },
        {
          id: '3',
          employeeId: '3',
          employee: {
            id: '3',
            userId: 'u3',
            firstName: 'Michael',
            lastName: 'Brown',
            email: 'michael.brown@example.com',
            phone: '(555) 456-7890',
            position: 'Sales Representative',
            department: { id: 'd3', name: 'Sales', managerId: 'm3', employeeCount: 27 },
            manager: null,
            hireDate: '2022-01-10',
            status: 'ON_LEAVE'
          },
          startDate: '2023-06-20',
          endDate: '2023-06-30',
          type: 'ANNUAL',
          status: 'APPROVED',
          reason: 'Summer vacation',
          createdAt: '2023-05-25T14:10:00Z',
          updatedAt: '2023-05-26T11:05:00Z'
        },
        {
          id: '4',
          employeeId: '4',
          employee: {
            id: '4',
            userId: 'u4',
            firstName: 'Sarah',
            lastName: 'Johnson',
            email: 'sarah.johnson@example.com',
            phone: '(555) 234-5678',
            position: 'HR Specialist',
            department: { id: 'd4', name: 'HR', managerId: 'm4', employeeCount: 12 },
            manager: null,
            hireDate: '2021-09-15',
            status: 'ACTIVE'
          },
          startDate: '2023-08-01',
          endDate: '2023-11-01',
          type: 'MATERNITY',
          status: 'APPROVED',
          reason: 'Maternity leave',
          createdAt: '2023-06-15T10:30:00Z',
          updatedAt: '2023-06-16T14:20:00Z'
        },
        {
          id: '5',
          employeeId: '5',
          employee: {
            id: '5',
            userId: 'u5',
            firstName: 'Robert',
            lastName: 'Davis',
            email: 'robert.davis@example.com',
            phone: '(555) 345-6789',
            position: 'Financial Analyst',
            department: { id: 'd5', name: 'Finance', managerId: 'm5', employeeCount: 15 },
            manager: null,
            hireDate: '2022-03-22',
            status: 'ACTIVE'
          },
          startDate: '2023-07-15',
          endDate: '2023-07-29',
          type: 'PATERNITY',
          status: 'PENDING',
          reason: 'Paternity leave',
          createdAt: '2023-06-20T11:45:00Z',
          updatedAt: '2023-06-20T11:45:00Z'
        }
      ];
      
      setLeaveRequests(mockLeaveRequests);
      setLoading(false);
    }, 1000);
  }, []);
  
  const handleApprove = (id: string) => {
    // In a real app, this would be a GraphQL mutation
    setLeaveRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === id ? { ...request, status: 'APPROVED', updatedAt: new Date().toISOString() } : request
      )
    );
    
    toast({
      title: "Leave request approved",
      description: "The employee has been notified",
    });
  };
  
  const handleReject = (id: string) => {
    // In a real app, this would be a GraphQL mutation
    setLeaveRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === id ? { ...request, status: 'REJECTED', updatedAt: new Date().toISOString() } : request
      )
    );
    
    toast({
      variant: "destructive",
      title: "Leave request rejected",
      description: "The employee has been notified",
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Leave Requests</h1>
        <p className="text-muted-foreground">Manage employee leave requests</p>
      </div>
      
      <LeaveRequestList 
        leaveRequests={leaveRequests} 
        loading={loading} 
        userRole={auth.user?.role || 'EMPLOYEE'}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default LeaveRequestsPage;
