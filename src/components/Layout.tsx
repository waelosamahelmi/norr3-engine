import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { User } from '../types';
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  BarChart3, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown,
  UserCircle,
  Settings
} from 'lucide-react';
import toast from 'react-hot-toast';
import UserProfileModal from './UserProfileModal';

interface LayoutProps {
  user: User | null;
}

const Layout = ({ user }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      window.location.href = '/login';
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleProfileUpdate = async () => {
    // Refresh user data after profile update
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (userData) {
          // We can't directly update the user state here since it's passed as a prop
          // Instead, we'll reload the page to get fresh data
          window.location.reload();
        }
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-purple-900 to-purple-700 text-white transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-purple-800">
          <Link to="/" className="flex items-center">
            <img 
              src="https://norr3.fi/wp-content/uploads/2023/06/logo_valk-web.png" 
              alt="NØRR3 Logo" 
              className="h-8 w-auto"
            />
            <span className="ml-2 text-xl font-semibold">Marketing Engine</span>
          </Link>
          <button 
            className="md:hidden text-white focus:outline-none" 
            onClick={toggleSidebar}
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/" 
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/' 
                    ? 'bg-purple-800 text-white' 
                    : 'text-purple-100 hover:bg-purple-800'
                }`}
              >
                <LayoutDashboard size={20} className="mr-3" />
                <span>Dashboard</span>
              </Link>
            </li>
            
            {user?.role === 'admin' && (
              <>
                <li>
                  <Link 
                    to="/users" 
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      location.pathname === '/users' 
                        ? 'bg-purple-800 text-white' 
                        : 'text-purple-100 hover:bg-purple-800'
                    }`}
                  >
                    <Users size={20} className="mr-3" />
                    <span>User Management</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/media-costs" 
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      location.pathname === '/media-costs' 
                        ? 'bg-purple-800 text-white' 
                        : 'text-purple-100 hover:bg-purple-800'
                    }`}
                  >
                    <BarChart3 size={20} className="mr-3" />
                    <span>Media Costs</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/activity-log" 
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      location.pathname === '/activity-log' 
                        ? 'bg-purple-800 text-white' 
                        : 'text-purple-100 hover:bg-purple-800'
                    }`}
                  >
                    <Clock size={20} className="mr-3" />
                    <span>Activity Log</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-purple-800">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {user?.image_url ? (
                <img 
                  src={user.image_url} 
                  alt={user.name} 
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center">
                  <span className="text-white text-lg font-medium">
                    {user?.name?.charAt(0) || user?.email?.charAt(0) || '?'}
                  </span>
                </div>
              )}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-purple-200">{user?.role}</p>
            </div>
            <button
              onClick={() => setShowProfileModal(true)}
              className="text-purple-200 hover:text-white"
            >
              <Settings size={18} />
            </button>
          </div>
          <button 
            onClick={handleSignOut}
            className="mt-4 w-full flex items-center justify-center px-4 py-2 text-sm text-white bg-purple-800 rounded-lg hover:bg-purple-600 transition-colors"
          >
            <LogOut size={16} className="mr-2" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-4">
            <button 
              className="md:hidden text-gray-600 focus:outline-none" 
              onClick={toggleSidebar}
            >
              <Menu size={24} />
            </button>
            
            <div className="flex items-center ml-auto">
              {/* Mobile User Menu */}
              <div className="relative md:hidden">
                <button 
                  onClick={toggleUserMenu}
                  className="flex items-center text-gray-700 focus:outline-none"
                >
                  <span className="mr-2 text-sm">{user?.name}</span>
                  <ChevronDown size={16} />
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <button 
                      onClick={() => setShowProfileModal(true)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <UserCircle size={16} className="inline mr-2" />
                      Profile
                    </button>
                    <button 
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut size={16} className="inline mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
      
      {/* User Profile Modal */}
      {showProfileModal && user && (
        <UserProfileModal 
          user={user} 
          onClose={() => setShowProfileModal(false)} 
          onUpdate={handleProfileUpdate}
        />
      )}
    </div>
  );
};

export default Layout;