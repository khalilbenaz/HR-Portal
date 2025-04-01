
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import EmployeeForm from '@/components/employees/EmployeeForm';

const AddEmployeePage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (employeeData: any) => {
    setLoading(true);
    
    // Simulate API call to create employee
    setTimeout(() => {
      // In a real app, we would save this data to the backend
      console.log('Creating employee:', employeeData);
      
      toast({
        title: "Employee Added",
        description: `${employeeData.firstName} ${employeeData.lastName} has been added successfully.`,
      });
      
      setLoading(false);
      navigate('/employees');
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add New Employee</h1>
        <p className="text-muted-foreground">Create a new employee record</p>
      </div>
      
      <EmployeeForm 
        onSubmit={handleSubmit}
        isLoading={loading}
        submitLabel="Add Employee"
      />
    </div>
  );
};

export default AddEmployeePage;
