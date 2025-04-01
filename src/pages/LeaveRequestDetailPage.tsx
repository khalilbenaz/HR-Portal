
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/useAuth';
import { LeaveRequest } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Calendar, Clock, FileText, User } from 'lucide-react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_LEAVE_REQUEST, APPROVE_LEAVE_REQUEST, REJECT_LEAVE_REQUEST } from '@/lib/graphql/leaves';

const LeaveRequestDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [processing, setProcessing] = useState(false);
  
  const isManager = auth.user?.role === 'MANAGER' || auth.user?.role === 'HR' || auth.user?.role === 'ADMIN';
  
  // Récupération des détails de la demande de congé depuis l'API GraphQL
  const { data, loading, error } = useQuery(GET_LEAVE_REQUEST, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
    onError: (error) => {
      console.error('Error fetching leave request details:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les détails de la demande de congé. Veuillez réessayer.",
      });
    }
  });
  
  // Extraction des données de la réponse GraphQL
  const leaveRequest = data?.leaveRequest || null;
  
  // Mutation pour approuver une demande de congé
  const [approveLeaveRequest] = useMutation(APPROVE_LEAVE_REQUEST, {
    refetchQueries: [{ query: GET_LEAVE_REQUEST, variables: { id } }],
    onError: (error) => {
      console.error('Error approving leave request:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'approuver la demande de congé. Veuillez réessayer.",
      });
    }
  });
  
  const handleApprove = () => {
    setProcessing(true);
    
    // Exécution de la mutation GraphQL pour approuver la demande
    approveLeaveRequest({ 
      variables: { id } 
    }).then(({ data }) => {
      if (data?.approveLeaveRequest) {
        toast({
          title: "Demande de congé approuvée",
          description: "La demande de congé a été approuvée avec succès.",
        });
      }
    }).finally(() => {
      setProcessing(false);
    });
  };
  
  // Mutation pour rejeter une demande de congé
  const [rejectLeaveRequest] = useMutation(REJECT_LEAVE_REQUEST, {
    refetchQueries: [{ query: GET_LEAVE_REQUEST, variables: { id } }],
    onError: (error) => {
      console.error('Error rejecting leave request:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de rejeter la demande de congé. Veuillez réessayer.",
      });
    }
  });
  
  const handleReject = () => {
    setProcessing(true);
    
    // Exécution de la mutation GraphQL pour rejeter la demande
    rejectLeaveRequest({ 
      variables: { id } 
    }).then(({ data }) => {
      if (data?.rejectLeaveRequest) {
        toast({
          variant: "destructive",
          title: "Demande de congé rejetée",
          description: "La demande de congé a été rejetée.",
        });
      }
    }).finally(() => {
      setProcessing(false);
    });
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
