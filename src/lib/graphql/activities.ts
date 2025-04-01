import { gql } from '@apollo/client';

// Requête pour obtenir les activités récentes
export const GET_RECENT_ACTIVITIES = gql`
  query GetRecentActivities($limit: Int) {
    recentActivities(limit: $limit) {
      id
      type
      message
      date
      user {
        id
        name
        avatar
      }
    }
  }
`;

// Types pour les réponses GraphQL
export interface ActivitiesResponse {
  recentActivities: Array<{
    id: string;
    type: string;
    message: string;
    date: string;
    user: {
      id: string;
      name: string;
      avatar?: string;
    };
  }>;
}