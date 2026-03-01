import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Settings as SettingsIcon, User, Mail, Phone, Bell, Lock, LogOut, Menu, X, Bell as BellIcon,
  Shield, Eye, EyeOff, Save, Camera, CheckCircle
} from 'lucide-react';

function OwnerSettings({ user }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('settings');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    name: 'John Owner',
    email: 'john@staybaba.com',
    phone: '+91 9876543210',
    company: 'StayBaba Properties',
    address: '123 Main Street, Mumbai, Maharashtra',
    upiId: 'john@oksbi',
    bankName: 'State Bank of India',
    accountNumber: '1234567890',
    ifscCode: 'SBIN0001234'
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

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'listings', icon: Home, label: 'My Listings' },
    { id: 'add-listing', icon: Home, label: 'Add Listing' },
    { id: 'bookings', icon: Home, label: 'Bookings' },
    { id: 'payments', icon: Home, label: 'Payments' },
    { id: 'messages', icon: Home, label: 'Messages' },
    { id: 'settings', icon: SettingsIcon, label: 'Settings' },
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
          <SettingsIcon className="w-8 h-8 text-cyan-400" />
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
          </div>
        </div>

        <div className="p-6 pt-20 lg:pt-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">Settings</h1>
            <p className="text-white/60">Manage your account settings</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profile Settings */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6" style={cardStyle}>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-cyan-400" /> Profile Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Phone</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-500" />
                </div>
              </div>
            </div>

            {/* Business Settings */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6" style={cardStyle}>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-pink-400" /> Business Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Company Name</label>
                  <input type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-pink-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Address</label>
                  <input type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-pink-500" />
                </div>
              </div>
            </div>

            {/* Payment Settings */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6" style={cardStyle}>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Lock className="w-5 h-5 text-green-400" /> Payment Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">UPI ID</label>
                  <input type="text" value={formData.upiId} onChange={(e) => setFormData({...formData, upiId: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Bank Name</label>
                  <input type="text" value={formData.bankName} onChange={(e) => setFormData({...formData, bankName: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Account Number</label>
                  <input type="text" value={formData.accountNumber} onChange={(e) => setFormData({...formData, accountNumber: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">IFSC Code</label>
                  <input type="text" value={formData.ifscCode} onChange={(e) => setFormData({...formData, ifscCode: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-green-500" />
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6" style={cardStyle}>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <BellIcon className="w-5 h-5 text-yellow-400" /> Notifications
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-white/80">Email Notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r from-cyan-500 to-pink-500"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-white/80">SMS Notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r from-cyan-500 to-pink-500"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-white/80">Booking Alerts</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r from-cyan-500 to-pink-500"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button onClick={handleSave} className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white px-8 py-3 rounded-xl hover:from-cyan-400 hover:to-pink-400 transition-all duration-300 flex items-center gap-2 transform hover:scale-105">
              {saved ? <CheckCircle className="w-5 h-5" /> : <Save className="w-5 h-5" />}
              {saved ? 'Saved!' : 'Save Changes'}
            </button>
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

export default OwnerSettings;
