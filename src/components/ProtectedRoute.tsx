import { Navigate, Outlet } from 'react-router-dom';
import { User } from '../types';

interface ProtectedRouteProps {
  user: User | null;
  redirectPath?: string;
}

const ProtectedRoute = ({ user, redirectPath = '/login' }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;