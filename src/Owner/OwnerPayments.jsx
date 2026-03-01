import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, CreditCard, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft,
  DollarSign, LogOut, Menu, X, Bell, Search, Filter, CheckCircle, Clock
} from 'lucide-react';

const mockPayments = [
  { id: 1, tenant: 'John Smith', property: 'Luxury Apartment', date: '2024-01-01', amount: '$2,500', status: 'Paid', method: 'UPI', transactionId: 'TXN1234567890' },
  { id: 2, tenant: 'Sarah Johnson', property: 'Cozy Studio', date: '2024-01-05', amount: '$1,800', status: 'Paid', method: 'Bank Transfer', transactionId: 'TXN1234567891' },
  { id: 3, tenant: 'Mike Davis', property: 'Modern Villa', date: '2023-12-28', amount: '$4,200', status: 'Paid', method: 'UPI', transactionId: 'TXN1234567892' },
  { id: 4, tenant: 'Emily Brown', property: 'Penthouse', date: '2023-12-25', amount: '$6,000', status: 'Pending', method: 'Bank Transfer', transactionId: 'TXN1234567893' },
  { id: 5, tenant: 'David Wilson', property: 'Luxury Apartment', date: '2023-12-20', amount: '$2,500', status: 'Paid', method: 'UPI', transactionId: 'TXN1234567894' },
  { id: 6, tenant: 'Lisa Anderson', property: 'Cozy Studio', date: '2023-12-15', amount: '$1,800', status: 'Failed', method: 'Card', transactionId: 'TXN1234567895' },
];

const mockStats = [
  { title: 'Total Earnings', value: '$24,500', icon: DollarSign, color: 'bg-green-500', change: '+23% this month' },
  { title: 'Pending Payments', value: '$6,000', icon: Clock, color: 'bg-yellow-500', change: '2 pending' },
  { title: 'This Month', value: '$8,800', icon: TrendingUp, color: 'bg-cyan-500', change: '+15% vs last month' },
  { title: 'Completed', value: '18', icon: CheckCircle, color: 'bg-purple-500', change: 'Transactions' },
];

function OwnerPayments({ user }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('payments');
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
    { id: 'bookings', icon: Home, label: 'Bookings' },
    { id: 'payments', icon: CreditCard, label: 'Payments' },
    { id: 'messages', icon: Home, label: 'Messages' },
    { id: 'settings', icon: Home, label: 'Settings' },
  ];

  const cardStyle = {
    transform: `perspective(1000px) rotateY(${mousePosition.x * 3}deg) rotateX(${-mousePosition.y * 3}deg)`,
    transition: 'transform 0.3s ease-out',
  };

  const filteredPayments = mockPayments.filter(payment => {
    const matchesSearch = payment.tenant.toLowerCase().includes(searchTerm.toLowerCase()) || 
      payment.property.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || payment.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalEarnings = mockPayments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + parseInt(p.amount.replace('$', '')), 0);
  const pendingAmount = mockPayments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + parseInt(p.amount.replace('$', '')), 0);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Paid': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Failed': return 'bg-red-500/20 text-red-400 border-red-500/30';
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
          <CreditCard className="w-8 h-8 text-cyan-400" />
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
            <h1 className="text-2xl font-bold text-white">Payments</h1>
            <p className="text-white/60">Manage your payment transactions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <input type="text" placeholder="Search payments..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
            </div>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 [&>option]:text-black">
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Tenant</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Property</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Method</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredPayments.map((payment, index) => (
                    <tr key={payment.id} className="hover:bg-white/5 transition-all duration-300" style={{ animationDelay: `${index * 0.05}s` }}>
                      <td className="px-6 py-4">
                        <span className="font-medium text-white">{payment.tenant}</span>
                      </td>
                      <td className="px-6 py-4 text-white/80">{payment.property}</td>
                      <td className="px-6 py-4 text-white/80">{payment.date}</td>
                      <td className="px-6 py-4">
                        <span className="text-cyan-400 font-bold">{payment.amount}</span>
                      </td>
                      <td className="px-6 py-4 text-white/60">{payment.method}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
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

export default OwnerPayments;
