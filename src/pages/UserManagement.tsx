import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '../types';
import { Plus, Edit, Trash, Eye, EyeOff, Search, X } from 'lucide-react';
import toast from 'react-hot-toast';

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'partner',
    agent_key: '',
    partner_name: '',
    image_url: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('You must be logged in to view users');
        return;
      }
      
      // Check if user is admin
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('id', session.user.id)
        .single();
      
      if (userError) {
        console.error('Error fetching user role:', userError);
        toast.error('Failed to verify permissions');
        return;
      }
      
      if (!userData || userData.role !== 'admin') {
        toast.error('You must be an admin to view users');
        return;
      }
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setUsers(data as User[]);
      
      // Log activity
      try {
        await supabase.from('activity_logs').insert({
          user_id: session.user.id,
          user_email: session.user.email,
          action: 'view_users',
          details: 'User viewed user management',
        });
      } catch (logError) {
        console.error('Error logging activity:', logError);
        // Continue even if logging fails
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddUser = () => {
    setFormData({
      email: '',
      password: '',
      name: '',
      role: 'partner',
      agent_key: '',
      partner_name: '',
      image_url: '',
    });
    setShowPassword(false);
    setShowAddModal(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setFormData({
      email: user.email,
      password: '',
      name: user.name,
      role: user.role,
      agent_key: user.agent_key,
      partner_name: user.partner_name,
      image_url: user.image_url || '',
    });
    setShowPassword(false);
    setShowEditModal(true);
  };

  const handleDeleteUser = async (user: User) => {
    if (!confirm(`Are you sure you want to delete user ${user.name}? This action cannot be undone.`)) {
      return;
    }
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('You must be logged in to delete users');
        return;
      }
      
      // Check if user is admin
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('id', session.user.id)
        .single();
      
      if (userError) {
        console.error('Error fetching user role:', userError);
        toast.error('Failed to verify permissions');
        return;
      }
      
      if (!userData || userData.role !== 'admin') {
        toast.error('You must be an admin to delete users');
        return;
      }
      
      // Delete user from users table first
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', user.id);
      
      if (error) {
        console.error('Error deleting user from users table:', error);
        throw error;
      }
      
      // Update local state
      setUsers(users.filter(u => u.id !== user.id));
      
      // Log activity
      try {
        await supabase.from('activity_logs').insert({
          user_id: session.user.id,
          user_email: session.user.email,
          action: 'delete_user',
          details: `User deleted user: ${user.email}`,
        });
      } catch (logError) {
        console.error('Error logging activity:', logError);
        // Continue even if logging fails
      }
      
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  const handleSaveUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('You must be logged in to add users');
        return;
      }
      
      // Check if user is admin
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('id', session.user.id)
        .single();
      
      if (userError) {
        console.error('Error fetching user role:', userError);
        toast.error('Failed to verify permissions');
        return;
      }
      
      if (!userData || userData.role !== 'admin') {
        toast.error('You must be an admin to add users');
        return;
      }
      
      // Validate form
      if (!formData.email || !formData.name || !formData.role || !formData.agent_key || !formData.partner_name) {
        toast.error('Please fill in all required fields');
        return;
      }
      
      if (showAddModal && !formData.password) {
        toast.error('Password is required for new users');
        return;
      }
      
      if (showAddModal) {
        // Check if user already exists
        try {
          const { data: existingUsers, error: existingUserError } = await supabase
            .from('users')
            .select('id')
            .eq('email', formData.email);
            
          if (existingUserError) {
            console.error('Error checking existing user:', existingUserError);
          }
          
          if (existingUsers && existingUsers.length > 0) {
            toast.error('A user with this email already exists');
            return;
          }
        } catch (checkError) {
          console.error('Error checking existing user:', checkError);
          // Continue with user creation even if check fails
        }
        
        // Create user in Supabase Auth using signUp instead of admin API
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
              role: formData.role
            }
          }
        });
        
        if (authError) {
          console.error('Error creating user in auth:', authError);
          throw authError;
        }
        
        if (!authData.user) {
          throw new Error('Failed to create user');
        }
        
        // Create user in users table
        const { error } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: formData.email,
            name: formData.name,
            role: formData.role,
            agent_key: formData.agent_key,
            partner_name: formData.partner_name,
            image_url: formData.image_url || null,
            created_at: new Date().toISOString(),
          });
        
        if (error) {
          console.error('Error creating user in users table:', error);
          throw error;
        }
        
        // Log activity
        try {
          await supabase.from('activity_logs').insert({
            user_id: session.user.id,
            user_email: session.user.email,
            action: 'create_user',
            details: `User created user: ${formData.email}`,
          });
        } catch (logError) {
          console.error('Error logging activity:', logError);
          // Continue even if logging fails
        }
        
        toast.success('User added successfully');
      } else if (showEditModal && selectedUser) {
        // Update user in users table
        const { error } = await supabase
          .from('users')
          .update({
            name: formData.name,
            role: formData.role,
            agent_key: formData.agent_key,
            partner_name: formData.partner_name,
            image_url: formData.image_url || null,
          })
          .eq('id', selectedUser.id);
        
        if (error) {
          console.error('Error updating user in users table:', error);
          throw error;
        }
        
        // Update password if provided - use standard update password method
        if (formData.password) {
          const { error: passwordError } = await supabase.auth.updateUser({
            password: formData.password
          });
          
          if (passwordError) {
            console.error('Error updating password:', passwordError);
            toast.error('Failed to update password, but user details were saved');
          }
        }
        
        // Log activity
        try {
          await supabase.from('activity_logs').insert({
            user_id: session.user.id,
            user_email: session.user.email,
            action: 'update_user',
            details: `User updated user: ${selectedUser.email}`,
          });
        } catch (logError) {
          console.error('Error logging activity:', logError);
          // Continue even if logging fails
        }
        
        toast.success('User updated successfully');
      }
      
      // Refresh users list
      await fetchUsers();
      
      // Close modals
      setShowAddModal(false);
      setShowEditModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error saving user:', error);
      toast.error('Failed to save user');
    }
  };

  const handleAutoFill = async () => {
    if (!formData.email) {
      toast.error('Please enter an email address');
      return;
    }
    
    try {
      // Check if email is from norr3.fi domain
      if (formData.email.endsWith('@norr3.fi')) {
        setFormData(prev => ({
          ...prev,
          role: 'admin',
          partner_name: 'NØRR3',
          agent_key: 'norr3-admin',
          name: formData.email.split('@')[0].replace('.', ' '),
        }));
        return;
      }
      
      // For Kiinteistömaailma emails
      if (formData.email.endsWith('@kiinteistomaailma.fi')) {
        // Try to fetch agent info from JSON feed
        try {
          const jsonFeedUrl = import.meta.env.VITE_JSON_FEED_URL;
          if (!jsonFeedUrl) {
            throw new Error('JSON feed URL is not defined');
          }
          
          const response = await fetch(jsonFeedUrl);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          
          const agentInfo = data.find((apt: any) => 
            apt.agent && 
            apt.agent.email && 
            apt.agent.email.toLowerCase() === formData.email.toLowerCase()
          );
          
          if (agentInfo && agentInfo.agent) {
            setFormData(prev => ({
              ...prev,
              name: agentInfo.agent.name || prev.name,
              agent_key: agentInfo.agent.key || prev.agent_key,
              partner_name: 'Kiinteistömaailma',
              image_url: agentInfo.agent.pictureUrl || prev.image_url,
            }));
            toast.success('Agent information found');
          } else {
            // Default values for Kiinteistömaailma
            setFormData(prev => ({
              ...prev,
              partner_name: 'Kiinteistömaailma',
              name: formData.email.split('@')[0].replace('.', ' '),
              agent_key: `km-${Date.now()}`,
            }));
          }
        } catch (fetchError) {
          console.error('Error fetching JSON feed:', fetchError);
          // Default values for Kiinteistömaailma if fetch fails
          setFormData(prev => ({
            ...prev,
            partner_name: 'Kiinteistömaailma',
            name: formData.email.split('@')[0].replace('.', ' '),
            agent_key: `km-${Date.now()}`,
          }));
        }
      } else {
        // Default values for other domains
        setFormData(prev => ({
          ...prev,
          name: formData.email.split('@')[0].replace('.', ' '),
          partner_name: formData.email.split('@')[1].split('.')[0],
          agent_key: `agent-${Date.now()}`,
        }));
      }
    } catch (error) {
      console.error('Error auto-filling user data:', error);
      toast.error('Failed to auto-fill user data');
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.partner_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        
        <div className="flex flex-wrap items-center gap-2 mt-4 md:mt-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={handleAddUser}
            className="flex items-center px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors"
          >
            <Plus size={18} className="mr-2" />
            Add User
          </button>
        </div>
      </div>
      
      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Partner
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agent Key
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {user.image_url ? (
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={user.image_url}
                              alt={user.name}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                              <span className="text-purple-800 font-medium">
                                {user.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role === 'admin' ? 'Admin' : 'Partner'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.partner_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.agent_key}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit size={18} />
                        </button>
                        
                        <button
                          onClick={() => handleDeleteUser(user)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                Add New User
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter email"
                      required
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={handleAutoFill}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Auto Fill
                    </button>
                  </div>
                </div>
                
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-8 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="partner">Partner</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Agent Key
                  </label>
                  <input
                    type="text"
                    name="agent_key"
                    value={formData.agent_key}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter agent key"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Partner Name
                  </label>
                  <input
                    type="text"
                    name="partner_name"
                    value={formData.partner_name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter partner name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL (optional)
                  </label>
                  <input
                    type="url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter image URL"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end p-6 border-t">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 mr-2"
              >
                Cancel
              </button>
              
              <button
                onClick={handleSaveUser}
                className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition-colors"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                Edit User: {selectedUser.name}
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                  <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                </div>
                
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Leave blank to keep current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-8 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="partner">Partner</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Agent Key
                  </label>
                  <input
                    type="text"
                    name="agent_key"
                    value={formData.agent_key}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter agent key"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Partner Name
                  </label>
                  <input
                    type="text"
                    name="partner_name"
                    value={formData.partner_name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter partner name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL (optional)
                  </label>
                  <input
                    type="url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter image URL"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end p-6 border-t">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 mr-2"
              >
                Cancel
              </button>
              
              <button
                onClick={handleSaveUser}
                className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;