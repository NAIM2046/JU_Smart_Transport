import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const RuningDriverMap = () => {
  // Example driver's location (latitude and longitude)
  const driverLocation = { lat: 23.8103, lng: 90.4125 }; // Replace with dynamic data if needed

  return (
    <div className="  w-full h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full  bg-white shadow-lg rounded-lg p-4">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Running Bus Map Container
        </h3>
        {/* Leaflet Map */}
        <MapContainer
          center={[driverLocation.lat, driverLocation.lng]}
          zoom={14}
          scrollWheelZoom={false}
          className="w-full h-96 rounded-lg shadow-md"
        >
          {/* Base Layer */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* Marker for Driver's Location */}
          <Marker position={[driverLocation.lat, driverLocation.lng]}>
            <Popup>Driver's Current Location</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default RuningDriverMap;
