
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Employee } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';

interface EmployeeListProps {
  employees: Employee[];
  loading: boolean;
}

const EmployeeList = ({ employees, loading }: EmployeeListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredEmployees = employees.filter(employee => 
    employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search employees..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Button asChild>
          <Link to="/employees/new">
            <Plus className="mr-2 h-4 w-4" /> Add Employee
          </Link>
        </Button>
      </div>
      
      {loading ? (
        <div className="h-[400px] flex items-center justify-center">
          <p className="text-muted-foreground">Loading employees...</p>
        </div>
      ) : (
        <>
          {filteredEmployees.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No employees found</h3>
              <p className="text-muted-foreground">
                {searchTerm 
                  ? `No results for "${searchTerm}". Try a different search term.` 
                  : "No employees in the system yet."}
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Hire Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                            {employee.avatar ? (
                              <img 
                                src={employee.avatar} 
                                alt={`${employee.firstName} ${employee.lastName}`}
                                className="h-full w-full rounded-full object-cover"
                              />
                            ) : (
                              <span className="text-primary font-medium">
                                {employee.firstName.charAt(0)}
                                {employee.lastName.charAt(0)}
                              </span>
                            )}
                          </div>
                          <div>
                            <Link 
                              to={`/employees/${employee.id}`}
                              className="font-medium hover:underline"
                            >
                              {employee.firstName} {employee.lastName}
                            </Link>
                            <p className="text-xs text-muted-foreground">
                              {employee.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.department.name}</TableCell>
                      <TableCell>
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                          <span className={`mr-1 h-1.5 w-1.5 rounded-full ${
                            employee.status === 'ACTIVE'
                              ? 'bg-green-500'
                              : employee.status === 'ON_LEAVE'
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}></span>
                          {employee.status === 'ACTIVE' 
                            ? 'Active' 
                            : employee.status === 'ON_LEAVE' 
                            ? 'On Leave' 
                            : 'Terminated'}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(employee.hireDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            asChild
                          >
                            <Link to={`/employees/${employee.id}/edit`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-destructive hover:text-destructive/90"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EmployeeList;
