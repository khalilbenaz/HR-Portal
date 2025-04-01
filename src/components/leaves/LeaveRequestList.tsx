
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LeaveRequest } from '@/lib/types';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Plus, 
  CheckCircle, 
  XCircle,
  Calendar 
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface LeaveRequestListProps {
  leaveRequests: LeaveRequest[];
  loading: boolean;
  userRole: 'ADMIN' | 'HR' | 'MANAGER' | 'EMPLOYEE';
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

const LeaveRequestList = ({ 
  leaveRequests, 
  loading, 
  userRole, 
  onApprove, 
  onReject 
}: LeaveRequestListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const canApprove = userRole === 'ADMIN' || userRole === 'HR' || userRole === 'MANAGER';
  
  const filteredRequests = leaveRequests.filter(request => 
    request.employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.status.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusBadgeColor = (status: LeaveRequest['status']) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'REJECTED':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };
  
  const getTypeLabel = (type: LeaveRequest['type']) => {
    switch (type) {
      case 'ANNUAL':
        return 'Annual Leave';
      case 'SICK':
        return 'Sick Leave';
      case 'MATERNITY':
        return 'Maternity Leave';
      case 'PATERNITY':
        return 'Paternity Leave';
      default:
        return 'Other';
    }
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search leave requests..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Button asChild>
          <Link to="/leaves/new">
            <Plus className="mr-2 h-4 w-4" /> Request Leave
          </Link>
        </Button>
      </div>
      
      {loading ? (
        <div className="h-[400px] flex items-center justify-center">
          <p className="text-muted-foreground">Loading leave requests...</p>
        </div>
      ) : (
        <>
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No leave requests found</h3>
              <p className="text-muted-foreground">
                {searchTerm 
                  ? `No results for "${searchTerm}". Try a different search term.` 
                  : "No leave requests in the system yet."}
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    {canApprove && <TableHead className="text-right">Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            {request.employee.avatar ? (
                              <img 
                                src={request.employee.avatar} 
                                alt={`${request.employee.firstName} ${request.employee.lastName}`}
                                className="h-full w-full rounded-full object-cover"
                              />
                            ) : (
                              <span className="text-primary text-sm font-medium">
                                {request.employee.firstName.charAt(0)}
                                {request.employee.lastName.charAt(0)}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-medium">
                              {request.employee.firstName} {request.employee.lastName}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{getTypeLabel(request.type)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>From: {new Date(request.startDate).toLocaleDateString()}</p>
                          <p>To: {new Date(request.endDate).toLocaleDateString()}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(request.status)}`}>
                          {request.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
                        </span>
                      </TableCell>
                      {canApprove && (
                        <TableCell className="text-right">
                          {request.status === 'PENDING' && (
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="h-8 border-green-500 text-green-600 hover:bg-green-50"
                                onClick={() => onApprove && onApprove(request.id)}
                              >
                                <CheckCircle className="mr-1 h-4 w-4" />
                                Approve
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="h-8 border-red-500 text-red-600 hover:bg-red-50"
                                onClick={() => onReject && onReject(request.id)}
                              >
                                <XCircle className="mr-1 h-4 w-4" />
                                Reject
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      )}
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

export default LeaveRequestList;
