import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Calendar, Edit, Trash2, CheckCircle, XCircle, Clock,
  MapPin, User, DollarSign, LogOut, Menu, X, Bell, Search, Filter
} from 'lucide-react';

const mockBookings = [
  { id: 1, property: 'Luxury Apartment in Downtown', tenant: 'John Smith', date: '2024-01-15', status: 'Confirmed', amount: '$2,500', phone: '+91 9876543210', email: 'john@example.com' },
  { id: 2, property: 'Cozy Studio near Metro', tenant: 'Sarah Johnson', date: '2024-01-20', status: 'Pending', amount: '$1,800', phone: '+91 9876543211', email: 'sarah@example.com' },
  { id: 3, property: 'Modern Villa with Pool', tenant: 'Mike Davis', date: '2024-01-10', status: 'Completed', amount: '$4,200', phone: '+91 9876543212', email: 'mike@example.com' },
  { id: 4, property: 'Penthouse with City View', tenant: 'Emily Brown', date: '2024-01-25', status: 'Pending', amount: '$6,000', phone: '+91 9876543213', email: 'emily@example.com' },
  { id: 5, property: 'Luxury Apartment in Downtown', tenant: 'David Wilson', date: '2024-01-08', status: 'Confirmed', amount: '$2,500', phone: '+91 9876543214', email: 'david@example.com' },
  { id: 6, property: 'Cozy Studio near Metro', tenant: 'Lisa Anderson', date: '2024-01-05', status: 'Cancelled', amount: '$1,800', phone: '+91 9876543215', email: 'lisa@example.com' },
];

function OwnerBookings({ user }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'listings', icon: Home, label: 'My Listings' },
    { id: 'add-listing', icon: Home, label: 'Add Listing' },
    { id: 'bookings', icon: Calendar, label: 'Bookings' },
    { id: 'payments', icon: Home, label: 'Payments' },
    { id: 'messages', icon: Home, label: 'Messages' },
    { id: 'settings', icon: Home, label: 'Settings' },
  ];

  const cardStyle = {
    transform: `perspective(1000px) rotateY(${mousePosition.x * 3}deg) rotateX(${-mousePosition.y * 3}deg)`,
    transition: 'transform 0.3s ease-out',
  };

  const filteredBookings = mockBookings.filter(booking => {
    const matchesSearch = booking.tenant.toLowerCase().includes(searchTerm.toLowerCase()) || 
      booking.property.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || booking.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Confirmed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Completed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-20 left-20 w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center animate-float backdrop-blur-sm">
          <Calendar className="w-8 h-8 text-cyan-400" />
        </div>
      </div>

      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-white/10 backdrop-blur-lg border-r border-white/20 transform transition-transform duration-300 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SB</span>
            </div>
            <span className="text-xl font-bold text-white">StayBaba</span>
          </div>
          <button className="lg:hidden" onClick={() => setIsMobileOpen(false)}>
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === item.id ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white shadow-lg' : 'text-white/80 hover:bg-white/10 hover:translate-x-2'}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/20 transition-all duration-300">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <div className="relative z-10 lg:ml-64">
        <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 px-6 py-4">
          <div className="flex items-center justify-between">
            <button className="lg:hidden p-2 text-white" onClick={() => setIsMobileOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-4 ml-auto">
              <button className="p-2 text-white/80 hover:bg-white/10 rounded-lg transition-all">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 pt-20 lg:pt-6">
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Bookings</h1>
              <p className="text-white/60">Manage your property bookings</p>
            </div>
          </div>

          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <input type="text" placeholder="Search bookings..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
            </div>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 [&>option]:text-black">
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Property</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Tenant</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredBookings.map((booking, index) => (
                    <tr key={booking.id} className="hover:bg-white/5 transition-all duration-300" style={{ animationDelay: `${index * 0.05}s` }}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <Home className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-medium text-white">{booking.property}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-white">{booking.tenant}</div>
                        <div className="text-white/60 text-sm">{booking.phone}</div>
                      </td>
                      <td className="px-6 py-4 text-white/80">{booking.date}</td>
                      <td className="px-6 py-4">
                        <span className="text-cyan-400 font-bold">{booking.amount}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {booking.status === 'Pending' && (
                            <>
                              <button className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-all" title="Confirm">
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all" title="Cancel">
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <button className="p-2 text-white/60 hover:bg-white/10 rounded-lg transition-all" title="View Details">
                            <Search className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

export default OwnerBookings;
