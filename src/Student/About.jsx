import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Shield, Users, Home, Star, ArrowRight } from 'lucide-react';

const About = ({ user }) => {
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

  const cardStyle = {
    transform: `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg)`,
    transition: 'transform 0.3s ease-out',
  };

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating Student Icons */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center animate-float transform hover:scale-125 transition-transform duration-300 backdrop-blur-sm">
          <GraduationCap className="w-8 h-8 text-cyan-400" />
        </div>
        <div className="absolute top-40 right-32 w-12 h-12 bg-pink-500/20 rounded-full animate-float transform hover:scale-125 transition-transform duration-300" style={{ animationDelay: '0.5s' }}>
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-pink-400" />
          </div>
        </div>
        <div className="absolute bottom-32 left-1/4 w-14 h-14 bg-purple-500/20 rounded-xl animate-float transform hover:scale-125 transition-transform duration-300" style={{ animationDelay: '1s' }}>
          <div className="w-full h-full flex items-center justify-center">
            <Users className="w-7 h-7 text-purple-400" />
          </div>
        </div>
        <div className="absolute bottom-20 right-20 w-10 h-10 bg-yellow-500/20 rounded-lg animate-float transform hover:scale-125 transition-transform duration-300" style={{ animationDelay: '1.5s' }}>
          <div className="w-full h-full flex items-center justify-center">
            <Star className="w-5 h-5 text-yellow-400" />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        
        {/* Hero Section */}
        <div className="text-center mb-16" style={cardStyle}>
          <div className="inline-block p-5 rounded-3xl bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 shadow-2xl mb-6 transform hover:scale-110 transition-transform duration-500 animate-pulse">
            <Home className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            About StayBaba
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your trusted platform for finding the perfect PG, flat, or rental accommodation.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <div className="px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20">
              <span className="text-cyan-400 font-bold">🎓</span>
              <span className="text-white ml-2">Student Friendly</span>
            </div>
            <div className="px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20">
              <span className="text-pink-400 font-bold">🏠</span>
              <span className="text-white ml-2">Verified Listings</span>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 mb-8 transform hover:scale-[1.02] transition-transform duration-300" style={cardStyle}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">Our Mission</h2>
          </div>
          <p className="text-gray-300 leading-relaxed text-lg">
            StayBaba aims to simplify the process of finding safe and comfortable accommodation for students and working professionals. 
            We connect tenants with verified property owners, ensuring a hassle-free rental experience across India.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: Shield, title: 'Verified Listings', desc: 'All properties are verified by our team to ensure authenticity', color: 'from-cyan-500 to-blue-500', iconColor: 'text-cyan-400' },
            { icon: Users, title: 'Student Friendly', desc: 'Specialized for students with budget-friendly options', color: 'from-pink-500 to-rose-500', iconColor: 'text-pink-400' },
            { icon: Home, title: 'Wide Range', desc: 'PG, flats, hostels, and independent rooms', color: 'from-purple-500 to-indigo-500', iconColor: 'text-purple-400' }
          ].map((feature, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6 text-center transform hover:scale-110 hover:rotate-2 transition-all duration-300 group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-spin-slow transition-transform`}>
                <feature.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 mb-8 transform hover:scale-[1.02] transition-transform duration-300" style={cardStyle}>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { value: '10,000+', label: 'Properties', icon: Home },
              { value: '5,000+', label: 'Happy Tenants', icon: Users },
              { value: '500+', label: 'Cities', icon: MapPin },
              { value: '4.8', label: 'Average Rating', icon: Star }
            ].map((stat, index) => (
              <div key={index} className="transform hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-white/80" />
                <p className="text-4xl font-bold text-white">{stat.value}</p>
                <p className="text-cyan-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8" style={cardStyle}>
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Phone, title: 'Phone', value: '+91 9876543210', color: 'from-cyan-500 to-blue-500' },
              { icon: Mail, title: 'Email', value: 'support@staybaba.com', color: 'from-pink-500 to-rose-500' },
              { icon: MapPin, title: 'Address', value: 'Mumbai, Maharashtra, India', color: 'from-purple-500 to-indigo-500' },
              { icon: Clock, title: 'Working Hours', value: 'Mon - Sat: 9 AM - 7 PM', color: 'from-yellow-500 to-orange-500' }
            ].map((contact, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 transform hover:scale-105 transition-transform duration-300">
                <div className={`w-14 h-14 bg-gradient-to-br ${contact.color} rounded-xl flex items-center justify-center`}>
                  <contact.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">{contact.title}</p>
                  <p className="text-gray-400">{contact.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>© 2024 StayBaba. All rights reserved.</p>
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
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

// Add missing imports
const GraduationCap = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
  </svg>
);

const BookOpen = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
  </svg>
);

export default About;
