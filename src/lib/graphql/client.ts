import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

// Configuration du lien HTTP pour l'API GraphQL
const httpLink = createHttpLink({
  uri: process.env.VITE_GRAPHQL_API_URL || 'http://localhost:5000/graphql', // URL de l'API .NET GraphQL
});

// Gestion des erreurs
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  console.group(`[GraphQL Error] Operation: ${operation.operationName}`);
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.error('[GraphQL Error Details]', {
        message,
        locations,
        path,
        extensions,
        operationName: operation.operationName,
        variables: operation.variables
      });
    });
  }
  if (networkError) {
    console.error('[Network Error Details]', {
      error: networkError,
      operationName: operation.operationName,
      variables: operation.variables
    });
  }
  console.groupEnd();
  
  // Log avant de forwarder la requête
  console.log('[GraphQL Request]', {
    operationName: operation.operationName,
    query: operation.query,
    variables: operation.variables
  });
  
  return forward(operation);
});

// Ajout du token d'authentification aux en-têtes
const authLink = setContext((_, { headers }) => {
  // Récupération du token depuis le localStorage
  const token = localStorage.getItem('token');
  
  // Retourne les en-têtes avec le token d'authentification si disponible
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Création du client Apollo
const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export default client;