import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, User, Mail, Phone, Calendar, Shield, Trash2, Eye, Search, Filter } from 'lucide-react';

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load users from backend API
    const loadUsers = async () => {
      try {
        // Fetch users from backend API
        const response = await fetch('http://localhost:3001/api/users');
        if (response.ok) {
          const backendUsers = await response.json();
          setUsers(backendUsers);
        }
      } catch (error) {
        console.log('Could not load users from backend:', error);
      }
      setLoading(false);
    };

    loadUsers();
  }, []);

  // Filter users
  const filteredUsers = users.filter(u => {
    const matchesSearch = 
      u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.username?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterRole === 'all' || u.role === filterRole;
    
    return matchesSearch && matchesFilter;
  });

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'owner': return 'bg-blue-100 text-blue-800';
      case 'student': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-18 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-xs text-white/60">Manage Users & Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-white text-sm font-medium">{user?.full_name || 'Admin'}</p>
                <p className="text-white/60 text-xs">{user?.email || 'admin@staybaba.com'}</p>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/30 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <p className="text-white/60 text-sm">Total Users</p>
            <p className="text-3xl font-bold text-white">{users.length}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/30 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <p className="text-white/60 text-sm">Students</p>
            <p className="text-3xl font-bold text-white">{users.filter(u => u.role === 'student').length}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <p className="text-white/60 text-sm">Owners</p>
            <p className="text-3xl font-bold text-white">{users.filter(u => u.role === 'owner').length}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-500/30 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-red-400" />
              </div>
            </div>
            <p className="text-white/60 text-sm">Admins</p>
            <p className="text-3xl font-bold text-white">{users.filter(u => u.role === 'admin').length}</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search by name, email, or username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-white/60" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all" className="bg-slate-800">All Roles</option>
              <option value="student" className="bg-slate-800">Students</option>
              <option value="owner" className="bg-slate-800">Owners</option>
              <option value="admin" className="bg-slate-800">Admins</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-white/60 font-medium text-sm">User</th>
                  <th className="px-6 py-4 text-left text-white/60 font-medium text-sm">Contact</th>
                  <th className="px-6 py-4 text-left text-white/60 font-medium text-sm">Role</th>
                  <th className="px-6 py-4 text-left text-white/60 font-medium text-sm">Joined</th>
                  <th className="px-6 py-4 text-left text-white/60 font-medium text-sm">ID</th>
                  <th className="px-6 py-4 text-center text-white/60 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredUsers.map((u, index) => (
                  <tr 
                    key={u.id || index}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{u.full_name || 'N/A'}</p>
                          <p className="text-white/40 text-sm">@{u.username || 'N/A'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white text-sm flex items-center gap-2">
                        <Mail className="w-4 h-4 text-white/40" />
                        {u.email || 'N/A'}
                      </p>
                      <p className="text-white/40 text-sm flex items-center gap-2 mt-1">
                        <Phone className="w-4 h-4" />
                        {u.phone || 'N/A'}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(u.role)}`}>
                        {u.role || 'student'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white text-sm flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-white/40" />
                        {u.created_at ? new Date(u.created_at).toLocaleDateString() : 'N/A'}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white/60 text-sm font-mono">{u.id || 'N/A'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-red-400 hover:text-red-300">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/60">No users found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
