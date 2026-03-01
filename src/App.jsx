// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Homepage from './Homepage';
import Loginpage from './components/Loginpage';
import Signuppage from './components/Signuppage';
import StudentDashboard from './Student/StudentDashboard';
import StudentDashboard2 from './Student/StudentDashboard2';
import Saved from './Student/Saved';
import AiRecs from './Student/AiRecs';
import Notification from './Student/Notification';
import Bookings from './Student/Bookings';
import Payment from './Student/Payment';
import Settings from './Student/Settings';
import About from './Student/About';

import AdminDashboard from './components/AdminDashboard';
import SearchResults from './Student/SearchResults';
// import Room from './local/Room';
import Web from './components/Web';
import OneOwnerPage from './Owner/OneOwnerPage';
import OwnerDashboardPage from './Owner/OwnerDashboardPage';
import OwnerListings from './Owner/OwnerListings';
import OwnerBookings from './Owner/OwnerBookings';
import OwnerPayments from './Owner/OwnerPayments';
import OwnerMessages from './Owner/OwnerMessages';
import OwnerSettings from './Owner/OwnerSettings';
import OwnerAddListing from './Owner/OwnerAddListing';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Homepage user={user} onLogout={handleLogout} />} />
        <Route path="/login" element={<Loginpage setUser={setUser} />} />
        <Route path="/signup" element={<Signuppage />} />

        {/* PROTECTED ROUTES - Student */}
        <Route path="/student" element={
          user?.role === 'student' ? <Header user={user} onLogout={handleLogout}><StudentDashboard user={user} /></Header> : <Navigate to="/" />
        } />
        <Route path="/student/dashboard2" element={
          user?.role === 'student' ? <Header user={user} onLogout={handleLogout}><StudentDashboard2 user={user} /></Header> : <Navigate to="/" />
        } />
        <Route path="/student/saved" element={
          user?.role === 'student' ?<Header user={user} onLogout={handleLogout}><Saved user={user} /></Header> : <Navigate to="/" />
        } /> 
        <Route path="/student/recommendations" element={
          user?.role === 'student' ? <Header user={user} onLogout={handleLogout}><AiRecs user={user} /></Header> : <Navigate to="/" />
        } />
        <Route path="/student/notifications" element={
          user?.role === 'student' ? <Header user={user} onLogout={handleLogout}><Notification user={user}/></Header> : <Navigate to="/" />
        } />
        <Route path="/student/bookings" element={
          user?.role === 'student' ? <Header user={user} onLogout={handleLogout}><Bookings user={user}/></Header> : <Navigate to="/" />
        } />
        <Route path="/student/payments" element={
          user?.role === 'student' ? <Header user={user} onLogout={handleLogout}><Payment user={user}/></Header> : <Navigate to="/" />
        } />
        <Route path="/student/settings" element={
          user?.role === 'student' ? <Header user={user} onLogout={handleLogout}><Settings user={user} onLogout={handleLogout} /></Header> : <Navigate to="/" />
        } />
        <Route path="/student/about" element={
          user?.role === 'student' ? <Header user={user} onLogout={handleLogout}><About user={user} onLogout={handleLogout} /></Header> : <Navigate to="/" />
        } />
        
        {/* PROTECTED ROUTES - Owner */}
        <Route path="/owner" element={
          user?.role === 'owner' ? <Header user={user} onLogout={handleLogout}><OneOwnerPage user={user} /></Header> : <Navigate to="/" />
        } />
        <Route path="/owner/dashboardpage" element={
          user?.role === 'owner' ? <Header user={user} onLogout={handleLogout}><OwnerDashboardPage user={user} /></Header> : <Navigate to="/" />
        } />
        <Route path="/owner/dashboard2" element={
          user?.role === 'owner' ? <Header user={user} onLogout={handleLogout}><StudentDashboard2 user={user} /></Header> : <Navigate to="/" />
        } />
        <Route path="/owner/saved" element={
          user?.role === 'owner' ? <Header user={user} onLogout={handleLogout}><Saved user={user} /></Header> : <Navigate to="/" />
        } />
        <Route path="/owner/recommendations" element={
          user?.role === 'owner' ? <Header user={user} onLogout={handleLogout}><AiRecs user={user} /></Header> : <Navigate to="/" />
        } />
        <Route path="/owner/notifications" element={
          user?.role === 'owner' ? <Header user={user} onLogout={handleLogout}><Notification user={user} /></Header> : <Navigate to="/" />
        } />
        <Route path="/owner/about" element={
          user?.role === 'owner' ? <Header user={user} onLogout={handleLogout}><About user={user} onLogout={handleLogout} /></Header> : <Navigate to="/" />
        } />
        <Route path="/owner/listings" element={
          user?.role === 'owner' ? <Header user={user} onLogout={handleLogout}><OwnerListings user={user} /></Header> : <Navigate to="/" />
        } />
        <Route path="/owner/add" element={
          user?.role === 'owner' ? <Header user={user} onLogout={handleLogout}><OwnerAddListing user={user} /></Header> : <Navigate to="/" />
        } />
        <Route path="/owner/bookings" element={
          user?.role === 'owner' ? <Header user={user} onLogout={handleLogout}><OwnerBookings user={user} /></Header> : <Navigate to="/" />
        } />
        <Route path="/owner/payments" element={
          user?.role === 'owner' ? <Header user={user} onLogout={handleLogout}><OwnerPayments user={user} /></Header> : <Navigate to="/" />
        } />
        <Route path="/owner/messages" element={
          user?.role === 'owner' ? <Header user={user} onLogout={handleLogout}><OwnerMessages user={user} /></Header> : <Navigate to="/" />
        } />
        <Route path="/owner/settings" element={
          user?.role === 'owner' ? <Header user={user} onLogout={handleLogout}><OwnerSettings user={user} /></Header> : <Navigate to="/" />
        } />
      
        
      
        {/* PROTECTED ROUTES - Admin */}
        <Route path="/admin" element={
          user?.role === 'admin' ? <Header user={user} onLogout={handleLogout}><AdminDashboard user={user} /></Header> : <Navigate to="/" />
        } />
        <Route path="/admin/users" element={
          user?.role === 'admin' ? <Header user={user} onLogout={handleLogout}><div className="pt-16 p-8"><h1>Manage Users</h1></div></Header> : <Navigate to="/" />
        } />
<Route path="/admin/listings" element={
          user?.role === 'admin' ? <Header user={user} onLogout={handleLogout}><div className="pt-16 p-8"><h1>Manage Listings</h1></div></Header> : <Navigate to="/" />
        } />
        
        {/* SEARCH ROUTES */}
        <Route path="/search/:type" element={<SearchResults user={user} />} />
        
        <Route path="/Web" element={<Web  />} />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
