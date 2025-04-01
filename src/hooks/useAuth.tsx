
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, AuthState, AuthContextType } from '@/lib/types';
import { toast } from '@/components/ui/use-toast';
import { useMutation, useQuery } from '@apollo/client';
import { LOGIN_MUTATION, CURRENT_USER_QUERY, LoginResponse, CurrentUserResponse } from '@/lib/graphql/auth';

// Commentaire pour le développement - à supprimer en production
// Ces données mockées sont conservées en commentaire pour référence
/*
Données de test :
- admin@example.com / password (ADMIN)
- hr@example.com / password (HR)
- manager@example.com / password (MANAGER)
- employee@example.com / password (EMPLOYEE)
*/

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(initialState);
  const navigate = useNavigate();
  
  // Mutation pour se connecter
  const [loginMutation, { loading: loginLoading }] = useMutation<LoginResponse>(LOGIN_MUTATION, {
    onError: (error) => {
      setAuth(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Une erreur est survenue lors de la connexion'
      }));
      
      toast({
        variant: "destructive",
        title: "Échec de connexion",
        description: error.message || 'Une erreur est survenue lors de la connexion',
      });
    }
  });
  
  // Requête pour obtenir l'utilisateur actuel
  const { refetch: refetchCurrentUser } = useQuery<CurrentUserResponse>(CURRENT_USER_QUERY, {
    skip: !auth.token, // Ne pas exécuter la requête si aucun token n'est disponible
    onCompleted: (data) => {
      if (data?.me) {
        setAuth(prev => ({
          ...prev,
          user: data.me as User,
          isAuthenticated: true,
          loading: false
        }));
      }
    },
    onError: () => {
      // En cas d'erreur, on considère que l'utilisateur n'est pas authentifié
      logout();
    }
  });
  
  // Vérifier l'authentification au chargement de l'application
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        const user = JSON.parse(storedUser) as User;
        setAuth({
          user,
          token,
          isAuthenticated: true,
          loading: false,
          error: null
        });
        
        // Vérifier la validité du token en récupérant l'utilisateur actuel
        refetchCurrentUser();
      } catch (error) {
        // Si le parsing échoue, on déconnecte l'utilisateur
        logout();
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    setAuth(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await loginMutation({
        variables: { email, password }
      });
      
      if (response.data?.login) {
        const { token, user } = response.data.login;
        
        // Sauvegarder le token et l'utilisateur dans le localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        setAuth({
          user: user as User,
          token,
          isAuthenticated: true,
          loading: false,
          error: null
        });
        
        toast({
          title: "Connexion réussie",
          description: `Bienvenue, ${user.firstName}!`,
        });
        
        navigate('/dashboard');
      }
    } catch (error) {
      // L'erreur est déjà gérée par onError du useMutation
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    setAuth({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null
    });
    
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès",
    });
    
    navigate('/login');
  };

  const clearErrors = () => {
    setAuth(prev => ({ ...prev, error: null }));
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, clearErrors }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
