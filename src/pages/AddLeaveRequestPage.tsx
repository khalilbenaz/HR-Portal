
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/use-toast';
import LeaveRequestForm from '@/components/leaves/LeaveRequestForm';
import { useMutation } from '@apollo/client';
import { CREATE_LEAVE_REQUEST, GET_LEAVE_REQUESTS } from '@/lib/graphql/leaves';

const AddLeaveRequestPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();

  // Mutation pour créer une nouvelle demande de congé
  const [createLeaveRequest] = useMutation(CREATE_LEAVE_REQUEST, {
    refetchQueries: [{ query: GET_LEAVE_REQUESTS }],
    onError: (error) => {
      console.error('Error creating leave request:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de créer la demande de congé. Veuillez réessayer.",
      });
      setLoading(false);
    }
  });

  const handleSubmit = async (leaveData: any) => {
    setLoading(true);
    
    // Appel à la mutation GraphQL pour créer une demande de congé
    createLeaveRequest({
      variables: {
        input: {
          employeeId: auth.user?.id,
          startDate: leaveData.startDate,
          endDate: leaveData.endDate,
          type: leaveData.type,
          reason: leaveData.reason
        }
      }
    }).then(({ data }) => {
      if (data?.createLeaveRequest) {
        toast({
          title: "Demande de congé soumise",
          description: `Votre demande de congé a été soumise pour approbation par votre responsable et l'équipe RH.`,
        });
        navigate('/leaves');
      }
    }).finally(() => {
      setLoading(false);
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Request Leave</h1>
        <p className="text-muted-foreground">Submit a new leave request for approval by your manager and HR</p>
      </div>
      
      <LeaveRequestForm 
        onSubmit={handleSubmit}
        isLoading={loading}
      />
    </div>
  );
};

export default AddLeaveRequestPage;
