import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect, useRef } from 'react';
import { supabase } from './lib/supabase';
import { User } from './types';
import toast from 'react-hot-toast';
import { applyMigration } from './lib/applyMigration';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import UserManagement from './pages/UserManagement';
import ActivityLog from './pages/ActivityLog';
import MediaCosts from './pages/MediaCosts';
import NotFound from './pages/NotFound';

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Separate component for routes to use hooks
function AppRoutes() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const authCheckInProgress = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Prevent multiple simultaneous auth checks
    if (authCheckInProgress.current) return;
    
    const checkAuth = async () => {
      try {
        authCheckInProgress.current = true;
        console.log('App: Checking authentication status...');
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          await supabase.auth.signOut();
          setUser(null);
          setLoading(false);
          setAuthChecked(true);
          return;
        }

        if (!session) {
          console.log('No active session');
          await supabase.auth.signOut();
          setUser(null);
          setLoading(false);
          setAuthChecked(true);
          return;
        }

        // Get user profile data
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (userError || !userData) {
          console.error('Error fetching user data:', userError);
          await supabase.auth.signOut();
          setUser(null);          
        } else {
          setUser(userData);
          if (location.pathname === '/login') {
            navigate('/');
          }
        }
        
        setLoading(false);
        setAuthChecked(true);
      } catch (error) {
        console.error('App: Auth check error:', error);
        await supabase.auth.signOut();
        setUser(null);
        setLoading(false);
        setAuthChecked(true);
      } finally {
        authCheckInProgress.current = false;
      }
    };

    checkAuth();
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log('Auth state change event:', event);
      
      if (event === 'SIGNED_IN' && newSession) {
        try {
          // Get user profile data
          const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', newSession.user.id)
            .maybeSingle();
          
          if (error) {
            console.error('Error fetching user data on auth change:', error);
            await supabase.auth.signOut();
            setUser(null);            
            return;            
          }
          
          if (userData) {
            console.log('Auth state change: User found in database');
            setUser(userData as User);
            console.log('Auth state change: User set from database');
            if (location.pathname === '/login') {
              navigate('/');
            }
          } else {
            console.log('Auth state change: User not found in database');
            await supabase.auth.signOut();
            setUser(null);
          }
        } catch (error) {
          console.error('Error handling auth state change:', error);
          await supabase.auth.signOut();
          setUser(null);
        }
      } else if (event === 'SIGNED_OUT') {
        await supabase.auth.signOut();
        setUser(null);
        console.log('Auth state change: User signed out');
      }
      
      setLoading(false);
      setAuthChecked(true);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location]);
  
  // Show loading spinner only during initial load
  if (loading && !authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-purple-400">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      {authChecked && (
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          
          <Route element={<ProtectedRoute user={user} />}>
            <Route element={<Layout user={user} />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/activity-log" element={<ActivityLog />} />
              <Route path="/media-costs" element={<MediaCosts />} />
            </Route>
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
}

// Main App component
function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;