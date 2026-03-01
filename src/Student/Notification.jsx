import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, X, Check, AlertCircle, Info, AlertTriangle, 
  Trash2, CheckCheck, ChevronRight, Clock, User,
  MessageSquare, Calendar, FileText, ShoppingCart
} from 'lucide-react';

const NOTIFICATION_TYPES = {
  success: { icon: Check, bgColor: 'bg-green-500', textColor: 'text-green-600', bgLight: 'bg-green-50' },
  error: { icon: AlertCircle, bgColor: 'bg-red-500', textColor: 'text-red-600', bgLight: 'bg-red-50' },
  warning: { icon: AlertTriangle, bgColor: 'bg-yellow-500', textColor: 'text-yellow-600', bgLight: 'bg-yellow-50' },
  info: { icon: Info, bgColor: 'bg-blue-500', textColor: 'text-blue-600', bgLight: 'bg-blue-50' },
};

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: 'success',
    title: 'Payment Successful',
    message: 'Your payment of Rs2,500 has been processed successfully.',
    time: new Date(Date.now() - 1000 * 60 * 5),
    read: false,
    avatar: <ShoppingCart className="w-5 h-5" />
  },
  {
    id: 2,
    type: 'info',
    title: 'New Message',
    message: 'You have a new message from your teacher.',
    time: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    avatar: <MessageSquare className="w-5 h-5" />
  },
  {
    id: 3,
    type: 'warning',
    title: 'Assignment Due',
    message: 'Your Data Science assignment is due tomorrow.',
    time: new Date(Date.now() - 1000 * 60 * 60),
    read: true,
    avatar: <FileText className="w-5 h-5" />
  },
  {
    id: 4,
    type: 'error',
    title: 'Login Alert',
    message: 'New login detected from Mumbai, Maharashtra.',
    time: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: true,
    avatar: <AlertCircle className="w-5 h-5" />
  },
  {
    id: 5,
    type: 'info',
    title: 'Class Schedule',
    message: 'Your class schedule has been updated for next week.',
    time: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
    avatar: <Calendar className="w-5 h-5" />
  }
];

function Notification() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const dropdownRef = useRef(null);

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
    const storedAlert = localStorage.getItem('newIPAlert');
    if (storedAlert) {
      const alertData = JSON.parse(storedAlert);
      const newIPNotification = {
        id: Date.now(),
        type: 'warning',
        title: 'New Login Detected',
        message: `Your account was logged in from a different device/location.`,
        time: new Date(),
        read: false,
        avatar: <AlertCircle className="w-5 h-5" />
      };
      setNotifications(prev => [newIPNotification, ...prev]);
      localStorage.removeItem('newIPAlert');
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    if (window.confirm('Clear all notifications?')) {
      setNotifications([]);
    }
  };

  const addNotification = (type) => {
    const newNotification = {
      id: Date.now(),
      type,
      title: `New ${type} notification`,
      message: `This is a new ${type} type notification for demonstration.`,
      time: new Date(),
      read: false,
      avatar: <User className="w-5 h-5" />
    };
    setNotifications([newNotification, ...notifications]);
  };

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

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
          <Bell className="w-8 h-8 text-cyan-400" />
        </div>
        <div className="absolute top-40 right-32 w-12 h-12 bg-pink-500/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }}>
          <AlertCircle className="w-6 h-6 text-pink-400 mx-auto mt-3" />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-4 pt-20">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 mb-6" style={cardStyle}>
          <h1 className="text-2xl font-bold text-white mb-2">Notification Center</h1>
          <p className="text-white/60">Manage all your notifications in one place</p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-sm text-white/60 self-center">Add Demo:</span>
            {['success', 'error', 'warning', 'info'].map(type => (
              <button
                key={type}
                onClick={() => addNotification(type)}
                className={`px-3 py-1 rounded-full text-sm capitalize transition-all duration-300 transform hover:scale-105 ${
                  type === 'success' ? 'bg-green-500/20 text-green-400 hover:bg-green-500/40 border border-green-500/30' :
                  type === 'error' ? 'bg-red-500/20 text-red-400 hover:bg-red-500/40 border border-red-500/30' :
                  type === 'warning' ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/40 border border-yellow-500/30' :
                  'bg-blue-500/20 text-blue-400 hover:bg-blue-500/40 border border-blue-500/30'
                }`}
              >
                + {type}
              </button>
            ))}
          </div>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative p-3 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-white/20 hover:scale-110"
          >
            <Bell className="w-6 h-6 text-white group-hover:text-cyan-400 transition" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {isOpen && (
            <div className="absolute right-0 top-2 w-96 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-4 border-b border-white/10 bg-white/5">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-white">Notifications</h2>
                  <span className="text-sm text-cyan-400">{unreadCount} unread</span>
                </div>
                <div className="flex gap-1 mt-3 bg-white/10 p-1 rounded-lg">
                  {['all', 'unread', 'read'].map(f => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`flex-1 py-1.5 text-sm rounded-md capitalize transition-all duration-300 ${
                        filter === f 
                          ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white shadow-lg' 
                          : 'text-white/60 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {filteredNotifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="w-12 h-12 text-white/30 mx-auto mb-3" />
                    <p className="text-white/50">No notifications</p>
                  </div>
                ) : (
                  filteredNotifications.map((notification, index) => {
                    const typeConfig = NOTIFICATION_TYPES[notification.type];
                    const IconComponent = typeConfig.icon;
                    
                    return (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${!notification.read ? 'bg-white/5' : ''}`}
                        style={{ animationDelay: `${index * 0.05}s` }}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex gap-3">
                          <div className={`w-10 h-10 rounded-full ${typeConfig.bgLight} bg-opacity-20 flex items-center justify-center flex-shrink-0 ${typeConfig.textColor}`}>
                            {notification.avatar || <IconComponent className="w-5 h-5" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h4 className={`font-semibold text-sm ${!notification.read ? 'text-white' : 'text-white/70'}`}>
                                  {notification.title}
                                  {!notification.read && (
                                    <span className="ml-2 w-2 h-2 bg-cyan-400 rounded-full inline-block animate-pulse"></span>
                                  )}
                                </h4>
                                <p className="text-sm text-white/60 mt-0.5 line-clamp-2">{notification.message}</p>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="p-1 hover:bg-red-500/20 rounded-lg transition opacity-0 group-hover:opacity-100"
                              >
                                <X className="w-4 h-4 text-white/40 hover:text-red-400" />
                              </button>
                            </div>
                            <div className="flex items-center gap-1 mt-2 text-xs text-white/40">
                              <Clock className="w-3 h-3" />
                              {formatTimeAgo(notification.time)}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="p-3 border-t border-white/10 bg-white/5 flex items-center justify-between">
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-cyan-500/20 transition-all duration-300"
                >
                  <CheckCheck className="w-4 h-4" />
                  Mark all read
                </button>
                <button
                  onClick={clearAll}
                  className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-red-500/20 transition-all duration-300"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Features', items: ['Bell icon with unread badge', 'Dropdown with notification list', 'Filter: All/Unread/Read', 'Mark as read functionality'], icon: Bell },
            { title: 'Notification Types', items: ['Success', 'Error', 'Warning', 'Info'], icon: Info },
            { title: 'Usage', items: ['Click bell to open', 'Click to mark as read', 'Use filters', 'Delete notifications'], icon: User }
          ].map((item, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 transform hover:scale-105 transition-all duration-300" style={cardStyle}>
              <h3 className="font-semibold text-white mb-2 flex items-center gap-2"><item.icon className="w-5 h-5 text-cyan-400" />{item.title}</h3>
              <ul className="text-sm text-white/60 space-y-1">
                {item.items.map((i, idx) => <li key={idx}>✓ {i}</li>)}
              </ul>
            </div>
          ))}
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

export default Notification;
