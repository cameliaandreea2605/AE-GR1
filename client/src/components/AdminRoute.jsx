import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

/**
 * AdminRoute - Layout for routes that require authentication AND admin role
 * If the user is not authenticated or doesn't have admin role, redirects to home
 */
export const AdminRoute = () => {
  const { loggedIn, checkTokenLoading, user } = useSelector((state) => state.user);

  if (checkTokenLoading) {
    return <LoadingSpinner />;
  }

  if (!loggedIn || user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};