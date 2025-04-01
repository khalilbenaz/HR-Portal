import { gql } from '@apollo/client';

// Mutation pour se connecter
export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
        role
        firstName
        lastName
      }
    }
  }
`;

// Requête pour obtenir l'utilisateur actuel
export const CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    me {
      id
      username
      email
      role
      firstName
      lastName
    }
  }
`;

// Mutation pour se déconnecter (côté client, car généralement la déconnexion est gérée côté client)
export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout @client
  }
`;

// Types pour les réponses GraphQL
export interface LoginResponse {
  login: {
    token: string;
    user: {
      id: string;
      username: string;
      email: string;
      role: string;
      firstName: string;
      lastName: string;
    };
  };
}

export interface CurrentUserResponse {
  me: {
    id: string;
    username: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
  } | null;
}