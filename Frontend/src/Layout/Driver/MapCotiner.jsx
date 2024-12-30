import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { MapContainer as LeafletMap, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";

// Default marker icon fix for Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const socket = io("http://localhost:5000");

const MapContainer = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);
  const watchIdRef = useRef(null);
  const { user, loading } = useAuth(); // user and loading state
  const AxiosSecure = useAxiosSecure();

  useEffect(() => {
    // Wait until user is fully loaded
    if (loading || !user?.email) return;

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    socket.emit("join-driver-room", user.email);

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ latitude, longitude });
        setError(null);

        socket.emit("location-update", {
          driverEmail: user.email,
          latitude,
          longitude,
        });
      },
      (err) => {
        setError(err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    // Cleanup: Stop watching when the component unmounts
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [user, loading]); // Re-run only when user or loading changes

  const handleStop = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    if (user?.email) {
      const stopValue = {
        status: "stop",
        email: user.email,
      };

      AxiosSecure.patch("/driverstop", stopValue).then((res) => {
        console.log(res.data);
        navigate("/driver");
      });
    }
  };

  if (loading) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <div className="flex justify-center">
        <button onClick={handleStop} className="btn">
          Stop
        </button>
      </div>
      <div className="p-4">
        <h1 className="text-lg font-bold">Geolocation Watcher</h1>
        {error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : position.latitude && position.longitude ? (
          <p>
            Current Position:
            <br />
            Latitude: {position.latitude.toFixed(6)}
            <br />
            Longitude: {position.longitude.toFixed(6)}
          </p>
        ) : (
          <p>Fetching location...</p>
        )}
      </div>
      <div className="mt-4">
        {/* Leaflet Map */}
        {position.latitude && position.longitude ? (
          <LeafletMap
            center={[position.latitude, position.longitude]}
            zoom={15}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[position.latitude, position.longitude]} />
          </LeafletMap>
        ) : (
          <p>Loading map...</p>
        )}
      </div>
    </div>
  );
};

export default MapContainer;
