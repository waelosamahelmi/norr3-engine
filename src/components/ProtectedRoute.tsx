import { Navigate, Outlet } from 'react-router-dom';
import { User } from '../types';
import { supabase } from '../lib/supabase';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  user: User | null;
}

const ProtectedRoute = ({ user }: ProtectedRouteProps) => {
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        await supabase.auth.signOut();
      }
    };
    
    checkSession();
  }, []);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;