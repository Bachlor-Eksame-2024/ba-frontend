// components/ProtectedRoute.tsx
import { ReactNode } from 'react';
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (requireAuth && !isAuthenticated) {
    setLocation('/login');
    return null;
  }

  if (!requireAuth && isAuthenticated) {
    setLocation('/home');
    return null;
  }

  return <>{children}</>;
}
