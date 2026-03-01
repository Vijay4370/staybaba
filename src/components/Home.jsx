import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Web from './Web';
// --- Data & Configuration ---

const lookingForOptions = [
  "Room", "Roommate", "Apartment", "Flat", "Flatmate", 
  "Sublet", "House", "Entire Place", "Tenant", "Studio"
];

const featuredListings = [
  {
    id: 1,
    title: "Single Room",
    price: "₹5000/month",
    location: "Near XYZ College",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    title: "PG for Girls",
    price: "₹4500/month",
    location: "2km from College",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 3,
    title: "Shared Flat",
    price: "₹6000/month",
    location: "Near ABC Institute",
    image: "https://images.unsplash.com/photo-1502005229766-52835d25e272?auto=format&fit=crop&q=80&w=600"
  }
];

const features = [
  { title: "Verified Listings", desc: "Safe & trusted.", icon: "✓" },
  { title: "AI Suggestions", desc: "Personalized recommendations.", icon: "🤖" },
  { title: "Affordable Pricing", desc: "Fair AI rent prediction.", icon: "💰" },
  { title: "Location Search", desc: "Easy map integration.", icon: "📍" }
];

const testimonials = [
  {
    id: 1,
    name: "Rohit – NIT Bhopal",
    text: "Found an affordable PG in 2 days. Very easy to use!",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Priya – IIT Indore",
    text: "Loved the verified listings. Felt safe and secure.",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  }
];

const faqs = [
  { q: "How do I find a PG near my college?", a: "Use our search bar to enter your city/college and apply filters." },
  { q: "Are the listings verified?", a: "Yes, we verify each property to ensure safety." },
  { q: "Can I contact the owner directly?", a: "Yes, owner details are provided on each listing." },
  { q: "How does AI rent suggestion work?", a: "We analyze market data to suggest fair rental prices." }
];

// --- Components ---

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden transition-shadow hover:shadow-md">
    <button
      className={`w-full text-left px-5 py-4 bg-gray-50 text-base font-medium flex justify-between items-center transition-colors hover:bg-gray-100 ${isOpen ? 'bg-gray-100' : ''}`}
      onClick={onClick}
    >
      {question}
      <span className="text-xl font-bold text-gray-500">{isOpen ? '−' : '+'}</span>
    </button>
    <div 
      className={`px-5 py-4 bg-white border-t border-gray-200 text-gray-600 ${isOpen ? 'block' : 'hidden'}`}
    >
      {answer}
    </div>
  </div>
);

const FooterLinkColumn = ({ title, links }) => (
  <div>
    <h4 className="text-white font-semibold mb-4">{title}</h4>
    <ul className="space-y-2">
      {links.map((link, idx) => (
        <li key={idx}>
          <a href="#" className="text-gray-300 hover:text-[#74ebd5] transition-colors text-sm">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Home = () => {
  const [faqOpenIndex, setFaqOpenIndex] = useState(null);
  const navigate = useNavigate();

  const toggleFaq = (index) => {
    setFaqOpenIndex(faqOpenIndex === index ? null : index);
  };

  const handleOptionClick = (option) => {
    // Convert option to URL-friendly slug
    const slug = option.toLowerCase().replace(' ', '-');
    navigate(`/search/${slug}`);
  };

  return (
    <>
    <Web />
    <div className="font-sans text-gray-800 antialiased">
      
      {/* --- Hero Section --- */}
      <section 
        className="relative flex flex-col items-center justify-center min-h-[80vh] px-5 py-24 text-center bg-cover bg-center bg-no-repeat text-white"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&q=80&w=2070')" }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        <div className="relative z-10 max-w-4xl w-full">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Find Rooms & PGs Near Your College in Minutes.
          </h1>
          <p className="text-lg md:text-xl mb-2 drop-shadow-md">
            AI-powered recommendations, verified listings, and affordable rent.
          </p>
          <h3 className="text-xl md:text-2xl font-medium mt-6 mb-8">
            Focus on what's important and spend less on rent.
          </h3>

{/* Looking For Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 justify-center mb-10">
            {lookingForOptions.map((item, idx) => (
              <button 
                key={idx}
                onClick={() => handleOptionClick(item)}
                className="px-4 py-2 border border-white/80 rounded-md bg-slate-800/80 text-white text-sm cursor-pointer transition-all duration-300 hover:bg-[#74ebd5] hover:text-white hover:scale-110 hover:shadow-[0_0_15px_rgba(116,235,213,0.6)]"
              >
                {item === 'Room' && '🏠'} {item}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="flex flex-wrap gap-4 justify-center">
            <input 
              type="text" 
              placeholder="Search Location / College" 
              className="px-4 py-3 rounded-lg border-none outline-none w-full md:w-64 focus:ring-2 focus:ring-[#74ebd5]"
            />
            <select className="px-4 py-3 rounded-lg border-none outline-none w-full md:w-48 text-gray-600">
              <option>Select Type</option>
              <option>PG</option>
              <option>Flat</option>
              <option>Room</option>
            </select>
            <button className="px-8 py-3 bg-[#2c3e50] text-white rounded-lg font-semibold hover:bg-[#34495e] transition-colors">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* --- Featured Listings --- */}
      <section className="py-16 px-5 text-center bg-gray-50">
        <h2 className="text-3xl font-bold mb-10">Featured Listings</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredListings.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:-translate-y-2 transition-transform duration-300">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-left">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-[#2c3e50] font-semibold">{item.price}</p>
                <p className="text-gray-500 text-sm mt-1">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Why Choose Us --- */}
      <section className="py-16 px-5 text-center">
        <h2 className="text-3xl font-bold mb-10">Why Choose Us</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
           
                    <div key={idx} className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
          <div className="text-4xl mb-4">{feature.icon}</div>
          <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.desc}</p>
        </div>
      ))}
    </div>
  </section>

  {/* --- Testimonials --- */}
  <section className="py-16 px-5 text-center bg-gray-50">
    <h2 className="text-3xl font-bold mb-10">Testimonials</h2>
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {testimonials.map((item) => (
        <div key={item.id} className="bg-white rounded-lg p-8 text-left shadow-md flex items-start gap-4">
          <img 
            src={item.image} 
            alt="profile" 
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <p className="font-bold text-lg">{item.name}</p>
            <p className="text-gray-600 mt-2">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* --- CTA Banner --- */}
  <section className="py-10 px-5">
    <div className="max-w-6xl mx-auto bg-gradient-to-r from-[#9face6] to-[#74ebd5] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 text-white">
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-2xl font-bold mb-3">List Your Space</h3>
        <p className="mb-5 opacity-90">Make money by renting out your vacant space. Fund your dreams!</p>
        <button className="bg-white text-[#2c3e50] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
          List Your Space
        </button>
      </div>
      
      <div className="w-px h-32 bg-white/30 hidden md:block"></div>
      
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-2xl font-bold mb-3">Easyfinder Social Connect</h3>
        <p className="mb-5 opacity-90">Connect with easyfinder members using your favorite social network.</p>
        <button className="bg-white text-[#2c3e50] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
          Connect Now
        </button>
      </div>
    </div>
  </section>

  {/* --- FAQ --- */}
  <section className="py-16 px-5 max-w-4xl mx-auto text-center">
    <h2 className="text-3xl font-bold mb-10">FAQ</h2>
    <div className="text-left">
      {faqs.map((faq, idx) => (
        <FAQItem 
          key={idx}
          question={faq.q}
          answer={faq.a}
          isOpen={faqOpenIndex === idx}
          onClick={() => toggleFaq(idx)}
        />
      ))}
    </div>
  </section>

  {/* --- Footer --- */}
  <footer className="bg-[#2c3e50] text-white pt-16 pb-8 px-5">
    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
      <div className="col-span-2">
        <h4 className="text-xl font-bold mb-4">StayBaba</h4>
        <p className="text-gray-300 text-sm leading-relaxed">
          We help students find rooms and PGs easily with AI-powered tools.
        </p>
      </div>
      
      <FooterLinkColumn title="Company" links={["Terms & Conditions", "Privacy Policy", "Refund & Cancel", "Careers", "Blogs"]} />
      <FooterLinkColumn title="Flatmates" links={["Flatmates in Delhi", "Flatmates in Noida", "Flatmates in Gurgaon", "Flatmates in Bangalore", "Flatmates in Pune"]} />
      <FooterLinkColumn title="PGs" links={["PG in Delhi", "PG in Noida", "PG in Gurgaon", "PG in Bangalore", "PG in Pune"]} />
      <FooterLinkColumn title="Services" links={["Rental Agreement", "Tenant Verification", "Buy Furniture", "Rent Receipt"]} />
    </div>

    <div className="border-t border-gray-600 pt-8 mt-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#74ebd5] transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="#" className="hover:text-[#74ebd5] transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4h-4a2 2 0 00-2 2v12a2 2 0 002 2h4a2 2 0 002-2V6a2 2 0 00-2-2zm0 14h-4V6h4v12zM4 6H0v12a2 2 0 002 2h4a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h4v-2H4V6h4V4H4a2 2 0 00-2 2z"/></svg>
          </a>
          <a href="#" className="hover:text-[#74ebd5] transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
          </a>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
          <span className="text-sm font-semibold">Newsletter:</span>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Your email" 
              className="px-4 py-2 rounded-l-lg text-gray-800 outline-none w-48"
            />
            <button className="bg-[#74ebd5] px-4 py-2 rounded-r-lg text-[#2c3e50] font-bold hover:bg-[#5ac8b3] transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div className="text-center text-gray-400 text-sm mt-8">
      &copy; 2025 StayBaba. All Rights Reserved.
    </div>
  </footer>
</div>
</>
);};
export default Home;