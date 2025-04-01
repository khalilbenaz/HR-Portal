import { gql } from '@apollo/client';

// Fragment pour les données communes d'un employé
const EMPLOYEE_FRAGMENT = gql`
  fragment EmployeeFields on Employee {
    id
    userId
    firstName
    lastName
    email
    phone
    position
    department {
      id
      name
    }
    manager {
      id
      firstName
      lastName
    }
    hireDate
    status
    avatar
  }
`;

// Requête pour obtenir tous les employés
export const GET_EMPLOYEES = gql`
  query GetEmployees {
    employees {
      ...EmployeeFields
    }
  }
  ${EMPLOYEE_FRAGMENT}
`;

// Requête pour obtenir un employé par son ID
export const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    employee(id: $id) {
      ...EmployeeFields
    }
  }
  ${EMPLOYEE_FRAGMENT}
`;

// Mutation pour créer un nouvel employé
export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($input: EmployeeInput!) {
    createEmployee(input: $input) {
      ...EmployeeFields
    }
  }
  ${EMPLOYEE_FRAGMENT}
`;

// Mutation pour mettre à jour un employé
export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $input: EmployeeInput!) {
    updateEmployee(id: $id, input: $input) {
      ...EmployeeFields
    }
  }
  ${EMPLOYEE_FRAGMENT}
`;

// Mutation pour supprimer un employé
export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      id
      success
    }
  }
`;

// Types pour les réponses GraphQL
export interface EmployeesResponse {
  employees: Array<{
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    position: string;
    department: {
      id: string;
      name: string;
    };
    manager: {
      id: string;
      firstName: string;
      lastName: string;
    } | null;
    hireDate: string;
    status: string;
    avatar?: string;
  }>;
}

export interface EmployeeResponse {
  employee: {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    position: string;
    department: {
      id: string;
      name: string;
    };
    manager: {
      id: string;
      firstName: string;
      lastName: string;
    } | null;
    hireDate: string;
    status: string;
    avatar?: string;
  } | null;
}