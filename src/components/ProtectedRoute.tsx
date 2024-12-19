import { ReactNode, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLocation } from 'wouter';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
}

export function ProtectedRoute({ children, requireAuth = true }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        setLocation('/login');
      } else if (!requireAuth && isAuthenticated) {
        setLocation('/home');
      }
    }
  }, [isLoading, isAuthenticated, requireAuth, setLocation]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if ((requireAuth && !isAuthenticated) || (!requireAuth && isAuthenticated)) {
    return null;
  }

  return <>{children}</>;
}