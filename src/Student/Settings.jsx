import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings as SettingsIcon, User, Mail, Phone, Bell, Lock, LogOut, ChevronRight } from 'lucide-react';

function Settings({ user, onLogout }) {
    const navigate = useNavigate();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    React.useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const cardStyle = {
        transform: `perspective(1000px) rotateY(${mousePosition.x * 3}deg) rotateX(${-mousePosition.y * 3}deg)`,
        transition: 'transform 0.3s ease-out',
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        if (onLogout) onLogout();
        navigate('/');
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
                <div className="absolute top-40 right-32 w-12 h-12 bg-pink-500/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }}>
                    <User className="w-6 h-6 text-pink-400 mx-auto mt-3" />
                </div>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 pt-20">
                <h1 className="text-4xl font-bold text-white mb-8 text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Settings</h1>
                
                <div className="space-y-6">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 transform hover:scale-[1.02] transition-all duration-300" style={cardStyle}>
                        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-cyan-400" />
                            Profile
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-3 border-b border-white/10">
                                <span className="text-white/70">Name</span>
                                <span className="text-white font-medium">{user?.name || 'Not set'}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-white/10">
                                <span className="text-white/70">Email</span>
                                <span className="text-white font-medium">{user?.email || 'Not set'}</span>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <span className="text-white/70">Role</span>
                                <span className="text-white font-medium capitalize">{user?.role || 'Student'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 transform hover:scale-[1.02] transition-all duration-300" style={cardStyle}>
                        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                            <Bell className="w-5 h-5 text-pink-400" />
                            Notifications
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-3 border-b border-white/10">
                                <span className="text-white/70">Email Notifications</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r from-cyan-500 to-pink-500"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <span className="text-white/70">SMS Notifications</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r from-cyan-500 to-pink-500"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 transform hover:scale-[1.02] transition-all duration-300" style={cardStyle}>
                        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                            <Lock className="w-5 h-5 text-purple-400" />
                            Security
                        </h2>
                        <button className="w-full flex items-center justify-between py-3 border-b border-white/10 text-white hover:text-purple-400 transition-all duration-300">
                            <span>Change Password</span>
                            <ChevronRight className="w-5 h-5" />
                        </button>
                        <button className="w-full flex items-center justify-between py-3 text-white hover:text-purple-400 transition-all duration-300">
                            <span>Two-Factor Authentication</span>
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    <button 
                        onClick={handleLogout}
                        className="w-full bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/40 hover:to-pink-500/40 text-red-400 py-4 rounded-2xl font-medium flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.02] border border-red-500/30"
                    >
                        <LogOut className="w-5 h-5" />
                        Log Out
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                .animate-float { animation: float 6s ease-in-out infinite; }
            `}</style>
        </div>
    );
}

export default Settings;
