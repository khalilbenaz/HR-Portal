
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EmployeeDetail from '@/components/employees/EmployeeDetail';
import { Employee } from '@/lib/types';

const EmployeeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // This would be a GraphQL query in a real app
      const mockEmployee: Employee = {
        id: id || '1',
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
      };
      
      setEmployee(mockEmployee);
      setLoading(false);
    }, 1000);
  }, [id]);
  
  if (!employee && !loading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <p className="text-muted-foreground">Employee not found</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {employee && <EmployeeDetail employee={employee} loading={loading} />}
    </div>
  );
};

export default EmployeeDetailPage;
