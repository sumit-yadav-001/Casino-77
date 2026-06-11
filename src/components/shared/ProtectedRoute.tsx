import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectIsAuthenticated } from '@/features/auth/slices/authSlice';
import { ROUTES } from '@/constants/routes';

/**
 * Wraps protected routes.
 * Redirects unauthenticated users to /login, preserving the intended path.
 */
export const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        state={{ from: location }}
        replace
      />
    );
  }

  return <Outlet />;
};
