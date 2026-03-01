// components/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ user, onLogout, children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle Dashboard click based on user role
  const handleDashboardClick = (e) => {
    e.preventDefault();
    if (user?.role === 'owner') {
      navigate('/owner/dashboardpage');
    } else if (user?.role === 'student') {
      navigate('/student/dashboard2');
    } else if (user?.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    if (onLogout) onLogout();
    navigate('/'); 
  };

  // Scroll Detection Logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 50) {
        if (currentScrollY > lastScrollY) {
          setIsHeaderVisible(false);
        } else {
          setIsHeaderVisible(true);
        }
      } else {
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      {/* Content passed from App.js */}
      {children}

      {/* Header with scroll hide/show functionality */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-transform duration-300 ease-in-out ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex justify-between items-center px-5 py-3 max-w-7xl mx-auto">
          
          {user?.role !== 'owner' && (
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2">
                <img src="/images/logo.png" alt="Logo" className="h-10" onError={(e) => e.target.style.display = 'none'} />
                <span className="text-xl font-bold text-[#2c3e50]">StayBaba</span>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle - Always visible on mobile */}
          <div className="md:hidden text-2xl cursor-pointer text-[#2c3e50]" onClick={toggleMenu}>
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </div>

          {/* Desktop Navigation - Hide for owner, show for others */}
          {user?.role !== 'owner' && (
            <nav className="hidden md:flex gap-4 items-center">
              {/* Always show Home link */}
              <NavLink to="/">Home</NavLink>
              
              {user ? (
                <>
                  {/* STUDENT ROLE */}
                  {user.role === 'student' && (
                    <>
                      {/* Dashboard - Goes to Student Dashboard */}
                      <NavLink to="/student/dashboard2">Dashboard</NavLink>                    
                      <NavLink to="/student/saved">Saved</NavLink>
                      <NavLink to="/student/recommendations">AI Recs</NavLink>
                      <NavLink to="/student/notifications">Notifications</NavLink>
                      <NavLink to="/student/bookings">Bookings</NavLink>
                      <NavLink to="/student/payments">Payments</NavLink>
                      <NavLink to="/student/settings">Settings</NavLink>
                      <NavLink to="/student/about">About</NavLink>
                      <button onClick={handleLogout} className="text-red-500 hover:bg-red-50 px-3 py-2 rounded-md">Logout</button>
                    </>
                  )}

                  {/* ADMIN ROLE */}
                  {user.role === 'admin' && (
                    <>
                      <button 
                        onClick={handleDashboardClick}
                        className="text-[#2c3e50] hover:bg-gray-100 px-3 py-2 rounded-md font-medium transition-colors"
                      >
                        Dashboard
                      </button>
                      <NavLink to="/admin/users">Users</NavLink>
                      <NavLink to="/admin/listings">All Listings</NavLink>
                      <NavLink to="/admin/reports">Reports</NavLink>
                      <button onClick={handleLogout} className="text-red-500 hover:bg-red-50 px-3 py-2 rounded-md">Logout</button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <NavLink to="/login">Login</NavLink>
                  <NavLink to="/signup">Signup</NavLink>
                  <Link 
                    to="/OneOwnerPage" 
                    className="bg-[#2c3e50] text-white px-4 py-2 rounded-lg hover:bg-[#34495e] transition-colors"
                  >
                    Owner Listing
                  </Link>
                </>
              )}
            </nav>
          )}
        </div>

        {/* Mobile Menu - Hide for owner */}
        {isMenuOpen && user?.role !== 'owner' && (
          <nav className="md:hidden absolute top-16 right-4 bg-white w-56 rounded-lg shadow-lg py-4 px-4">
            {/* Always show Home in mobile */}
            <MobileLink to="/" onClick={toggleMenu}>Home</MobileLink>
            
            {user ? (
              <>
                {/* STUDENT MOBILE MENU */}
                {user.role === 'student' && (
                  <>
                    <button 
                      onClick={() => {
                        handleDashboardClick({ preventDefault: () => {} });
                        toggleMenu();
                      }}
                      className="block w-full text-left text-[#2c3e50] px-3 py-2 font-medium"
                    >
                      Dashboard
                    </button>
                    <MobileLink to="/student/saved" onClick={toggleMenu}>Saved</MobileLink>
                    <MobileLink to="/student/recommendations" onClick={toggleMenu}>AI Recs</MobileLink>
                    <MobileLink to="/student/notifications" onClick={toggleMenu}>Notifications</MobileLink>
                    <MobileLink to="/student/bookings" onClick={toggleMenu}>Bookings</MobileLink>
                    <MobileLink to="/student/payments" onClick={toggleMenu}>Payments</MobileLink>
                    <MobileLink to="/student/settings" onClick={toggleMenu}>Settings</MobileLink>
                    <MobileLink to="/student/support" onClick={toggleMenu}>Support</MobileLink>
                    <button onClick={handleLogout} className="text-red-500 text-left w-full px-3 py-2">Logout</button>
                  </>
                )}

                {/* ADMIN MOBILE MENU */}
                {user.role === 'admin' && (
                  <>
                    <button 
                      onClick={() => {
                        handleDashboardClick({ preventDefault: () => {} });
                        toggleMenu();
                      }}
                      className="block w-full text-left text-[#2c3e50] px-3 py-2 font-medium"
                    >
                      Dashboard
                    </button>
                    <MobileLink to="/admin/users" onClick={toggleMenu}>Users</MobileLink>
                    <MobileLink to="/admin/listings" onClick={toggleMenu}>All Listings</MobileLink>
                    <MobileLink to="/admin/reports" onClick={toggleMenu}>Reports</MobileLink>
                    <button onClick={handleLogout} className="text-red-500 text-left w-full px-3 py-2">Logout</button>
                  </>
                )}
              </>
            ) : (
              <>
                <MobileLink to="/login" onClick={toggleMenu}>Login</MobileLink>
                <MobileLink to="/signup" onClick={toggleMenu}>Signup</MobileLink>
                <MobileLink to="/OneOwnerPage" onClick={toggleMenu}>Owner Listing</MobileLink>
              </>
            )}
          </nav>
        )}
      </header>
    </>
  );
};

const NavLink = ({ to, children }) => (
  <Link to={to} className="text-[#2c3e50] hover:bg-gray-100 px-3 py-2 rounded-md font-medium transition-colors">{children}</Link>
);

const MobileLink = ({ to, onClick, children }) => (
  <Link to={to} onClick={onClick} className="block text-[#2c3e50] px-3 py-2 font-medium">{children}</Link>
);

export default Header;
