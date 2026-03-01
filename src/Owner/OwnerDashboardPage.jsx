import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Home, 
  PlusCircle, 
  Calendar, 
  CreditCard, 
  MessageSquare, 
  Settings, 
  LogOut,
  Menu,
  X,
  TrendingUp,
  Eye,
  Heart,
  DollarSign,
  Trash2,
  Edit,
  Bell,
  Home as HomeIcon
} from 'lucide-react';

// Mock Data
const mockStats = [
  { title: 'Total Listings', value: '12', icon: HomeIcon, color: 'bg-blue-500', change: '+2 this month' },
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

const mockBookings = [
  { id: 1, property: 'Luxury Apartment in Downtown', tenant: 'John Smith', date: '2024-01-15', status: 'Confirmed', amount: '$2,500' },
  { id: 2, property: 'Cozy Studio near Metro', tenant: 'Sarah Johnson', date: '2024-01-20', status: 'Pending', amount: '$1,800' },
  { id: 3, property: 'Modern Villa with Pool', tenant: 'Mike Davis', date: '2024-01-10', status: 'Completed', amount: '$4,200' },
];

const mockPayments = [
  { id: 1, tenant: 'John Smith', property: 'Luxury Apartment', date: '2024-01-01', amount: '$2,500', status: 'Paid' },
  { id: 2, tenant: 'Sarah Johnson', property: 'Cozy Studio', date: '2024-01-05', amount: '$1,800', status: 'Paid' },
  { id: 3, tenant: 'Mike Davis', property: 'Modern Villa', date: '2023-12-28', amount: '$4,200', status: 'Paid' },
];

// Main OwnerDashboardPage Component
const OwnerDashboardPage = ({ user }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
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

  const cardStyle = {
    transform: `perspective(1000px) rotateY(${mousePosition.x * 3}deg) rotateX(${-mousePosition.y * 3}deg)`,
    transition: 'transform 0.3s ease-out',
  };

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: '📊 Dashboard', color: 'from-cyan-500 to-blue-500' },
    { id: 'listings', icon: Home, label: '🏠 My Listings', color: 'from-green-500 to-emerald-500' },
    { id: 'add-listing', icon: PlusCircle, label: '➕ Add Listing', color: 'from-purple-500 to-pink-500' },
    { id: 'bookings', icon: Calendar, label: '📅 Bookings', color: 'from-orange-500 to-red-500' },
    { id: 'payments', icon: CreditCard, label: '💳 Payments', color: 'from-yellow-500 to-amber-500' },
    { id: 'messages', icon: MessageSquare, label: '💬 Messages', color: 'from-indigo-500 to-purple-500' },
    { id: 'settings', icon: Settings, label: '⚙️ Settings', color: 'from-gray-500 to-slate-500' },
  ];

  // Stats Cards Component
  const StatsCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {mockStats.map((stat, index) => (
        <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 transform hover:scale-105 transition-all duration-300" style={cardStyle}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
              <p className="text-cyan-400 text-xs mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {stat.change}
              </p>
            </div>
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Listings Component
  const Listings = () => (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden" style={cardStyle}>
      <div className="p-6 border-b border-white/20 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">My Listings</h2>
        <button className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white px-4 py-2 rounded-xl hover:from-cyan-400 hover:to-pink-400 transition-all duration-300 flex items-center gap-2 transform hover:scale-105">
          <PlusCircle className="w-4 h-4" />
          Add New
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
                    <button className="p-2 text-cyan-400 hover:bg-cyan-500/20 rounded-lg transition-all">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Bookings Component
  const Bookings = () => (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden" style={cardStyle}>
      <div className="p-6 border-b border-white/20">
        <h2 className="text-xl font-bold text-white">Recent Bookings</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Property</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Tenant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {mockBookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-white/5 transition-all duration-300">
                <td className="px-6 py-4 font-medium text-white">{booking.property}</td>
                <td className="px-6 py-4 text-white/60">{booking.tenant}</td>
                <td className="px-6 py-4 text-white/60">{booking.date}</td>
                <td className="px-6 py-4 font-medium text-white">{booking.amount}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'Confirmed' ? 'bg-green-500/20 text-green-400' :
                      booking.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'}`}>
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Payments Component
  const Payments = () => (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden" style={cardStyle}>
      <div className="p-6 border-b border-white/20">
        <h2 className="text-xl font-bold text-white">Payment History</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Tenant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Property</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {mockPayments.map((payment) => (
              <tr key={payment.id} className="hover:bg-white/5 transition-all duration-300">
                <td className="px-6 py-4 font-medium text-white">{payment.tenant}</td>
                <td className="px-6 py-4 text-white/60">{payment.property}</td>
                <td className="px-6 py-4 text-white/60">{payment.date}</td>
                <td className="px-6 py-4 font-medium text-white">{payment.amount}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Add Listing Component
  const AddListing = () => (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6" style={cardStyle}>
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
          <PlusCircle className="w-6 h-6 text-white" />
        </div>
        Add New Listing
      </h2>
      <p className="text-white/60">Add listing form would go here.</p>
    </div>
  );

  // Messages Component
  const Messages = () => (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6" style={cardStyle}>
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        Messages
      </h2>
      <p className="text-white/60">Messages would go here.</p>
    </div>
  );

  // Settings Component
  const SettingsPage = () => (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6" style={cardStyle}>
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <div className="p-2 bg-gradient-to-r from-gray-500 to-slate-500 rounded-xl">
          <Settings className="w-6 h-6 text-white" />
        </div>
        Settings
      </h2>
      <p className="text-white/60">Settings would go here.</p>
    </div>
  );

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <StatsCards />
            <Listings />
          </>
        );
      case 'listings':
        return <Listings />;
      case 'bookings':
        return <Bookings />;
      case 'payments':
        return <Payments />;
      case 'add-listing':
        return <AddListing />;
      case 'messages':
        return <Messages />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <StatsCards />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating Icons */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center animate-float backdrop-blur-sm">
          <LayoutDashboard className="w-8 h-8 text-cyan-400" />
        </div>
        <div className="absolute top-40 right-32 w-12 h-12 bg-pink-500/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }}>
          <HomeIcon className="w-6 h-6 text-pink-400 mx-auto mt-3" />
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Sidebar Navigation */}
          <aside className="lg:w-64">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              <nav className="p-2">
                {menuItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 mb-2 group ${
                      activeTab === item.id 
                        ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white shadow-lg transform hover:scale-105' 
                        : 'text-gray-300 hover:bg-white/10 hover:translate-x-2'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${activeTab === item.id ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'} transition-all`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{item.label}</span>
                    {item.id === 'messages' && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">2</span>
                    )}
                  </button>
                ))}
                
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-red-400 hover:bg-red-500/20 mt-4 border-t border-white/10"
                >
                  <div className="p-2 rounded-lg bg-red-500/10">
                    <LogOut className="w-5 h-5" />
                  </div>
                  <span className="font-medium">Logout</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white">
                {menuItems.find(item => item.id === activeTab)?.label?.replace(/[^a-zA-Z ]/g, '') || 'Dashboard'}
              </h1>
              <p className="text-white/60">Welcome back, Owner!</p>
            </div>
            {renderContent()}
          </main>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default OwnerDashboardPage;
