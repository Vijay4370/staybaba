import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, PlusCircle, Upload, MapPin, Bed, Bath, Square, DollarSign, 
  LogOut, Menu, X, Bell, CheckCircle, Image as ImageIcon, Camera
} from 'lucide-react';

const propertyTypes = ['Apartment', 'House', 'PG', 'Hostel', 'Flat', 'Villa', 'Studio'];
const amenitiesList = ['WiFi', 'Parking', 'AC', 'Gym', 'Pool', 'Kitchen', 'Laundry', 'Balcony', 'Power Backup', 'Security'];

function OwnerAddListing({ user }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('add-listing');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: 'Apartment',
    price: '',
    deposit: '',
    address: '',
    city: '',
    state: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    amenities: [],
    available: true
  });

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

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Listing added successfully!');
    navigate('/owner/dashboard');
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

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-20 left-20 w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center animate-float backdrop-blur-sm">
          <PlusCircle className="w-8 h-8 text-cyan-400" />
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
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">Add New Listing</h1>
            <p className="text-white/60">Create a new property listing</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6" style={cardStyle}>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Home className="w-5 h-5 text-cyan-400" /> Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-white/80 mb-2">Property Title</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g., Luxury Apartment in Downtown" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-500" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-white/80 mb-2">Description</label>
                  <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Describe your property..." rows="4" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Property Type</label>
                  <select value={formData.propertyType} onChange={(e) => setFormData({...formData, propertyType: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500 [&>option]:text-black">
                    {propertyTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Monthly Rent ($)</label>
                  <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} placeholder="e.g., 2500" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Security Deposit ($)</label>
                  <input type="number" value={formData.deposit} onChange={(e) => setFormData({...formData, deposit: e.target.value})} placeholder="e.g., 5000" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-500" />
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6" style={cardStyle}>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-pink-400" /> Location
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-white/80 mb-2">Full Address</label>
                  <input type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="Street address" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-pink-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">City</label>
                  <input type="text" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} placeholder="e.g., New York" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-pink-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">State</label>
                  <input type="text" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} placeholder="e.g., NY" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-pink-500" required />
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6" style={cardStyle}>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Square className="w-5 h-5 text-green-400" /> Property Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Bedrooms</label>
                  <input type="number" value={formData.bedrooms} onChange={(e) => setFormData({...formData, bedrooms: e.target.value})} placeholder="e.g., 2" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Bathrooms</label>
                  <input type="number" value={formData.bathrooms} onChange={(e) => setFormData({...formData, bathrooms: e.target.value})} placeholder="e.g., 2" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Square Feet</label>
                  <input type="number" value={formData.sqft} onChange={(e) => setFormData({...formData, sqft: e.target.value})} placeholder="e.g., 1200" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-green-500" />
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6" style={cardStyle}>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-yellow-400" /> Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {amenitiesList.map(amenity => (
                  <button key={amenity} type="button" onClick={() => handleAmenityToggle(amenity)} className={`px-4 py-2 rounded-xl border transition-all duration-300 ${formData.amenities.includes(amenity) ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white border-transparent' : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'}`}>
                    {amenity}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6" style={cardStyle}>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-purple-400" /> Property Images
              </h2>
              <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center">
                <Camera className="w-12 h-12 text-white/40 mx-auto mb-4" />
                <p className="text-white/60 mb-2">Drag and drop images here</p>
                <p className="text-white/40 text-sm">or</p>
                <button type="button" className="mt-4 px-6 py-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-white rounded-xl hover:from-cyan-400 hover:to-pink-400 transition-all duration-300">
                  Browse Files
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button type="submit" className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white px-8 py-3 rounded-xl hover:from-cyan-400 hover:to-pink-400 transition-all duration-300 flex items-center gap-2 transform hover:scale-105">
                <CheckCircle className="w-5 h-5" /> Publish Listing
              </button>
              <button type="button" onClick={() => navigate('/owner/dashboard')} className="px-8 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

export default OwnerAddListing;
