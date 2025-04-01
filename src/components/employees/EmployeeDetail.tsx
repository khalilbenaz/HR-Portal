
import { Employee } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Mail, Phone, Calendar, Building2, Award, User, Edit } from 'lucide-react';

interface EmployeeDetailProps {
  employee: Employee;
  loading: boolean;
}

const EmployeeDetail = ({ employee, loading }: EmployeeDetailProps) => {
  if (loading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <p className="text-muted-foreground">Loading employee details...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              {employee.avatar ? (
                <img 
                  src={employee.avatar} 
                  alt={`${employee.firstName} ${employee.lastName}`}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <span className="text-primary text-2xl font-medium">
                  {employee.firstName.charAt(0)}
                  {employee.lastName.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{employee.firstName} {employee.lastName}</h1>
              <p className="text-muted-foreground">{employee.position}</p>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm">
              <div className={`h-2 w-2 rounded-full ${
                employee.status === 'ACTIVE' ? 'bg-green-500' : 
                employee.status === 'ON_LEAVE' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
              <span>{employee.status === 'ACTIVE' ? 'Active' : employee.status === 'ON_LEAVE' ? 'On Leave' : 'Terminated'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4" />
              <span>Joined {new Date(employee.hireDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        <Button asChild>
          <Link to={`/employees/${employee.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Link>
        </Button>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Employee's contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{employee.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{employee.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Employment Information</CardTitle>
            <CardDescription>Details about position and department</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Department</p>
                <p className="font-medium">{employee.department.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Position</p>
                <p className="font-medium">{employee.position}</p>
              </div>
            </div>
            {employee.manager ? (
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Manager</p>
                  <Link to={`/employees/${employee.manager.id}`} className="font-medium text-primary hover:underline">
                    {employee.manager.firstName} {employee.manager.lastName} - {employee.manager.position}
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Manager</p>
                  <p className="font-medium text-muted-foreground italic">Top-level management</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeDetail;
