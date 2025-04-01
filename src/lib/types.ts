
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'HR' | 'MANAGER' | 'EMPLOYEE';
  firstName: string;
  lastName: string;
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
  type: 'ANNUAL' | 'SICK' | 'MATERNITY' | 'PATERNITY' | 'OTHER';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  reason: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaySlip {
  id: string;
  employeeId: string;
  employee: Employee;
  period: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
  netSalary: number;
  status: 'DRAFT' | 'FINALIZED' | 'PAID';
  createdAt: string;
}

export interface Performance {
  id: string;
  employeeId: string;
  employee: Employee;
  reviewerId: string;
  reviewer: Employee;
  period: string;
  rating: number;
  comments: string;
  goals: string[];
  createdAt: string;
}

export interface DepartmentStats {
  name: string;
  employeeCount: number;
}

export interface LeaveStats {
  pending: number;
  approved: number;
  rejected: number;
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
