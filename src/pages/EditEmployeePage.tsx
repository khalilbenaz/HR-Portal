
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import EmployeeForm from '@/components/employees/EmployeeForm';
import { Employee, Department } from '@/lib/types';

const EditEmployeePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
  
  useEffect(() => {
    // Simulate API call to fetch employee data
    setTimeout(() => {
      // Mock manager
      const mockManager = mockManagers.find(m => m.id === 'm1');
      
      // Mock employee data - in a real app this would come from an API
      const mockEmployee: Employee = {
        id: id || '1',
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
        manager: mockManager,
        hireDate: '2022-01-15',
        status: 'ACTIVE'
      };
      
      setEmployee(mockEmployee);
      setLoading(false);
    }, 1000);
  }, [id]);
  
  const handleSubmit = async (employeeData: any) => {
    setSaving(true);
    
    // Simulate API call to update employee
    setTimeout(() => {
      // In a real app, we would update this data on the backend
      console.log('Updating employee:', employeeData);
      
      toast({
        title: "Employee Updated",
        description: `${employeeData.firstName} ${employeeData.lastName}'s information has been updated.`,
      });
      
      setSaving(false);
      navigate(`/employees/${id}`);
    }, 1000);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading employee data...</p>
      </div>
    );
  }
  
  if (!employee) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Employee not found</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Employee</h1>
        <p className="text-muted-foreground">Update employee information</p>
      </div>
      
      <EmployeeForm 
        initialData={employee}
        departments={mockDepartments}
        managers={mockManagers}
        onSubmit={handleSubmit}
        isLoading={saving}
        submitLabel="Update Employee"
      />
    </div>
  );
};

export default EditEmployeePage;
