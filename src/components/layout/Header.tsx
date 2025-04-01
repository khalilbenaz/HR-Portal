
import { useAuth } from '@/hooks/useAuth';
import { Menu, Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const Header = ({ toggleSidebar, sidebarOpen }: HeaderProps) => {
  const { auth } = useAuth();
  const user = auth.user;
  
  return (
    <header className="h-16 bg-background border-b border-border flex items-center px-4 md:px-6">
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            <Menu size={20} />
          </Button>
          
          <div className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] lg:w-[280px] pl-8"
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative" 
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </Button>
          
          {user && (
            <div className="flex items-center gap-2 ml-2">
              <span className="hidden md:inline text-sm font-medium">
                {user.firstName} {user.lastName}
              </span>
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
