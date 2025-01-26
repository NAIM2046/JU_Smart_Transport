import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import {
  MapContainer as LeafletMap,
  TileLayer,
  Marker,
  Circle,
} from "react-leaflet";
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

const MapContainer = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const watchIdRef = useRef(null);
  const { user, loading } = useAuth();
  const AxiosSecure = useAxiosSecure();

  useEffect(() => {
    if (loading || !user?.email) return;

    const socket = io("http://localhost:5000");

    socket.emit("join-driver-room", user.email);

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, speed, accuracy } = pos.coords;

        setPosition({
          latitude,
          longitude,
          speed,
          accuracy,
        });
        socket.emit("location-update", {
          driverEmail: user.email,
          latitude,
          longitude,
          speed,
          accuracy,
        });
      },
      (err) => {
        console.error("Geolocation error:", err);
        setError(err.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 5000 }
    );

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      socket.disconnect();
    };
  }, [user, loading]);

  const handleStop = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    if (user?.email) {
      AxiosSecure.patch("/driverstop", { status: "stop", email: user.email })
        .then((res) => {
          console.log(res.data);
          navigate("/driver");
        })
        .catch((err) => console.error("Error stopping driver:", err));
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
        <h1 className="text-lg font-bold">Geolocation Tracker</h1>
        {error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : position ? (
          <div>
            <p>Current Position:</p>
            <p>Latitude: {position.latitude.toFixed(6)}</p>
            <p>Longitude: {position.longitude.toFixed(6)}</p>
            <p>Accuracy: {position.accuracy?.toFixed(2)} meters</p>
            <p>
              Speed:{" "}
              {position.speed
                ? `${(position.speed * 3.6).toFixed(2)} km/h`
                : "Unavailable"}
            </p>
          </div>
        ) : (
          <p>Fetching location...</p>
        )}
      </div>
      <div className="mt-4">
        {position ? (
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
            {/* {position.accuracy && (
              <Circle
                center={[position.latitude, position.longitude]}
                radius={position.accuracy} // Show accuracy radius
                color="blue"
                fillOpacity={0.2}
              />
            )} */}
          </LeafletMap>
        ) : (
          <p>Loading map...</p>
        )}
      </div>
    </div>
  );
};

export default MapContainer;
