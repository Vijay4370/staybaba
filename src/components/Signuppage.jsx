import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signuppage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    phone: '',
    role: '',
    password: '',
    confirmPassword: ''
  });
  
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOTP = async () => {
    if (!formData.phone || formData.phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setError('');
    setOtpLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/send-otp-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(`OTP sent to +91 ${formData.phone} ✅`);
        setStep(2);
        setTimeout(() => setSuccess(''), 5000);
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      console.error('OTP Error:', err);
      setError('Cannot connect to server!');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setOtpError('Please enter 6-digit OTP');
      return;
    }

    setOtpError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone, otp: otp }),
      });

      const data = await response.json();

      if (data.success) {
        setOtpVerified(true);
        setSuccess('Phone verified! ✅');
        setTimeout(() => {
          setSuccess('');
          setStep(3);
        }, 1500);
      } else {
        setOtpError(data.message || 'Invalid OTP');
        setOtp('');
      }
    } catch (err) {
      setOtpError('Verification failed');
      setOtp('');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!otpVerified) {
      setError('Verify phone first!');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters!');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Account created! Redirecting...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const cardStyle = {
    transform: `perspective(1000px) rotateY(${mousePosition.x * 8}deg) rotateX(${-mousePosition.y * 8}deg)`,
    transition: 'transform 0.3s ease-out',
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating Shapes */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-pink-400 rounded-full animate-float opacity-60"></div>
      <div className="absolute bottom-32 left-20 w-6 h-6 bg-cyan-400 rounded-full animate-float opacity-60" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-purple-400 rounded-full animate-float opacity-60" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-yellow-400 rounded-full animate-float opacity-60" style={{ animationDelay: '1.5s' }}></div>

      {/* Signup Card */}
      <div 
        className="relative z-10 w-full max-w-md"
        onMouseMove={handleMouseMove}
        style={cardStyle}
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Gradient Border Effect */}
          <div className="h-1 bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-500"></div>
          
          <div className="p-8">
            {/* Logo */}
            <div className="text-center mb-6">
              <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-pink-500 to-cyan-600 shadow-lg mb-4 transform hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
              <p className="text-gray-400">Join us and start your journey</p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {[1, 2, 3].map((s) => (
                <React.Fragment key={s}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                    step >= s 
                      ? step > s || (s === 2 && otpVerified)
                        ? 'bg-gradient-to-r from-green-400 to-green-500 text-white scale-110' 
                        : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white scale-110'
                      : 'bg-white/10 text-gray-400'
                  }`}>
                    {step > s || (s === 2 && otpVerified) ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    ) : s}
                  </div>
                  {s < 3 && (
                    <div className={`w-12 h-1 transition-all duration-500 ${
                      step > s ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'bg-white/10'
                    }`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 text-red-300 rounded-xl animate-shake">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {error}
                </div>
              </div>
            )}
            {success && (
              <div className="mb-4 p-4 bg-green-500/20 border border-green-500/50 text-green-300 rounded-xl animate-pulse">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {success}
                </div>
              </div>
            )}

            {/* Step 1 - Basic Info */}
            {step === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <h2 className="text-xl font-bold text-white text-center mb-4">Personal Information</h2>
                
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400 group-focus-within:text-pink-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <input type="text" name="full_name" placeholder="Full Name" value={formData.full_name} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-400/20 transition-all duration-300" required />
                </div>
                
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400 group-focus-within:text-pink-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-400/20 transition-all duration-300" required />
                </div>
                
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400 group-focus-within:text-pink-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-400/20 transition-all duration-300" required />
                </div>
                
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400 group-focus-within:text-pink-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <input type="tel" name="phone" placeholder="Phone Number (10 digits)" value={formData.phone} onChange={handleChange} maxLength="10" className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-400/20 transition-all duration-300" required />
                </div>
                
                <select name="role" value={formData.role} onChange={handleChange} className="w-full py-4 px-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-400/20 transition-all duration-300 [&>option]:text-black">
                  <option value="" className="text-black">Select Role</option>
                  <option value="student" className="text-black">Student</option>
                  <option value="owner" className="text-black">Owner</option>
                </select>

                <button 
                  type="button" 
                  onClick={handleSendOTP} 
                  disabled={otpLoading || !formData.phone || formData.phone.length !== 10} 
                  className={`w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-bold rounded-xl hover:from-pink-400 hover:via-purple-400 hover:to-cyan-400 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-purple-500/30 relative overflow-hidden group ${(otpLoading || !formData.phone || formData.phone.length !== 10) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span className="flex items-center justify-center gap-2">
                    {otpLoading ? 'Sending...' : 'Send OTP'} 
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </button>
              </div>
            )}

            {/* Step 2 - OTP Verification */}
            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-white">Verify Phone</h2>
                  <p className="text-gray-400 text-sm mt-2">
                    OTP sent to <span className="font-semibold text-pink-400">+91 {formData.phone}</span>
                  </p>
                  <p className="text-green-400 text-xs mt-2 font-bold">✅ Demo Mode - Check server console</p>
                </div>

                <input 
                  type="text" 
                  placeholder="Enter 6-digit OTP" 
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)} 
                  maxLength="6" 
                  className="w-full py-4 px-6 text-center text-2xl font-bold tracking-[0.5em] bg-white/5 border-2 border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 transition-all duration-300"
                />

                {otpError && <p className="text-center text-red-400 text-sm">{otpError}</p>}

                <div className="flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setStep(1)} 
                    className="flex-1 py-4 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path>
                    </svg>
                    Back
                  </button>
                  
                  <button 
                    type="button" 
                    onClick={handleVerifyOTP} 
                    disabled={loading || otp.length !== 6} 
                    className={`flex-1 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl hover:from-pink-400 hover:to-purple-400 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 ${(loading || otp.length !== 6) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {loading ? 'Verifying...' : 'Verify OTP'}
                    {!loading && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 - Password */}
            {step === 3 && (
              <form className="space-y-4 animate-fadeIn" onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold text-white text-center mb-4">Set Your Password</h2>
                
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
                  <div
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-white transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
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
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-12 pr-14 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all duration-300"
                    required
                  />
                  <div
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-white transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-purple-500/30 relative overflow-hidden group ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span className="flex items-center justify-center gap-2">
                    {loading ? 'Creating Account...' : 'Create Account'}
                    {!loading && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>}
                  </span>
                  <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </button>
              </form>
            )}

            {/* Login Link */}
            <div className="mt-6 text-center">
              <span className="text-gray-400">Already have an account? </span>
              <Link to="/login" className="text-pink-400 font-semibold hover:text-pink-300 transition-colors inline-flex items-center gap-1 group">
                Sign In
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
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Signuppage;
