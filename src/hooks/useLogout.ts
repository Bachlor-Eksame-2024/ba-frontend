// hooks/useLogout.ts
import { useState } from 'react';
import useUserStore from '../stores/UserStore';
import { useLocation } from 'wouter';
import { useAuth } from './useAuth';

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useUserStore();
  const { setIsAuthenticated } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, navigate] = useLocation();

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/auth/logout', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': import.meta.env.VITE_API_KEY as string,
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }
      setIsAuthenticated(false);
      setUser(null);
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading, error };
};
