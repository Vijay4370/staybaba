import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const SearchResults = ({ user }) => {
  const { type } = useParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Map URL params to display names
  const optionLabels = {
    'room': 'Room',
    'roommate': 'Roommate',
    'apartment': 'Apartment',
    'flat': 'Flat',
    'flatmate': 'Flatmate',
    'sublet': 'Sublet',
    'house': 'House',
    'entire-place': 'Entire Place',
    'tenant': 'Tenant',
    'studio': 'Studio'
  };

  useEffect(() => {
    // Simulated listings data - in real app, fetch from API based on type
    const mockListings = [
      {
        id: 1,
        title: `Single ${type === 'roommate' ? 'Room for Sharing' : 'Room'}`,
        price: "₹5000/month",
        location: "Near XYZ College",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600",
        type: 'room'
      },
      {
        id: 2,
        title: `PG for ${type === 'roommate' ? 'Roommates' : 'Girls'}`,
        price: "₹4500/month",
        location: "2km from College",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=600",
        type: 'pg'
      },
      {
        id: 3,
        title: "Shared Flat",
        price: "₹6000/month",
        location: "Near ABC Institute",
        image: "https://images.unsplash.com/photo-1502005229766-52835d25e272?auto=format&fit=crop&q=80&w=600",
        type: 'flat'
      },
      {
        id: 4,
        title: "Studio Apartment",
        price: "₹8000/month",
        location: "City Center",
        image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&q=80&w=600",
        type: 'studio'
      },
      {
        id: 5,
        title: "2BHK Flat",
        price: "₹12000/month",
        location: "Residential Area",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=600",
        type: 'apartment'
      },
      {
        id: 6,
        title: "Independent House",
        price: "₹15000/month",
        location: "Suburban Area",
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=600",
        type: 'house'
      }
    ];

    // Filter based on type
    const filteredListings = mockListings.filter(listing => {
      if (type === 'room' || type === 'apartment' || type === 'flat' || type === 'house' || type === 'studio') {
        return true;
      }
      return true;
    });

    setTimeout(() => {
      setListings(filteredListings);
      setLoading(false);
    }, 500);
  }, [type]);

  const displayType = optionLabels[type] || type;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-5 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {displayType} Listings
          </h1>
          <p className="text-gray-600">
            Find the best {displayType.toLowerCase()} options near you
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
          <div className="flex flex-wrap gap-4">
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>All Locations</option>
              <option>Near College</option>
              <option>City Center</option>
              <option>Suburban</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>Any Price</option>
              <option>Under ₹5000</option>
              <option>₹5000 - ₹10000</option>
              <option>₹10000 - ₹20000</option>
              <option>Above ₹20000</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>Any Type</option>
              <option>PG</option>
              <option>Flat</option>
              <option>Room</option>
              <option>Apartment</option>
            </select>
            <button className="px-6 py-2 bg-[#2c3e50] text-white rounded-lg hover:bg-[#34495e] transition-colors">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#74ebd5]"></div>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-4">{listings.length} results found</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <div key={listing.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                  <img 
                    src={listing.image} 
                    alt={listing.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-800">{listing.title}</h3>
                      <span className="px-2 py-1 bg-[#74ebd5]/20 text-[#2c3e50] text-xs font-semibold rounded-full">
                        Verified
                      </span>
                    </div>
                    <p className="text-[#2c3e50] font-semibold text-lg mb-1">{listing.price}</p>
                    <p className="text-gray-500 text-sm mb-3">📍 {listing.location}</p>
                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-[#74ebd5] text-[#2c3e50] rounded-lg font-semibold hover:bg-[#5ac8b3] transition-colors">
                        View Details
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        ❤️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Empty State */}
        {!loading && listings.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No listings found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
            <Link to="/" className="px-6 py-2 bg-[#2c3e50] text-white rounded-lg hover:bg-[#34495e] transition-colors">
              Go Back Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
