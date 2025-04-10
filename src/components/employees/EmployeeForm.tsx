
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Employee, Department } from '@/lib/types';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface EmployeeFormProps {
  employee?: Employee;
  initialData?: Employee;
  departments: Department[];
  managers?: Employee[];
  onSubmit: (formData: Partial<Employee>) => void;
  isLoading: boolean;
  submitLabel?: string;
}

const EmployeeForm = ({ employee, initialData, departments, managers = [], onSubmit, isLoading, submitLabel }: EmployeeFormProps) => {
  const [formData, setFormData] = useState<Partial<Employee>>(
    employee || initialData || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: '',
      department: undefined,
      manager: null,
      hireDate: new Date().toISOString().split('T')[0],
      status: 'ACTIVE'
    }
  );
  
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    if (name === 'departmentId') {
      const selectedDepartment = departments.find(dept => dept.id === value);
      setFormData(prev => ({ 
        ...prev, 
        department: selectedDepartment 
      }));
    } else if (name === 'managerId') {
      const selectedManager = managers.find(mgr => mgr.id === value);
      setFormData(prev => ({
        ...prev,
        manager: selectedManager || null
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation: ensure employee has a department and manager unless they are a top-level manager
    const isHighLevelManager = formData.position?.toLowerCase().includes('director') || 
                              formData.position?.toLowerCase().includes('ceo') ||
                              formData.position?.toLowerCase().includes('chief');
                              
    if (!formData.department) {
      setError('Department is required');
      return;
    }
    
    if (!formData.manager && !isHighLevelManager) {
      setError('All employees must have a manager unless they are a top-level executive');
      return;
    }
    
    setError(null);
    onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{employee || initialData ? 'Edit Employee' : 'Add New Employee'}</CardTitle>
          <CardDescription>
            {employee || initialData 
              ? `Update information for ${formData.firstName} ${formData.lastName}` 
              : 'Enter the details for the new employee'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="departmentId">Department</Label>
              <Select 
                value={formData.department?.id} 
                onValueChange={(value) => handleSelectChange('departmentId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="managerId">Manager</Label>
              <Select 
                value={formData.manager?.id} 
                onValueChange={(value) => handleSelectChange('managerId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a manager" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None (Top-level manager)</SelectItem>
                  {managers.map((mgr) => (
                    <SelectItem key={mgr.id} value={mgr.id}>
                      {mgr.firstName} {mgr.lastName} - {mgr.position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hireDate">Hire Date</Label>
              <Input
                id="hireDate"
                name="hireDate"
                type="date"
                value={formData.hireDate ? formData.hireDate.split('T')[0] : ''}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleSelectChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="ON_LEAVE">On Leave</SelectItem>
                  <SelectItem value="TERMINATED">Terminated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : submitLabel || (employee || initialData ? 'Update Employee' : 'Add Employee')}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default EmployeeForm;
