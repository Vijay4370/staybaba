import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Loginpage = ({ setUser }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.username,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        
        if (data.newIPAlert && data.newIPAlert.detected) {
          const alertMessage = `⚠️ Security Alert: ${data.newIPAlert.message}`;
          alert(alertMessage);
          localStorage.setItem('newIPAlert', JSON.stringify(data.newIPAlert));
        }
        
        if (setUser) setUser(data.user);
        
        if (data.user.role === 'student') {
          navigate('/student');
        } else if (data.user.role === 'owner') {
          navigate('/owner/dashboardpage');
        } else if (data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setError(data.message || '❌ Invalid username or password!');
      }
    } catch (err) {
      setError('❌ Cannot connect to server!');
    } finally {
      setIsLoading(false);
    }
  };

  const cardStyle = {
    transform: `perspective(1000px) rotateY(${mousePosition.x * 10}deg) rotateX(${-mousePosition.y * 10}deg)`,
    transition: 'transform 0.3s ease-out',
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating Shapes */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-cyan-400 rounded-full animate-float opacity-60"></div>
      <div className="absolute bottom-32 right-20 w-6 h-6 bg-purple-400 rounded-full animate-float opacity-60" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-pink-400 rounded-full animate-float opacity-60" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-1/3 w-5 h-5 bg-blue-400 rounded-full animate-float opacity-60" style={{ animationDelay: '1.5s' }}></div>

      {/* Login Card */}
      <div 
        className="relative z-10 w-full max-w-md p-8"
        onMouseMove={handleMouseMove}
        style={cardStyle}
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Gradient Border Effect */}
          <div className="h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"></div>
          
          <div className="p-8">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 shadow-lg mb-4 transform hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-gray-400">Sign in to continue your journey</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 text-red-300 rounded-xl animate-shake">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {error}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username or Email"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all duration-300"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-14 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  )}
                </button>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-white/5 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0" />
                  <span className="text-gray-400">Remember me</span>
                </label>
                <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">Forgot password?</a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-purple-500/30 relative overflow-hidden group"
              >
                <span className={`relative z-10 flex items-center justify-center gap-2 ${isLoading ? 'opacity-0' : ''}`}>
                  Sign In
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                {/* Button Glow Effect */}
                <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </button>
            </form>

            {/* Signup Link */}
            <div className="mt-8 text-center">
              <span className="text-gray-400">Don't have an account? </span>
              <Link to="/signup" className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors inline-flex items-center gap-1 group">
                Sign Up
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Loginpage;
