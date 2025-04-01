import { gql } from '@apollo/client';

// Requête pour obtenir tous les départements
export const GET_DEPARTMENTS = gql`
  query GetDepartments {
    departments {
      id
      name
      managerId
      employeeCount
    }
  }
`;

// Requête pour obtenir un département par son ID
export const GET_DEPARTMENT = gql`
  query GetDepartment($id: ID!) {
    department(id: $id) {
      id
      name
      managerId
      employeeCount
    }
  }
`;

// Requête pour obtenir les statistiques des départements
export const GET_DEPARTMENT_STATS = gql`
  query GetDepartmentStats {
    departmentStats {
      name
      employeeCount
    }
  }
`;

// Types pour les réponses GraphQL
export interface DepartmentsResponse {
  departments: Array<{
    id: string;
    name: string;
    managerId: string;
    employeeCount: number;
  }>;
}

export interface DepartmentResponse {
  department: {
    id: string;
    name: string;
    managerId: string;
    employeeCount: number;
  } | null;
}

export interface DepartmentStatsResponse {
  departmentStats: Array<{
    name: string;
    employeeCount: number;
  }>;
}