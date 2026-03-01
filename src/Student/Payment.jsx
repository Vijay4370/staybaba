import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft,
    CreditCard, Building, Smartphone, Copy, CheckCircle, Search,
    Filter, Calendar, User, Hash, IndianRupee, RefreshCw
} from 'lucide-react';

const SAMPLE_TRANSACTIONS = [
    { id: 1, date: '2024-01-15', time: '10:30 AM', description: 'Room Booking Payment - Flat #204', amount: 15000, type: 'credit', utr: 'SB1234567890123', fromAccount: { name: 'Rahul Sharma', accountId: 'ACC789456123', upi: 'rahul@oksbi', bank: 'State Bank of India', ifsc: 'SBIN0001234' }, toAccount: { name: 'StayBaba Owner', accountId: 'ACC456789123', upi: 'staybaba@okhdfc', bank: 'HDFC Bank', ifsc: 'HDFC0005678' }, paymentMethod: 'UPI', status: 'success' },
    { id: 2, date: '2024-01-14', time: '02:15 PM', description: 'Hostel Booking - Girls PG', amount: 12000, type: 'credit', utr: 'SB1234567890111', fromAccount: { name: 'Priya Singh', accountId: 'ACC321654987', upi: 'priya@okaxis', bank: 'Axis Bank', ifsc: 'UTIB0002345' }, toAccount: { name: 'StayBaba Owner', accountId: 'ACC456789123', upi: 'staybaba@okhdfc', bank: 'HDFC Bank', ifsc: 'HDFC0005678' }, paymentMethod: 'UPI', status: 'success' },
    { id: 3, date: '2024-01-13', time: '11:45 AM', description: 'Booking Refund - Cancelled', amount: 5000, type: 'debit', utr: 'SB1234567890100', fromAccount: { name: 'StayBaba Owner', accountId: 'ACC456789123', upi: 'staybaba@okhdfc', bank: 'HDFC Bank', ifsc: 'HDFC0005678' }, toAccount: { name: 'Amit Kumar', accountId: 'ACC987654321', upi: 'amit@oksbi', bank: 'State Bank of India', ifsc: 'SBIN0005678' }, paymentMethod: 'Bank Transfer', status: 'success' },
    { id: 4, date: '2024-01-12', time: '04:20 PM', description: 'Room Booking - Single Room #101', amount: 18000, type: 'credit', utr: 'SB1234567890099', fromAccount: { name: 'Vikram Patel', accountId: 'ACC654321789', upi: 'vikram@okpaytm', bank: 'Paytm Payments Bank', ifsc: 'PYTM0001234' }, toAccount: { name: 'StayBaba Owner', accountId: 'ACC456789123', upi: 'staybaba@okhdfc', bank: 'HDFC Bank', ifsc: 'HDFC0005678' }, paymentMethod: 'UPI', status: 'success' },
    { id: 5, date: '2024-01-11', time: '09:00 AM', description: 'Maintenance Fee - January', amount: 2000, type: 'debit', utr: 'SB1234567890088', fromAccount: { name: 'StayBaba Owner', accountId: 'ACC456789123', upi: 'staybaba@okhdfc', bank: 'HDFC Bank', ifsc: 'HDFC0005678' }, toAccount: { name: 'Maintenance Corp', accountId: 'ACC111222333', upi: 'maintenance@okicici', bank: 'ICICI Bank', ifsc: 'ICIC0007890' }, paymentMethod: 'Bank Transfer', status: 'success' },
    { id: 6, date: '2024-01-10', time: '03:30 PM', description: 'PG Booking - Shared Room', amount: 8000, type: 'credit', utr: 'SB1234567890077', fromAccount: { name: 'Neha Gupta', accountId: 'ACC444555666', upi: 'neha@okyesbank', bank: 'Yes Bank', ifsc: 'YESB0003456' }, toAccount: { name: 'StayBaba Owner', accountId: 'ACC456789123', upi: 'staybaba@okhdfc', bank: 'HDFC Bank', ifsc: 'HDFC0005678' }, paymentMethod: 'UPI', status: 'success' }
];

const ACCOUNT_DETAILS = { name: 'StayBaba Owner', accountId: 'ACC456789123', upiId: 'staybaba@okhdfc', bankName: 'HDFC Bank', branch: 'Main Branch', ifscCode: 'HDFC0005678', accountNumber: '5678912345678', qrCode: 'upi://pay?pa=staybaba@okhdfc&pn=StayBaba' };

function Payment({ user }) {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [showAccountDetails, setShowAccountDetails] = useState(false);
    const [copiedField, setCopiedField] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    React.useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: (e.clientX / window.innerWidth) * 2 - 1, y: (e.clientY / window.innerHeight) * 2 - 1 });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const cardStyle = {
        transform: `perspective(1000px) rotateY(${mousePosition.x * 3}deg) rotateX(${-mousePosition.y * 3}deg)`,
        transition: 'transform 0.3s ease-out',
    };

    const totalReceived = SAMPLE_TRANSACTIONS.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0);
    const totalSpent = SAMPLE_TRANSACTIONS.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0);
    const balance = totalReceived - totalSpent;

    const filteredTransactions = SAMPLE_TRANSACTIONS.filter(t => {
        const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) || t.utr.toLowerCase().includes(searchTerm.toLowerCase()) || t.fromAccount.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.toAccount.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'all' || t.type === filterType;
        return matchesSearch && matchesFilter;
    });

    const copyToClipboard = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-20 left-20 w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center animate-float backdrop-blur-sm">
                    <Wallet className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="absolute top-40 right-32 w-12 h-12 bg-pink-500/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }}>
                    <CreditCard className="w-6 h-6 text-pink-400 mx-auto mt-3" />
                </div>
            </div>

            <header className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/10 sticky top-0">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                                <Wallet className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Payments</h1>
                                <p className="text-xs text-white/60">Transaction History and Details</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30 transform hover:scale-105 transition-all duration-300" style={cardStyle}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-green-500/30 rounded-xl flex items-center justify-center">
                                <ArrowDownLeft className="w-6 h-6 text-green-400" />
                            </div>
                            <TrendingUp className="w-5 h-5 text-green-400" />
                        </div>
                        <p className="text-white/60 text-sm mb-1">Total Received</p>
                        <p className="text-3xl font-bold text-green-400">Rs{totalReceived.toLocaleString()}</p>
                        <p className="text-green-400/60 text-sm mt-2">{SAMPLE_TRANSACTIONS.filter(t => t.type === 'credit').length} transactions</p>
                    </div>

                    <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30 transform hover:scale-105 transition-all duration-300" style={cardStyle}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-red-500/30 rounded-xl flex items-center justify-center">
                                <ArrowUpRight className="w-6 h-6 text-red-400" />
                            </div>
                            <TrendingDown className="w-5 h-5 text-red-400" />
                        </div>
                        <p className="text-white/60 text-sm mb-1">Total Spent</p>
                        <p className="text-3xl font-bold text-red-400">Rs{totalSpent.toLocaleString()}</p>
                        <p className="text-red-400/60 text-sm mt-2">{SAMPLE_TRANSACTIONS.filter(t => t.type === 'debit').length} transactions</p>
                    </div>

                    <div className={`bg-gradient-to-br ${balance >= 0 ? 'from-purple-500/20 to-pink-500/20' : 'from-red-500/20 to-orange-500/20'} backdrop-blur-sm rounded-2xl p-6 border ${balance >= 0 ? 'border-purple-500/30' : 'border-red-500/30'} transform hover:scale-105 transition-all duration-300`} style={cardStyle}>
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 ${balance >= 0 ? 'bg-purple-500/30' : 'bg-red-500/30'} rounded-xl flex items-center justify-center`}>
                                <Wallet className={`w-6 h-6 ${balance >= 0 ? 'text-purple-400' : 'text-red-400'}`} />
                            </div>
                            <RefreshCw className={`w-5 h-5 ${balance >= 0 ? 'text-purple-400' : 'text-red-400'}`} />
                        </div>
                        <p className="text-white/60 text-sm mb-1">Current Balance</p>
                        <p className={`text-3xl font-bold ${balance >= 0 ? 'text-purple-400' : 'text-red-400'}`}>Rs{balance.toLocaleString()}</p>
                        <p className={`${balance >= 0 ? 'text-purple-400/60' : 'text-red-400/60'} text-sm mt-2`}>{SAMPLE_TRANSACTIONS.length} total transactions</p>
                    </div>
                </div>

                {showAccountDetails && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8 animate-in fade-in slide-in-from-top-4">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2"><Building className="w-5 h-5" /> Account Details</h3>
                            <button onClick={() => setShowAccountDetails(false)} className="text-white/60 hover:text-white">X</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-white/5 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-3"><Smartphone className="w-5 h-5 text-purple-400" /><span className="text-white font-medium">UPI Details</span></div>
                                <div className="flex items-center justify-between">
                                    <span className="text-white/60 text-sm">UPI ID</span>
                                    <button onClick={() => copyToClipboard(ACCOUNT_DETAILS.upiId, 'upi')} className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-sm">
                                        {copiedField === 'upi' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}{copiedField === 'upi' ? 'Copied!' : 'Copy'}
                                    </button>
                                </div>
                                <p className="text-white font-mono text-sm">{ACCOUNT_DETAILS.upiId}</p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-3"><Building className="w-5 h-5 text-blue-400" /><span className="text-white font-medium">Bank Details</span></div>
                                <p className="text-white text-sm">{ACCOUNT_DETAILS.bankName}</p>
                                <p className="text-white/60 text-sm">{ACCOUNT_DETAILS.branch}</p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-3"><CreditCard className="w-5 h-5 text-green-400" /><span className="text-white font-medium">Account Number</span></div>
                                <div className="flex items-center justify-between">
                                    <span className="text-white/60 text-sm">Account No.</span>
                                    <button onClick={() => copyToClipboard(ACCOUNT_DETAILS.accountNumber, 'account')} className="text-green-400 hover:text-green-300 flex items-center gap-1 text-sm">
                                        {copiedField === 'account' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}{copiedField === 'account' ? 'Copied!' : 'Copy'}
                                    </button>
                                </div>
                                <p className="text-white font-mono text-sm">{ACCOUNT_DETAILS.accountNumber}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input type="text" placeholder="Search by description, UTR, or account name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-white/60" />
                        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                            <option value="all" className="bg-slate-800">All Transactions</option>
                            <option value="credit" className="bg-slate-800">Received</option>
                            <option value="debit" className="bg-slate-800">Sent</option>
                        </select>
                    </div>
                    <button onClick={() => setShowAccountDetails(!showAccountDetails)} className="px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-400 hover:to-pink-400 transition-all duration-300 transform hover:scale-105">
                        Account Details
                    </button>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-white/10">
                                <tr>
                                    <th className="px-6 py-4 text-left text-white/60 font-medium text-sm">Date and Time</th>
                                    <th className="px-6 py-4 text-left text-white/60 font-medium text-sm">Description</th>
                                    <th className="px-6 py-4 text-left text-white/60 font-medium text-sm">From Account</th>
                                    <th className="px-6 py-4 text-left text-white/60 font-medium text-sm">To Account</th>
                                    <th className="px-6 py-4 text-left text-white/60 font-medium text-sm">UTR / Transaction ID</th>
                                    <th className="px-6 py-4 text-right text-white/60 font-medium text-sm">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {filteredTransactions.map((transaction, index) => (
                                    <tr key={transaction.id} className="hover:bg-white/5 transition-colors animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${index * 50}ms` }}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-white"><Calendar className="w-4 h-4 text-white/40" /><span>{transaction.date}</span></div>
                                            <p className="text-white/40 text-sm mt-1">{transaction.time}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-white font-medium">{transaction.description}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${transaction.type === 'credit' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{transaction.type === 'credit' ? 'Received' : 'Sent'}</span>
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${transaction.status === 'success' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{transaction.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4"><p className="text-white text-sm">{transaction.fromAccount.name}</p><p className="text-white/40 text-xs">ID: {transaction.fromAccount.accountId}</p></td>
                                        <td className="px-6 py-4"><p className="text-white text-sm">{transaction.toAccount.name}</p><p className="text-white/40 text-xs">ID: {transaction.toAccount.accountId}</p></td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-white font-mono text-sm">{transaction.utr}</span>
                                                <button onClick={() => copyToClipboard(transaction.utr, `utr-${transaction.id}`)} className="text-white/40 hover:text-white">
                                                    {copiedField === `utr-${transaction.id}` ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <p className={`text-lg font-bold ${transaction.type === 'credit' ? 'text-green-400' : 'text-red-400'}`}>{transaction.type === 'credit' ? '+' : '-'}Rs{transaction.amount.toLocaleString()}</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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

export default Payment;
