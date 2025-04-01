
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/useAuth';
import { LeaveRequest } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Calendar, Clock, FileText, User } from 'lucide-react';

const LeaveRequestDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [leaveRequest, setLeaveRequest] = useState<LeaveRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  
  const isManager = auth.user?.role === 'MANAGER' || auth.user?.role === 'HR' || auth.user?.role === 'ADMIN';
  
  useEffect(() => {
    // Simulate API call to fetch leave request data
    setTimeout(() => {
      // Mock leave request data - in a real app this would come from an API
      const mockLeaveRequest: LeaveRequest = {
        id: id || '1',
        employeeId: '1',
        employee: {
          id: '1',
          userId: 'u1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '(555) 123-4567',
          position: 'Software Engineer',
          department: {
            id: 'd1',
            name: 'Engineering',
            managerId: 'm1',
            employeeCount: 42
          },
          manager: null,
          hireDate: '2022-01-15',
          status: 'ACTIVE'
        },
        startDate: '2023-07-10',
        endDate: '2023-07-15',
        type: 'ANNUAL',
        status: 'PENDING',
        reason: 'Family vacation',
        createdAt: '2023-06-20T10:30:00Z',
        updatedAt: '2023-06-20T10:30:00Z'
      };
      
      setLeaveRequest(mockLeaveRequest);
      setLoading(false);
    }, 1000);
  }, [id]);
  
  const handleApprove = () => {
    setProcessing(true);
    
    // Simulate API call to approve leave request
    setTimeout(() => {
      setLeaveRequest((prev) => {
        if (!prev) return null;
        return { ...prev, status: 'APPROVED', updatedAt: new Date().toISOString() };
      });
      
      toast({
        title: "Leave Request Approved",
        description: "The leave request has been approved successfully.",
      });
      
      setProcessing(false);
    }, 1000);
  };
  
  const handleReject = () => {
    setProcessing(true);
    
    // Simulate API call to reject leave request
    setTimeout(() => {
      setLeaveRequest((prev) => {
        if (!prev) return null;
        return { ...prev, status: 'REJECTED', updatedAt: new Date().toISOString() };
      });
      
      toast({
        title: "Leave Request Rejected",
        description: "The leave request has been rejected.",
      });
      
      setProcessing(false);
    }, 1000);
  };
  
  const calculateDuration = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    // Calculate difference in days
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays + 1; // Include both start and end days
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading leave request details...</p>
      </div>
    );
  }
  
  if (!leaveRequest) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Leave request not found</p>
      </div>
    );
  }
  
  const getLeaveTypeLabel = (type: string) => {
    switch (type) {
      case 'SICK':
        return 'Sick Leave';
      case 'ANNUAL':
        return 'Annual Leave';
      case 'MATERNITY':
        return 'Maternity Leave';
      case 'PATERNITY':
        return 'Paternity Leave';
      case 'OTHER':
        return 'Other Leave';
      default:
        return 'Unknown Leave Type';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Leave Request Details</h1>
          <p className="text-muted-foreground">Review leave request information</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/leaves')}>
          Back to All Requests
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{getLeaveTypeLabel(leaveRequest.type)}</CardTitle>
              <CardDescription>Request ID: {leaveRequest.id}</CardDescription>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              leaveRequest.status === 'APPROVED' 
                ? 'bg-green-100 text-green-800' 
                : leaveRequest.status === 'REJECTED'
                ? 'bg-red-100 text-red-800'
                : 'bg-amber-100 text-amber-800'
            }`}>
              {leaveRequest.status}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Employee</h3>
                <div className="flex items-center mt-1">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="font-medium">{leaveRequest.employee.firstName} {leaveRequest.employee.lastName}</span>
                </div>
                <div className="text-sm text-muted-foreground ml-6">
                  {leaveRequest.employee.position}, {leaveRequest.employee.department.name}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Reason</h3>
                <div className="flex items-start mt-1">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                  <p>{leaveRequest.reason}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Leave Period</h3>
                <div className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div>
                    <span className="font-medium">
                      {format(new Date(leaveRequest.startDate), 'PP')} - {format(new Date(leaveRequest.endDate), 'PP')}
                    </span>
                    <div className="text-sm text-muted-foreground">
                      {calculateDuration(leaveRequest.startDate, leaveRequest.endDate)} days
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Request Timeline</h3>
                <div className="flex items-center mt-1">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div>
                    <div className="text-sm">
                      Submitted: {format(new Date(leaveRequest.createdAt), 'PPp')}
                    </div>
                    {leaveRequest.updatedAt !== leaveRequest.createdAt && (
                      <div className="text-sm">
                        Updated: {format(new Date(leaveRequest.updatedAt), 'PPp')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        
        {isManager && leaveRequest.status === 'PENDING' && (
          <CardFooter className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              onClick={handleReject}
              disabled={processing}
            >
              Reject
            </Button>
            <Button 
              onClick={handleApprove}
              disabled={processing}
            >
              Approve
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default LeaveRequestDetailPage;
