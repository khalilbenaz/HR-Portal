
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/use-toast';
import LeaveRequestForm from '@/components/leaves/LeaveRequestForm';

const AddLeaveRequestPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleSubmit = async (leaveData: any) => {
    setLoading(true);
    
    // Simulate API call to create leave request
    setTimeout(() => {
      // In a real app, we would save this data to the backend
      console.log('Creating leave request:', leaveData);
      
      toast({
        title: "Leave Request Submitted",
        description: `Your leave request has been submitted for approval by your manager and HR team.`,
      });
      
      // In a real app, this is where we'd create notifications for manager and HR
      console.log('Sending notification to manager');
      console.log('Sending notification to HR department');
      
      setLoading(false);
      navigate('/leaves');
    }, 1000);
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
