import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Home, PlusCircle, Calendar, CreditCard, 
  MessageSquare, Settings, LogOut, Menu, X, TrendingUp,
  Eye, Heart, DollarSign, Trash2, Edit, Bell, User, ChevronRight
} from 'lucide-react';

const mockStats = [
  { title: 'Total Listings', value: '12', icon: Home, color: 'bg-blue-500', change: '+2 this month' },
  { title: 'Total Views', value: '4,521', icon: Eye, color: 'bg-green-500', change: '+15%' },
  { title: 'Total Saves', value: '892', icon: Heart, color: 'bg-red-500', change: '+8%' },
  { title: 'Total Earnings', value: '$24,500', icon: DollarSign, color: 'bg-yellow-500', change: '+23%' },
];

const mockListings = [
  { id: 1, title: 'Luxury Apartment in Downtown', location: 'New York, NY', price: '$2,500/mo', views: 1250, saves: 89, status: 'Active', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400' },
  { id: 2, title: 'Cozy Studio near Metro', location: 'Brooklyn, NY', price: '$1,800/mo', views: 890, saves: 45, status: 'Active', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400' },
  { id: 3, title: 'Modern Villa with Pool', location: 'Queens, NY', price: '$4,200/mo', views: 2100, saves: 156, status: 'Active', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400' },
  { id: 4, title: 'Penthouse with City View', location: 'Manhattan, NY', price: '$6,000/mo', views: 3200, saves: 234, status: 'Pending', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400' },
];

function OwnerDashboard({ user }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
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
    localStorage.removeItem('token');
    navigate('/');
  };

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'listings', icon: Home, label: 'My Listings' },
    { id: 'add-listing', icon: PlusCircle, label: 'Add Listing' },
    { id: 'bookings', icon: Calendar, label: 'Bookings' },
    { id: 'payments', icon: CreditCard, label: 'Payments' },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const cardStyle = {
    transform: `perspective(1000px) rotateY(${mousePosition.x * 3}deg) rotateX(${-mousePosition.y * 3}deg)`,
    transition: 'transform 0.3s ease-out',
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-20 left-20 w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center animate-float backdrop-blur-sm">
          <LayoutDashboard className="w-8 h-8 text-cyan-400" />
        </div>
        <div className="absolute top-40 right-32 w-12 h-12 bg-pink-500/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }}>
          <Home className="w-6 h-6 text-pink-400 mx-auto mt-3" />
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
              {item.id === 'messages' && <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">2</span>}
            </button>
          ))}
        </nav>

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
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">O</span>
                </div>
                <span className="text-white font-medium">Owner</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 pt-20 lg:pt-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">{menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}</h1>
            <p className="text-white/60">Welcome back, Owner!</p>
          </div>

          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockStats.map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 transform hover:scale-105 transition-all duration-300" style={cardStyle}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/60 text-sm mb-1">{stat.title}</p>
                        <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                        <p className="text-cyan-400 text-xs mt-2 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />{stat.change}
                        </p>
                      </div>
                      <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="p-6 border-b border-white/20 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">My Listings</h2>
                  <button className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white px-4 py-2 rounded-xl hover:from-cyan-400 hover:to-pink-400 transition-all duration-300 flex items-center gap-2 transform hover:scale-105">
                    <PlusCircle className="w-4 h-4" />Add New
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Property</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Views</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {mockListings.map((listing) => (
                        <tr key={listing.id} className="hover:bg-white/5 transition-all duration-300">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img src={listing.image} alt={listing.title} className="w-12 h-12 rounded-lg object-cover" />
                              <span className="font-medium text-white">{listing.title}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-white/60">{listing.location}</td>
                          <td className="px-6 py-4 font-medium text-white">{listing.price}</td>
                          <td className="px-6 py-4 text-white/60">{listing.views}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${listing.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                              {listing.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button className="p-2 text-cyan-400 hover:bg-cyan-500/20 rounded-lg transition-all"><Edit className="w-4 h-4" /></button>
                              <button className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

export default OwnerDashboard;
