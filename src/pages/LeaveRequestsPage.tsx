import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import LeaveRequestList from '@/components/leaves/LeaveRequestList';
import { LeaveRequest } from '@/lib/types';
import { toast } from '@/components/ui/use-toast';
import { useQuery, useMutation } from '@apollo/client';
import { GET_LEAVE_REQUESTS, APPROVE_LEAVE_REQUEST, REJECT_LEAVE_REQUEST } from '@/lib/graphql/leaves';

const LeaveRequestsPage = () => {
  const { auth } = useAuth();
  
  // Récupération des demandes de congés depuis l'API GraphQL
  const { data, loading } = useQuery(GET_LEAVE_REQUESTS, {
    fetchPolicy: 'cache-and-network',
    onError: (error) => {
      console.error('Error fetching leave requests:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les demandes de congés. Veuillez réessayer.",
      });
    }
  });
  
  // Extraction des données de la réponse GraphQL
  const leaveRequests = data?.leaveRequests || [];
  
  // Mutation pour approuver une demande de congé
  const [approveLeaveRequest, { loading: approveLoading }] = useMutation(APPROVE_LEAVE_REQUEST, {
    refetchQueries: [{ query: GET_LEAVE_REQUESTS }],
    onError: (error) => {
      console.error('Error approving leave request:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'approuver la demande de congé. Veuillez réessayer.",
      });
    }
  });
  
  const handleApprove = (id: string) => {
    // Exécution de la mutation GraphQL pour approuver la demande
    approveLeaveRequest({ 
      variables: { id } 
    }).then(({ data }) => {
      if (data?.approveLeaveRequest) {
        const leaveRequest = data.approveLeaveRequest;
        
        // Notification à l'utilisateur
        toast({
          title: "Demande de congé approuvée",
          description: `La demande de congé de ${leaveRequest.employee.firstName} ${leaveRequest.employee.lastName} a été approuvée.`,
        });
      }
    });
  };
  
  // Mutation pour rejeter une demande de congé
  const [rejectLeaveRequest, { loading: rejectLoading }] = useMutation(REJECT_LEAVE_REQUEST, {
    refetchQueries: [{ query: GET_LEAVE_REQUESTS }],
    onError: (error) => {
      console.error('Error rejecting leave request:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de rejeter la demande de congé. Veuillez réessayer.",
      });
    }
  });
  
  const handleReject = (id: string) => {
    // Exécution de la mutation GraphQL pour rejeter la demande
    rejectLeaveRequest({ 
      variables: { id } 
    }).then(({ data }) => {
      if (data?.rejectLeaveRequest) {
        const leaveRequest = data.rejectLeaveRequest;
        
        // Notification à l'utilisateur
        toast({
          variant: "destructive",
          title: "Demande de congé rejetée",
          description: `La demande de congé de ${leaveRequest.employee.firstName} ${leaveRequest.employee.lastName} a été rejetée.`,
        });
      }
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
