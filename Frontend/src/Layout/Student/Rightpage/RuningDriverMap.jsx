import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

// Helper component to update map center
const UpdateMapCenter = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [position, map]);
  return null;
};

const RuningDriverMap = () => {
  const [driverLocation, setDriverLocation] = useState({
    lat: 23.8103, // Default latitude
    lng: 90.4125, // Default longitude
  });

  const location = useLocation();
  const { driverEmail } = location.state || {};

  if (!driverEmail) {
    return <div>No driver selected. Please go back and select a driver.</div>;
  }

  useEffect(() => {
    console.log("Joining room for:", driverEmail);
    socket.emit("join-driver-room", driverEmail);

    socket.on("location-update", (data) => {
      console.log("Received location update:", data);
      if (data && data.latitude && data.longitude) {
        setDriverLocation({ lat: data.latitude, lng: data.longitude });
      }
    });

    return () => {
      console.log("Leaving driver room");
      socket.off("location-update");
    };
  }, [driverEmail]);

  return (
    <div className="w-full h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full bg-white shadow-lg rounded-lg p-4">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Running Bus Map Container
        </h3>
        <MapContainer
          center={[driverLocation.lat, driverLocation.lng]}
          zoom={14}
          scrollWheelZoom={false}
          className="w-full h-96 rounded-lg shadow-md"
        >
          {/* Update the center of the map dynamically */}
          <UpdateMapCenter
            position={[driverLocation.lat, driverLocation.lng]}
          />

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[driverLocation.lat, driverLocation.lng]}>
            <Popup>Driver's Current Location</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default RuningDriverMap;
