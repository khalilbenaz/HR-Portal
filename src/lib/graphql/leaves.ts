import { gql } from '@apollo/client';

// Fragment pour les données communes d'une demande de congé
const LEAVE_REQUEST_FRAGMENT = gql`
  fragment LeaveRequestFields on LeaveRequest {
    id
    employeeId
    employee {
      id
      firstName
      lastName
      email
      department {
        id
        name
      }
    }
    startDate
    endDate
    type
    status
    reason
    createdAt
    updatedAt
    notifications {
      id
      leaveRequestId
      recipientId
      recipientRole
      read
      createdAt
    }
  }
`;

// Requête pour obtenir toutes les demandes de congés
export const GET_LEAVE_REQUESTS = gql`
  query GetLeaveRequests {
    leaveRequests {
      ...LeaveRequestFields
    }
  }
  ${LEAVE_REQUEST_FRAGMENT}
`;

// Requête pour obtenir une demande de congé par son ID
export const GET_LEAVE_REQUEST = gql`
  query GetLeaveRequest($id: ID!) {
    leaveRequest(id: $id) {
      ...LeaveRequestFields
    }
  }
  ${LEAVE_REQUEST_FRAGMENT}
`;

// Requête pour obtenir les demandes de congés d'un employé
export const GET_EMPLOYEE_LEAVE_REQUESTS = gql`
  query GetEmployeeLeaveRequests($employeeId: ID!) {
    employeeLeaveRequests(employeeId: $employeeId) {
      ...LeaveRequestFields
    }
  }
  ${LEAVE_REQUEST_FRAGMENT}
`;

// Mutation pour créer une nouvelle demande de congé
export const CREATE_LEAVE_REQUEST = gql`
  mutation CreateLeaveRequest($input: LeaveRequestInput!) {
    createLeaveRequest(input: $input) {
      ...LeaveRequestFields
    }
  }
  ${LEAVE_REQUEST_FRAGMENT}
`;

// Mutation pour mettre à jour une demande de congé
export const UPDATE_LEAVE_REQUEST = gql`
  mutation UpdateLeaveRequest($id: ID!, $input: LeaveRequestInput!) {
    updateLeaveRequest(id: $id, input: $input) {
      ...LeaveRequestFields
    }
  }
  ${LEAVE_REQUEST_FRAGMENT}
`;

// Mutation pour approuver une demande de congé
export const APPROVE_LEAVE_REQUEST = gql`
  mutation ApproveLeaveRequest($id: ID!) {
    approveLeaveRequest(id: $id) {
      ...LeaveRequestFields
    }
  }
  ${LEAVE_REQUEST_FRAGMENT}
`;

// Mutation pour rejeter une demande de congé
export const REJECT_LEAVE_REQUEST = gql`
  mutation RejectLeaveRequest($id: ID!, $reason: String) {
    rejectLeaveRequest(id: $id, reason: $reason) {
      ...LeaveRequestFields
    }
  }
  ${LEAVE_REQUEST_FRAGMENT}
`;

// Types pour les réponses GraphQL
export interface LeaveRequestsResponse {
  leaveRequests: Array<{
    id: string;
    employeeId: string;
    employee: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      department: {
        id: string;
        name: string;
      };
    };
    startDate: string;
    endDate: string;
    type: string;
    status: string;
    reason: string;
    createdAt: string;
    updatedAt: string;
    notifications?: Array<{
      id: string;
      leaveRequestId: string;
      recipientId: string;
      recipientRole: string;
      read: boolean;
      createdAt: string;
    }>;
  }>;
}

export interface LeaveRequestResponse {
  leaveRequest: {
    id: string;
    employeeId: string;
    employee: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      department: {
        id: string;
        name: string;
      };
    };
    startDate: string;
    endDate: string;
    type: string;
    status: string;
    reason: string;
    createdAt: string;
    updatedAt: string;
    notifications?: Array<{
      id: string;
      leaveRequestId: string;
      recipientId: string;
      recipientRole: string;
      read: boolean;
      createdAt: string;
    }>;
  } | null;
}