import React, { useEffect, useState, useRef } from "react";
import { MapContainer as LeafletMap, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

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
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);
  const watchIdRef = useRef(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    // Start watching the user's location
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ latitude, longitude });
        setError(null);
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

    // Cleanup: Stop watching when the component is unmounted
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    console.log(position);
  }, [position]);

  const handleStop = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    navigate("/driver");
  };

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
