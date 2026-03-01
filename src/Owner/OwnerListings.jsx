import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, PlusCircle, Edit, Trash2, Eye, Heart, 
  MapPin, Bed, Bath, Square, DollarSign, LogOut, 
  Menu, X, Bell, Search, Filter, ChevronDown
} from 'lucide-react';

const mockListings = [
  { id: 1, title: 'Luxury Apartment in Downtown', location: 'New York, NY', price: '$2,500/mo', views: 1250, saves: 89, status: 'Active', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400', bedrooms: 2, bathrooms: 2, sqft: 1200 },
  { id: 2, title: 'Cozy Studio near Metro', location: 'Brooklyn, NY', price: '$1,800/mo', views: 890, saves: 45, status: 'Active', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400', bedrooms: 1, bathrooms: 1, sqft: 650 },
  { id: 3, title: 'Modern Villa with Pool', location: 'Queens, NY', price: '$4,200/mo', views: 2100, saves: 156, status: 'Active', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400', bedrooms: 4, bathrooms: 3, sqft: 2800 },
  { id: 4, title: 'Penthouse with City View', location: 'Manhattan, NY', price: '$6,000/mo', views: 3200, saves: 234, status: 'Pending', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400', bedrooms: 3, bathrooms: 2, sqft: 1800 },
  { id: 5, title: 'Cozy PG for Girls', location: 'Mumbai, Maharashtra', price: '$800/mo', views: 560, saves: 78, status: 'Active', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400', bedrooms: 4, bathrooms: 2, sqft: 800 },
  { id: 6, title: 'Boys Hostel Room', location: 'Delhi, NCR', price: '$500/mo', views: 320, saves: 45, status: 'Active', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400', bedrooms: 3, bathrooms: 1, sqft: 500 },
];

function OwnerListings({ user }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('listings');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
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
    { id: 'add-listing', icon: PlusCircle, label: 'Add Listing' },
    { id: 'bookings', icon: Home, label: 'Bookings' },
    { id: 'payments', icon: Home, label: 'Payments' },
    { id: 'messages', icon: Home, label: 'Messages' },
    { id: 'settings', icon: Home, label: 'Settings' },
  ];

  const cardStyle = {
    transform: `perspective(1000px) rotateY(${mousePosition.x * 3}deg) rotateX(${-mousePosition.y * 3}deg)`,
    transition: 'transform 0.3s ease-out',
  };

  const filteredListings = mockListings.filter(listing => 
    listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-20 left-20 w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center animate-float backdrop-blur-sm">
          <Home className="w-8 h-8 text-cyan-400" />
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
              <h1 className="text-2xl font-bold text-white">My Listings</h1>
              <p className="text-white/60">Manage your property listings</p>
            </div>
            <button className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-cyan-400 hover:to-pink-400 transition-all duration-300 flex items-center gap-2 transform hover:scale-105">
              <PlusCircle className="w-5 h-5" /> Add New Listing
            </button>
          </div>

          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <input type="text" placeholder="Search listings..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
            </div>
            <button className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all flex items-center gap-2">
              <Filter className="w-5 h-5" /> Filter <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing, index) => (
              <div key={listing.id} className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden transform hover:scale-105 transition-all duration-300 hover:-translate-y-2" style={{ animationDelay: `${index * 0.1}s`, ...cardStyle }}>
                <div className="relative">
                  <img src={listing.image} alt={listing.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${listing.status === 'Active' ? 'bg-green-500/80 text-white' : 'bg-yellow-500/80 text-white'}`}>
                      {listing.status}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-white text-lg mb-2">{listing.title}</h3>
                  <div className="flex items-center gap-1 text-white/60 text-sm mb-3">
                    <MapPin className="w-4 h-4" /> {listing.location}
                  </div>
                  <div className="flex items-center gap-4 text-white/60 text-sm mb-4">
                    <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> {listing.bedrooms}</span>
                    <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> {listing.bathrooms}</span>
                    <span className="flex items-center gap-1"><Square className="w-4 h-4" /> {listing.sqft}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-cyan-400">{listing.price}</span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-white/60 text-sm">
                        <Eye className="w-4 h-4" /> {listing.views}
                      </div>
                      <div className="flex items-center gap-1 text-white/60 text-sm">
                        <Heart className="w-4 h-4" /> {listing.saves}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                    <button className="flex-1 bg-cyan-500/20 text-cyan-400 py-2 rounded-lg hover:bg-cyan-500/40 transition-all flex items-center justify-center gap-1">
                      <Edit className="w-4 h-4" /> Edit
                    </button>
                    <button className="flex-1 bg-red-500/20 text-red-400 py-2 rounded-lg hover:bg-red-500/40 transition-all flex items-center justify-center gap-1">
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
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

export default OwnerListings;
