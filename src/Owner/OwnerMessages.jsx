import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, MessageSquare, Send, Search, User, LogOut, Menu, X, Bell,
  Phone, Mail, Calendar, MoreVertical, Image, Paperclip, Smile
} from 'lucide-react';

const mockConversations = [
  { id: 1, name: 'John Smith', avatar: 'JS', lastMessage: 'Is the apartment still available?', time: '2 min ago', unread: 2, online: true },
  { id: 2, name: 'Sarah Johnson', avatar: 'SJ', lastMessage: 'Thank you for the quick response!', time: '1 hour ago', unread: 0, online: false },
  { id: 3, name: 'Mike Davis', avatar: 'MD', lastMessage: 'When can I visit the property?', time: '3 hours ago', unread: 1, online: true },
  { id: 4, name: 'Emily Brown', avatar: 'EB', lastMessage: 'I would like to book this flat.', time: 'Yesterday', unread: 0, online: false },
  { id: 5, name: 'David Wilson', avatar: 'DW', lastMessage: 'Is parking available?', time: 'Yesterday', unread: 0, online: true },
];

const mockMessages = {
  1: [
    { id: 1, sender: 'user', text: 'Hello, I am interested in your Luxury Apartment listing.', time: '10:30 AM' },
    { id: 2, sender: 'owner', text: 'Hi John! Thank you for your interest. How can I help you?', time: '10:32 AM' },
    { id: 3, sender: 'user', text: 'Is the apartment still available?', time: '10:33 AM' },
  ],
  2: [
    { id: 1, sender: 'user', text: 'Hi, I have a question about the studio.', time: '9:00 AM' },
    { id: 2, sender: 'owner', text: 'Sure, what would you like to know?', time: '9:15 AM' },
    { id: 3, sender: 'user', text: 'Thank you for the quick response!', time: '9:20 AM' },
  ],
};

function OwnerMessages({ user }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('messages');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [searchTerm, setSearchTerm] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const messagesEndRef = useRef(null);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedConversation]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'listings', icon: Home, label: 'My Listings' },
    { id: 'add-listing', icon: Home, label: 'Add Listing' },
    { id: 'bookings', icon: Home, label: 'Bookings' },
    { id: 'payments', icon: Home, label: 'Payments' },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'settings', icon: Home, label: 'Settings' },
  ];

  const cardStyle = {
    transform: `perspective(1000px) rotateY(${mousePosition.x * 3}deg) rotateX(${-mousePosition.y * 3}deg)`,
    transition: 'transform 0.3s ease-out',
  };

  const filteredConversations = mockConversations.filter(conv => 
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentMessages = messages[selectedConversation?.id] || [];

  const sendMessage = () => {
    if (!messageText.trim()) return;
    const newMessage = {
      id: Date.now(),
      sender: 'owner',
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => ({
      ...prev,
      [selectedConversation.id]: [...(prev[selectedConversation.id] || []), newMessage]
    }));
    setMessageText('');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-20 left-20 w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center animate-float backdrop-blur-sm">
          <MessageSquare className="w-8 h-8 text-cyan-400" />
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

      <div className="relative z-10 lg:ml-64 h-screen">
        <div className="flex h-full">
          {/* Conversations List */}
          <div className="w-full md:w-80 bg-white/5 backdrop-blur-lg border-r border-white/10 flex flex-col">
            <div className="p-4 border-b border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                <input type="text" placeholder="Search conversations..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-white/10 border border-white/10 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full p-4 flex items-center gap-3 border-b border-white/5 hover:bg-white/5 transition-all duration-300 ${selectedConversation?.id === conv.id ? 'bg-white/10' : ''}`}
                >
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{conv.avatar}</span>
                    </div>
                    {conv.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></div>}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-white">{conv.name}</span>
                      <span className="text-xs text-white/40">{conv.time}</span>
                    </div>
                    <p className="text-sm text-white/60 truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <div className="w-5 h-5 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">{conv.unread}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="hidden md:flex flex-1 flex-col">
            {selectedConversation ? (
              <>
                <div className="p-4 bg-white/5 backdrop-blur-lg border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{selectedConversation.avatar}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{selectedConversation.name}</h3>
                      <p className="text-xs text-green-400">{selectedConversation.online ? 'Online' : 'Offline'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-white/60 hover:bg-white/10 rounded-lg transition-all"><Phone className="w-5 h-5" /></button>
                    <button className="p-2 text-white/60 hover:bg-white/10 rounded-lg transition-all"><Mail className="w-5 h-5" /></button>
                    <button className="p-2 text-white/60 hover:bg-white/10 rounded-lg transition-all"><MoreVertical className="w-5 h-5" /></button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {currentMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'owner' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] p-3 rounded-2xl ${msg.sender === 'owner' ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white' : 'bg-white/10 text-white border border-white/10'}`}>
                        <p>{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.sender === 'owner' ? 'text-white/70' : 'text-white/40'}`}>{msg.time}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 bg-white/5 backdrop-blur-lg border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-white/60 hover:bg-white/10 rounded-lg transition-all"><Image className="w-5 h-5" /></button>
                    <button className="p-2 text-white/60 hover:bg-white/10 rounded-lg transition-all"><Paperclip className="w-5 h-5" /></button>
                    <input type="text" value={messageText} onChange={(e) => setMessageText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} placeholder="Type a message..." className="flex-1 px-4 py-2 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                    <button className="p-2 text-white/60 hover:bg-white/10 rounded-lg transition-all"><Smile className="w-5 h-5" /></button>
                    <button onClick={sendMessage} className="p-2 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-xl text-white hover:from-cyan-400 hover:to-pink-400 transition-all">
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <p className="text-white/60">Select a conversation to start messaging</p>
                </div>
              </div>
            )}
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

export default OwnerMessages;
