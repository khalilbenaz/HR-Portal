
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/auth/LoginForm';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { auth, login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-hr-primary">
            Stellar HR Portal
          </h1>
          <p className="text-gray-600 mt-2">
            Employee Management System
          </p>
        </div>
        
        <Card className="shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm 
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              onSubmit={handleSubmit}
              isLoading={auth.loading}
              error={auth.error}
            />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-muted-foreground text-center">
              Test accounts (all use password: "password"):
              <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                <span className="text-left">admin@example.com</span>
                <span className="text-right font-semibold">Admin</span>
                <span className="text-left">hr@example.com</span>
                <span className="text-right font-semibold">HR</span>
                <span className="text-left">manager@example.com</span>
                <span className="text-right font-semibold">Manager</span>
                <span className="text-left">employee@example.com</span>
                <span className="text-right font-semibold">Employee</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
