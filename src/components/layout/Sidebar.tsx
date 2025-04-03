
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  CreditCard, 
  BarChart3, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  open: boolean;
}

const Sidebar = ({ open }: SidebarProps) => {
  const { auth, logout } = useAuth();
  const user = auth.user;
  
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', roles: ['ADMIN', 'HR', 'MANAGER', 'EMPLOYEE'] },
    { icon: Users, label: 'Employees', path: '/employees', roles: ['ADMIN', 'HR', 'MANAGER'] },
    { icon: Calendar, label: 'Leave Requests', path: '/leaves', roles: ['ADMIN', 'HR', 'MANAGER', 'EMPLOYEE'] },
    { icon: CreditCard, label: 'Payroll', path: '/payroll', roles: ['ADMIN', 'HR'] },
    { icon: BarChart3, label: 'Performance', path: '/performance', roles: ['ADMIN', 'HR', 'MANAGER', 'EMPLOYEE'] },
    { icon: Settings, label: 'Settings', path: '/settings', roles: ['ADMIN', 'HR'] }
  ];
  
  // Filter items based on user role
  const filteredNavItems = user 
    ? navItems.filter(item => item.roles.includes(user.role)) 
    : [];
  
  return (
    <aside 
      className={`bg-sidebar transition-all duration-300 border-r border-sidebar-border ${
        open ? 'w-64' : 'w-20'
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="h-16 flex items-center justify-center px-4 border-b border-sidebar-border">
          {open ? (
            <h1 className="text-lg font-bold text-sidebar-primary">B3G PORTAL</h1>
          ) : (
            <h1 className="text-lg font-bold text-sidebar-primary">B3G PRTL</h1>
          )}
        </div>
        
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {filteredNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `side-nav-item ${isActive ? 'active' : ''}`
                }
              >
                <item.icon size={20} />
                {open && <span>{item.label}</span>}
              </NavLink>
            ))}
          </nav>
          
          <Separator className="my-4" />
          
          <div className="px-3 py-2">
            {open && <p className="text-xs text-sidebar-foreground/70 mb-2">Account</p>}
            <div className="side-nav-item cursor-pointer" onClick={logout}>
              <LogOut size={20} />
              {open && <span>Log out</span>}
            </div>
          </div>
        </ScrollArea>
        
        {/* User profile at bottom */}
        {open && user && (
          <div className="p-3 border-t border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-sidebar-foreground/70 truncate">
                  {user.role}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
