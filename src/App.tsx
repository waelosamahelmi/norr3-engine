import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
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

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Check active session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Get user profile data
          const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();
          
          if (error && error.code !== 'PGRST116') {
            console.error('Error fetching user data:', error);
            toast.error('Failed to load user profile');
            await supabase.auth.signOut(); // Sign out if we can't get user data
            setUser(null);
          } else if (userData) {
            setUser(userData as User);
            
            // If user is admin, try to apply the migration
            if (userData.role === 'admin') {
              try {
                // Check if the campaign_coordinates column exists
                const { error: checkError } = await supabase
                  .from('campaigns')
                  .select('campaign_coordinates')
                  .limit(1);
                
                if (checkError && checkError.code === 'PGRST204') {
                  // Column doesn't exist, apply migration
                  const { success, error: migrationError } = await applyMigration();
                  if (success) {
                    toast.success('Database schema updated successfully');
                  } else if (migrationError) {
                    console.error('Migration error:', migrationError);
                    toast.error('Failed to update database schema');
                  }
                }
              } catch (migrationError) {
                console.error('Error checking/applying migration:', migrationError);
              }
            }
          } else {
            // User exists in auth but not in users table
            try {
              // Create user in users table
              const { error: insertError } = await supabase.from('users').insert({
                id: session.user.id,
                email: session.user.email || '',
                name: session.user.email?.split('@')[0].replace('.', ' ') || 'User',
                role: 'partner', // Default role
                agent_key: `agent-${Date.now()}`, // Generate a temporary agent key
                partner_name: 'Kiinteistömaailma', // Default partner name
                created_at: new Date().toISOString(),
              });
              
              if (insertError) {
                console.error('Error creating user in users table:', insertError);
                toast.error('Failed to create user profile');
                await supabase.auth.signOut();
                setUser(null);
              } else {
                // Fetch the newly created user
                const { data: newUserData, error: fetchError } = await supabase
                  .from('users')
                  .select('*')
                  .eq('id', session.user.id)
                  .maybeSingle();
                
                if (fetchError || !newUserData) {
                  console.error('Error fetching new user data:', fetchError);
                  toast.error('Failed to load user profile');
                  await supabase.auth.signOut();
                  setUser(null);
                } else {
                  setUser(newUserData as User);
                }
              }
            } catch (insertError) {
              console.error('Error creating user profile:', insertError);
              toast.error('Failed to create user profile');
              await supabase.auth.signOut();
              setUser(null);
            }
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Session check error:', error);
        setUser(null);
      } finally {
        setLoading(false);
        setAuthChecked(true);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        try {
          // Get user profile data
          const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();
          
          if (error && error.code !== 'PGRST116') {
            console.error('Error fetching user data:', error);
            toast.error('Failed to load user profile');
            await supabase.auth.signOut(); // Sign out if we can't get user data
            setUser(null);
          } else if (userData) {
            setUser(userData as User);
          } else {
            // User exists in auth but not in users table
            try {
              // Create user in users table
              const { error: insertError } = await supabase.from('users').insert({
                id: session.user.id,
                email: session.user.email || '',
                name: session.user.email?.split('@')[0].replace('.', ' ') || 'User',
                role: 'partner', // Default role
                agent_key: `agent-${Date.now()}`, // Generate a temporary agent key
                partner_name: 'Kiinteistömaailma', // Default partner name
                created_at: new Date().toISOString(),
              });
              
              if (insertError) {
                console.error('Error creating user in users table:', insertError);
                toast.error('Failed to create user profile');
                await supabase.auth.signOut();
                setUser(null);
              } else {
                // Fetch the newly created user
                const { data: newUserData, error: fetchError } = await supabase
                  .from('users')
                  .select('*')
                  .eq('id', session.user.id)
                  .maybeSingle();
                
                if (fetchError || !newUserData) {
                  console.error('Error fetching new user data:', fetchError);
                  toast.error('Failed to load user profile');
                  await supabase.auth.signOut();
                  setUser(null);
                } else {
                  setUser(newUserData as User);
                }
              }
            } catch (insertError) {
              console.error('Error creating user profile:', insertError);
              toast.error('Failed to create user profile');
              await supabase.auth.signOut();
              setUser(null);
            }
          }
        } catch (error) {
          console.error('Error during sign in:', error);
          setUser(null);
        } finally {
          setLoading(false);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Show loading spinner only during initial load
  if (loading && !authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-purple-400">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <Router>
      <Toaster position="top-right" />
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
    </Router>
  );
}

export default App;