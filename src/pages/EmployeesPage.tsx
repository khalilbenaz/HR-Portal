
import { useState, useEffect } from 'react';
import EmployeeList from '@/components/employees/EmployeeList';
import { Employee } from '@/lib/types';

const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockEmployees: Employee[] = [
        {
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
        {
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
        {
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
        {
          id: '4',
          userId: 'u4',
          firstName: 'Emily',
          lastName: 'Wilson',
          email: 'emily.wilson@example.com',
          phone: '(555) 234-5678',
          position: 'Junior Developer',
          department: { id: 'd1', name: 'Engineering', managerId: 'm1', employeeCount: 42 },
          manager: null,
          hireDate: '2022-09-05',
          status: 'ACTIVE'
        },
        {
          id: '5',
          userId: 'u5',
          firstName: 'David',
          lastName: 'Taylor',
          email: 'david.taylor@example.com',
          phone: '(555) 876-5432',
          position: 'HR Specialist',
          department: { id: 'd4', name: 'HR', managerId: 'm4', employeeCount: 12 },
          manager: null,
          hireDate: '2021-11-18',
          status: 'ACTIVE'
        }
      ];
      
      setEmployees(mockEmployees);
      setLoading(false);
    }, 1000);
  }, []);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Employees</h1>
        <p className="text-muted-foreground">Manage your organization's employees</p>
      </div>
      
      <EmployeeList employees={employees} loading={loading} />
    </div>
  );
};

export default EmployeesPage;
