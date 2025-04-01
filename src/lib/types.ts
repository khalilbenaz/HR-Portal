
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'HR' | 'MANAGER' | 'EMPLOYEE';
  firstName: string;
  lastName: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface AuthContextType {
  auth: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearErrors: () => void;
}

export interface Department {
  id: string;
  name: string;
  managerId: string;
  employeeCount: number;
}

export interface Employee {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: Department;
  manager: Employee | null;
  hireDate: string;
  status: 'ACTIVE' | 'ON_LEAVE' | 'TERMINATED';
  avatar?: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employee: Employee;
  startDate: string;
  endDate: string;
  type: 'SICK' | 'ANNUAL' | 'MATERNITY' | 'PATERNITY' | 'OTHER';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  reason: string;
  createdAt: string;
  updatedAt: string;
}

export interface DepartmentStats {
  name: string;
  employeeCount: number;
}

export interface Activity {
  id: string;
  type: 'EMPLOYEE_ADDED' | 'EMPLOYEE_UPDATED' | 'LEAVE_REQUESTED' | 'LEAVE_APPROVED' | 'LEAVE_REJECTED' | 'PAYSLIP_GENERATED';
  message: string;
  date: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
}

// Payroll types
export interface Payslip {
  id: string;
  employeeId: string;
  employeeName?: string;
  period: string;
  issueDate: string;
  grossAmount: number;
  netAmount: number;
  currency: string;
  status: 'DRAFT' | 'ISSUED' | 'PAID';
}

// Performance types
export interface Review {
  id: string;
  employeeId: string;
  reviewerId: string;
  reviewerName: string;
  period: string;
  submissionDate: string;
  score: number;
  strengths: string;
  improvements: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface Goal {
  id: string;
  employeeId: string;
  title: string;
  description: string;
  startDate: string;
  targetDate: string;
  completedDate: string;
  progress: number;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
}
