// RoomDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';


const RoomDetails = () => {
  // URL se ID nikalenge
  const { id } = useParams(); 

  return (
    <div>
      <Web user={null} />
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold">Room Details Page</h1>
        <p className="mt-4">Displaying details for Room ID: {id}</p>
        {/* Yahan aap API se data fetch karke details dikha sakte hain */}
      </div>
    </div>
  );
};

export default RoomDetails;