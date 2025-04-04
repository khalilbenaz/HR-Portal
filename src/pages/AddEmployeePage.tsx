
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import EmployeeForm from '@/components/employees/EmployeeForm';
import { Department, Employee } from '@/lib/types';

const AddEmployeePage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Mock departments data
  const mockDepartments: Department[] = [
    { id: 'd1', name: 'Engineering', managerId: 'm1', employeeCount: 42 },
    { id: 'd2', name: 'Marketing', managerId: 'm2', employeeCount: 18 },
    { id: 'd3', name: 'Sales', managerId: 'm3', employeeCount: 27 },
    { id: 'd4', name: 'HR', managerId: 'm4', employeeCount: 12 }
  ];

  // Mock managers data
  const mockManagers: Employee[] = [
    {
      id: 'm1',
      userId: 'u0',
      firstName: 'Jane',
      lastName: 'Wilson',
      email: 'jane.wilson@example.com',
      phone: '(555) 987-6543',
      position: 'Department Director',
      department: { id: 'd1', name: 'Engineering', managerId: 'm1', employeeCount: 42 },
      manager: null,
      hireDate: '2018-05-10',
      status: 'ACTIVE'
    },
    {
      id: 'm2',
      userId: 'u00',
      firstName: 'Robert',
      lastName: 'Smith',
      email: 'robert.smith@example.com',
      phone: '(555) 555-1234',
      position: 'Marketing Director',
      department: { id: 'd2', name: 'Marketing', managerId: 'm2', employeeCount: 18 },
      manager: null,
      hireDate: '2017-07-12',
      status: 'ACTIVE'
    }
  ];

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
        departments={mockDepartments}
        managers={mockManagers}
        onSubmit={handleSubmit}
        isLoading={loading}
        submitLabel="Add Employee"
      />
    </div>
  );
};

export default AddEmployeePage;
