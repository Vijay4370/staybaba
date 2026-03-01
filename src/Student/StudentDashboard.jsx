import React, { useState, useEffect } from 'react';
import Web from '../components/Web';

const StudentDashboard = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [nearbyPGs, setNearbyPGs] = useState([]);
  const [savedRooms, setSavedRooms] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([{ text: "Hello, how can I help you today?", type: "bot" }]);
  const [chatInput, setChatInput] = useState("");
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

  useEffect(() => {
    if (user && user.id) {
      fetchStudentData();
    }
  }, [user]);

  const fetchStudentData = async () => {
    setLoading(true);
    setTimeout(() => {
      setAiRecommendations([
        { id: 1, title: "Single Room", price: "Rs5000/month", distance: "1km from college", image: "/images/room1.jpg" },
        { id: 2, title: "PG for Girls", price: "Rs4500/month", distance: "2km from college", image: "/images/pg1.jpg" },
        { id: 3, title: "Shared Flat", price: "Rs6000/month", distance: "Near ABC Institute", image: "/images/flat1.jpg" },
      ]);
      setNearbyPGs([
        { id: 1, title: "PG for Boys", price: "Rs5500/month", distance: "500m from college", image: "/images/pg2.jpg" },
        { id: 2, title: "PG for Girls", price: "Rs4800/month", distance: "800m from college", image: "/images/pg3.jpg" },
      ]);
      setSavedRooms([
        { id: 1, title: "Shared Room", price: "Rs5000/month", location: "Near XYZ College", image: "/images/room2.jpg" },
        { id: 2, title: "PG for Girls", price: "Rs4500/month", location: "2km from College", image: "/images/pg4.jpg" },
      ]);
      setNotifications([
        "New PG added near your college.",
        "Price drop in PG for Girls - Rs4500 to Rs4200",
        "Owner responded to your inquiry for Shared Flat",
      ]);
      setLoading(false);
    }, 1000);
  };

  const toggleChat = () => setChatOpen(!chatOpen);

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const newMessages = [...chatMessages, { text: chatInput, type: "user" }];
    setChatMessages(newMessages);
    setChatInput("");
    setTimeout(() => {
      let response = "I'm not sure about that. Please check support.";
      if (chatInput.toLowerCase().includes("pg")) response = "You can search PGs near your college in the search section.";
      if (chatInput.toLowerCase().includes("verified")) response = "Yes, all listings are verified by our team.";
      if (chatInput.toLowerCase().includes("rent")) response = "Our AI analyzes pricing trends to suggest the best rents.";
      setChatMessages(prev => [...prev, { text: response, type: "bot" }]);
    }, 800);
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
      </div>

      <div className="relative z-10 pt-20">
        <section className="relative h-[60vh] md:h-[70vh] flex flex-col justify-center items-center text-center text-white px-5" style={{ backgroundImage: "url('/images/single.jpg')" }}>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 max-w-4xl w-full">
            <h1 className="text-4xl md:text-5xl font-bold mb-5 drop-shadow-lg bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome, {user?.full_name || user?.username || 'Student'}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl drop-shadow-lg mb-8 text-gray-200">
              Explore rooms and PGs tailored for you.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <input type="text" placeholder="Enter City or College" className="px-4 py-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/50 w-full md:w-auto min-w-[200px]" />
              <select className="px-4 py-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-white w-full md:w-auto min-w-[150px] [&>option]:text-black">
                <option value="">Select Type</option>
                <option value="room">Room</option>
                <option value="pg">PG</option>
                <option value="flat">Flat</option>
              </select>
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-pink-500 text-white hover:from-cyan-400 hover:to-pink-400 transition duration-300 w-full md:w-auto transform hover:scale-105">
                Search
              </button>
            </div>
          </div>
        </section>

        <section className="w-full py-16 px-5 md:px-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">AI Recommendations For You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {aiRecommendations.map((item, index) => (
              <div key={item.id} className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden transform hover:scale-105 transition-all duration-300 hover:-translate-y-2" style={{ animationDelay: `${index * 0.1}s`, ...cardStyle }}>
                <div className="w-full h-48 bg-gradient-to-br from-cyan-500/30 to-pink-500/30 flex items-center justify-center">
                  <span className="text-white/60">Image</span>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="text-cyan-300 mt-2">{item.price} | {item.distance}</p>
                  <button className="mt-3 px-4 py-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-white rounded-lg hover:from-cyan-400 hover:to-pink-400 transition-all duration-300 transform hover:scale-105">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full py-16 px-5 md:px-20 bg-black/20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">Nearby PGs</h2>
          <div className="w-full h-80 bg-gradient-to-br from-green-500/20 to-cyan-500/20 flex justify-center items-center text-lg text-white/60 rounded-2xl mb-10 max-w-6xl mx-auto border border-white/10 backdrop-blur-sm">
            Map showing nearby PGs
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {nearbyPGs.map((item, index) => (
              <div key={item.id} className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden transform hover:scale-105 transition-all duration-300 hover:-translate-y-2" style={{ ...cardStyle }}>
                <div className="w-full h-48 bg-gradient-to-br from-green-500/30 to-emerald-500/30 flex items-center justify-center">
                  <span className="text-white/60">Image</span>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="text-green-300 mt-2">{item.price} | {item.distance}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full py-16 px-5 md:px-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">Saved Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {savedRooms.map((item, index) => (
              <div key={item.id} className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden transform hover:scale-105 transition-all duration-300 hover:-translate-y-2" style={{ ...cardStyle }}>
                <div className="w-full h-48 bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center">
                  <span className="text-white/60">Image</span>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="text-pink-300 mt-2">{item.price} | {item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 mx-5 md:mx-20 my-10 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold mb-5 text-white">Notifications</h3>
          <ul className="list-none">
            {notifications.map((notif, index) => (
              <li key={index} className="py-3 border-b border-white/10 text-gray-300 last:border-b-0 hover:bg-white/5 transition-all duration-300 px-3 rounded-lg">
                {notif}
              </li>
            ))}
          </ul>
        </section>

        <button className="fixed bottom-5 right-5 bg-gradient-to-r from-cyan-500 to-pink-500 text-white rounded-full w-14 h-14 md:w-16 md:h-16 flex justify-center items-center text-2xl shadow-lg hover:scale-110 transition duration-300 z-50 animate-bounce" onClick={toggleChat}>
          ?
        </button>

        {chatOpen && (
          <div className="fixed bottom-24 right-5 w-72 md:w-80 h-96 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-white/20">
            <div className="bg-gradient-to-r from-cyan-500 to-pink-500 p-4 text-white font-semibold flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-cyan-500 font-bold">S</div>
              <span>StayBaba Assistant</span>
            </div>
            <div className="flex-1 p-4 overflow-y-auto bg-black/20">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`mb-3 ${msg.type === 'user' ? 'text-right' : ''}`}>
                  <span className={`inline-block px-3 py-2 rounded-lg max-w-[80%] ${msg.type === 'user' ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white' : 'bg-white/20 text-white'}`}>
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex border-t border-white/20">
              <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} placeholder="Type your message..." className="flex-1 border-none px-3 py-3 text-sm focus:outline-none bg-transparent text-white placeholder-white/50" />
              <button onClick={sendMessage} className="px-4 bg-gradient-to-r from-cyan-500 to-pink-500 text-white hover:from-cyan-400 hover:to-pink-400 transition duration-300">
                Send
              </button>
            </div>
          </div>
        )}
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
};

export default StudentDashboard;
