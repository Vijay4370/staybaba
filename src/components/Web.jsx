import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Web = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  // Default user for demo (remove this when you have real auth)
  const currentUser = user || {
    isAuthenticated: false,
    role: null,
    name: 'User'
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Scroll Detection Logic - Header hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Threshold check - 50px scroll ke baad hi kaam karega
      if (currentScrollY > 50) {
        // Decide visibility based on scroll direction
        if (currentScrollY > lastScrollY) {
          // Scrolling DOWN - Hide header
          setIsHeaderVisible(false);
        } else {
          // Scrolling UP - Show header
          setIsHeaderVisible(true);
        }
      } else {
        // Top position par ho to header show kare
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Handle Owner Listing click with navigation
  const handleOwnerListingClick = (e) => {
    e.preventDefault();
    navigate('/OneOwnerPage');
  };

  return (
    <>
      {/* Header with scroll hide/show functionality */}
      <header 
        className={`fixed top-0 left-0 w-full bg-white shadow-md z-50 transition-transform duration-300 ease-in-out ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo Section */}
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center space-x-2">
                <img 
                  src="/images/images/logo.png" 
                  alt="StayBaba Logo" 
                  className="h-10 w-10 object-contain"
                  onError={(e) => e.target.style.display = 'none'}
                />
                <span className="text-2xl font-bold text-[#2c3e50]">StayBaba</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              {currentUser.isAuthenticated ? (
                <>
                  {currentUser.role === 'student' && (
                    <>
                      <Link to="/student/saved" className="text-gray-700 hover:text-[#74ebd5] px-3 py-2 rounded-md font-medium transition-colors">
                        Saved
                      </Link>
                      <Link to="/student/recommendations" className="text-gray-700 hover:text-[#74ebd5] px-3 py-2 rounded-md font-medium transition-colors">
                        AI Recs
                      </Link>
                      <Link to="/student/notifications" className="text-gray-700 hover:text-[#74ebd5] px-3 py-2 rounded-md font-medium transition-colors">
                        Notifications
                      </Link>
                      <Link to="/student/bookings" className="text-gray-700 hover:text-[#74ebd5] px-3 py-2 rounded-md font-medium transition-colors">
                        Bookings
                      </Link>
                      <Link to="/student/payments" className="text-gray-700 hover:text-[#74ebd5] px-3 py-2 rounded-md font-medium transition-colors">
                        Payments
                      </Link>
                      <Link to="/student/settings" className="text-gray-700 hover:text-[#74ebd5] px-3 py-2 rounded-md font-medium transition-colors">
                        Settings
                      </Link>
                      <Link to="/student/support" className="text-gray-700 hover:text-[#74ebd5] px-3 py-2 rounded-md font-medium transition-colors">
                        Support
                      </Link>
                    </>
                  )}

                  {currentUser.role === 'owner' && (
                    <>
                      <Link to="/owner/listings" className="text-gray-700 hover:text-[#74ebd5] px-3 py-2 rounded-md font-medium transition-colors">
                        My Listings
                      </Link>
                      <Link to="/owner/add" className="text-gray-700 hover:text-[#74ebd5] px-3 py-2 rounded-md font-medium transition-colors">
                        Add Listing
                      </Link>
                    </>
                  )}

                  {currentUser.role === 'admin' && (
                    <Link to="/admin" className="text-gray-700 hover:text-[#74ebd5] px-3 py-2 rounded-md font-medium transition-colors">
                      Admin Panel
                    </Link>
                  )}

                  {/* Logout Button */}
                  <form method="post" action="/logout" className="inline">
                    <input type="hidden" name="csrfmiddlewaretoken" value="dummy-token" />
                    <button 
                      type="submit"
                      className="text-gray-700 hover:text-red-500 px-3 py-2 rounded-md font-medium transition-colors"
                    >
                      Logout
                    </button>
                  </form>

                  {/* Profile Icon */}
                  <Link to="/profile" className="text-gray-700 hover:text-[#74ebd5] px-2 transition-colors">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-[#74ebd5] px-3 py-2 rounded-md font-medium transition-colors">
                    Login
                  </Link>
                  <Link to="/signup" className="text-gray-700 hover:text-[#74ebd5] px-3 py-2 rounded-md font-medium transition-colors">
                    Signup
                  </Link>
                  <button 
                    onClick={handleOwnerListingClick}
                    className="bg-[#2c3e50] text-white px-4 py-2 rounded-lg hover:bg-[#34495e] transition-colors"
                  >
                    Owner Listing
                  </button>
                </>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-[#2c3e50] p-2 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {currentUser.isAuthenticated ? (
                <>
                  {currentUser.role === 'student' && (
                    <>
                      <Link to="/student/saved" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                        Saved
                      </Link>
                      <Link to="/student/recommendations" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                        AI Recs
                      </Link>
                      <Link to="/student/notifications" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                        Notifications
                      </Link>
                      <Link to="/student/bookings" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                        Bookings
                      </Link>
                      <Link to="/student/payments" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                        Payments
                      </Link>
                      <Link to="/student/settings" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                        Settings
                      </Link>
                      <Link to="/student/support" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                        Support
                      </Link>
                    </>
                  )}

                  {currentUser.role === 'owner' && (
                    <>
                      <Link to="/owner/listings" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                        My Listings
                      </Link>
                      <Link to="/owner/add" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                        Add Listing
                      </Link>
                    </>
                  )}

                  {currentUser.role === 'admin' && (
                    <Link to="/admin" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                      Admin Panel
                    </Link>
                  )}

                  <form method="post" action="/logout" className="block">
                    <button 
                      type="submit"
                      className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      Logout
                    </button>
                  </form>

                  <Link to="/profile" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                    Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                    Login
                  </Link>
                  <Link to="/signup" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                    Signup
                  </Link>
                  <button 
                    onClick={handleOwnerListingClick}
                    className="w-full text-left px-3 py-2 bg-[#2c3e50] text-white rounded-md transition-colors"
                  >
                    Owner Listing
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-16"></div>
    </>
  );
};

export default Web;