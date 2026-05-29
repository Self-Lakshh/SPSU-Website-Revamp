import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import type { UserRole } from '../../types';
import PageLoader from './PageLoader';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, loading, initialize } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = initialize();
    return () => unsubscribe();
  }, [initialize]);

  if (loading) {
    return <PageLoader />;
  }

  if (!user) {
    // Redirect to login page and save the current location they tried to access
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User is logged in but doesn't have the correct permission
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
