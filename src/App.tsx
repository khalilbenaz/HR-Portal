
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "./hooks/useAuth";

// Layouts
import MainLayout from "./components/layout/MainLayout";

// Pages
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import EmployeesPage from "./pages/EmployeesPage";
import EmployeeDetailPage from "./pages/EmployeeDetailPage";
import AddEmployeePage from "./pages/AddEmployeePage";
import EditEmployeePage from "./pages/EditEmployeePage";
import LeaveRequestsPage from "./pages/LeaveRequestsPage";
import LeaveRequestDetailPage from "./pages/LeaveRequestDetailPage";
import AddLeaveRequestPage from "./pages/AddLeaveRequestPage";
import PayrollPage from "./pages/PayrollPage";
import PayslipDetailPage from "./pages/PayslipDetailPage";
import PerformancePage from "./pages/PerformancePage";
import AddGoalPage from "./pages/AddGoalPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useAuth();
  
  if (auth.loading) {
    return <div>Loading...</div>;
  }
  
  return auth.isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected routes */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Employee Routes */}
        <Route 
          path="/employees" 
          element={
            <ProtectedRoute>
              <EmployeesPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/employees/add" 
          element={
            <ProtectedRoute>
              <AddEmployeePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/employees/:id" 
          element={
            <ProtectedRoute>
              <EmployeeDetailPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/employees/:id/edit" 
          element={
            <ProtectedRoute>
              <EditEmployeePage />
            </ProtectedRoute>
          } 
        />
        
        {/* Leave Request Routes */}
        <Route 
          path="/leaves" 
          element={
            <ProtectedRoute>
              <LeaveRequestsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/leaves/add" 
          element={
            <ProtectedRoute>
              <AddLeaveRequestPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/leaves/:id" 
          element={
            <ProtectedRoute>
              <LeaveRequestDetailPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Payroll Routes */}
        <Route 
          path="/payroll" 
          element={
            <ProtectedRoute>
              <PayrollPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/payroll/:id" 
          element={
            <ProtectedRoute>
              <PayslipDetailPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Performance Routes */}
        <Route 
          path="/performance" 
          element={
            <ProtectedRoute>
              <PerformancePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/performance/goals/add" 
          element={
            <ProtectedRoute>
              <AddGoalPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
          <Toaster />
          <Sonner />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
