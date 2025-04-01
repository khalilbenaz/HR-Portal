
import { Activity } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { 
  UserPlus, 
  UserCog, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  FileText 
} from 'lucide-react';

interface RecentActivityProps {
  activities: Activity[];
}

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'EMPLOYEE_ADDED':
      return <UserPlus className="h-4 w-4" />;
    case 'EMPLOYEE_UPDATED':
      return <UserCog className="h-4 w-4" />;
    case 'LEAVE_REQUESTED':
      return <Calendar className="h-4 w-4" />;
    case 'LEAVE_APPROVED':
      return <CheckCircle className="h-4 w-4" />;
    case 'LEAVE_REJECTED':
      return <XCircle className="h-4 w-4" />;
    case 'PAYSLIP_GENERATED':
      return <FileText className="h-4 w-4" />;
    default:
      return null;
  }
};

const getActivityColor = (type: Activity['type']) => {
  switch (type) {
    case 'EMPLOYEE_ADDED':
      return 'bg-green-100 text-green-600';
    case 'EMPLOYEE_UPDATED':
      return 'bg-blue-100 text-blue-600';
    case 'LEAVE_REQUESTED':
      return 'bg-yellow-100 text-yellow-600';
    case 'LEAVE_APPROVED':
      return 'bg-green-100 text-green-600';
    case 'LEAVE_REJECTED':
      return 'bg-red-100 text-red-600';
    case 'PAYSLIP_GENERATED':
      return 'bg-purple-100 text-purple-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

const RecentActivity = ({ activities }: RecentActivityProps) => {
  if (activities.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No recent activities
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div 
          key={activity.id}
          className="flex items-start gap-3 p-3 rounded-lg border bg-card"
        >
          <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
            {getActivityIcon(activity.type)}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium line-clamp-2">{activity.message}</p>
            <div className="flex items-center mt-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {activity.user.avatar ? (
                    <img 
                      src={activity.user.avatar} 
                      alt={activity.user.name} 
                      className="h-4 w-4 rounded-full mr-1"
                    />
                  ) : (
                    <span className="h-4 w-4 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] mr-1">
                      {activity.user.name.charAt(0)}
                    </span>
                  )}
                  <span>{activity.user.name}</span>
                </div>
                <span>•</span>
                <span>{formatDistanceToNow(new Date(activity.date), { addSuffix: true })}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;
