
import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, AuthState, AuthContextType } from '@/lib/types';
import { toast } from '@/components/ui/use-toast';

// Mock authentication service - to be replaced with actual GraphQL calls
const mockLogin = async (email: string, password: string): Promise<{ user: User; token: string }> => {
  // In a real app, this would be an API call
  if (email === 'admin@example.com' && password === 'password') {
    return {
      user: {
        id: '1',
        username: 'admin',
        email: 'admin@example.com',
        role: 'ADMIN',
        firstName: 'Admin',
        lastName: 'User'
      },
      token: 'mock-jwt-token'
    };
  }
  
  if (email === 'hr@example.com' && password === 'password') {
    return {
      user: {
        id: '2',
        username: 'hr',
        email: 'hr@example.com',
        role: 'HR',
        firstName: 'HR',
        lastName: 'Manager'
      },
      token: 'mock-jwt-token'
    };
  }
  
  if (email === 'manager@example.com' && password === 'password') {
    return {
      user: {
        id: '3',
        username: 'manager',
        email: 'manager@example.com',
        role: 'MANAGER',
        firstName: 'Department',
        lastName: 'Manager'
      },
      token: 'mock-jwt-token'
    };
  }
  
  if (email === 'employee@example.com' && password === 'password') {
    return {
      user: {
        id: '4',
        username: 'employee',
        email: 'employee@example.com',
        role: 'EMPLOYEE',
        firstName: 'Regular',
        lastName: 'Employee'
      },
      token: 'mock-jwt-token'
    };
  }
  
  throw new Error('Invalid credentials');
};

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(initialState);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setAuth(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { user, token } = await mockLogin(email, password);
      
      // Save token to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setAuth({
        user,
        token,
        isAuthenticated: true,
        loading: false,
        error: null
      });
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.firstName}!`,
      });
      
      navigate('/dashboard');
    } catch (error) {
      setAuth(prev => ({ 
        ...prev, 
        loading: false, 
        error: error instanceof Error ? error.message : 'An unknown error occurred' 
      }));
      
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    setAuth({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null
    });
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    navigate('/login');
  };

  const clearErrors = () => {
    setAuth(prev => ({ ...prev, error: null }));
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, clearErrors }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
