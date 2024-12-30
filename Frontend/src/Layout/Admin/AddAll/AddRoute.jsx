import React, { useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const AddRoute = () => {
  const [routeName, setRouteName] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [distance, setDistance] = useState("");
  const AxiosSecure = useAxiosSecure();

  const handleSubmit = (e) => {
    e.preventDefault();
    const routeData = { routeName, startPoint, endPoint, distance };
    console.log("Submitted Route Data:", routeData);
    AxiosSecure.post("/route", routeData).then((res) => {
      console.log(res.data);
      alert("Route added successfully!");
    });

    // Reset fields
    // setRouteName("");
    // setStartPoint("");
    // setEndPoint("");
    // setDistance("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-teal-500 p-6 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add Route
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Route Name */}
          <div>
            <label className="block text-gray-600 font-medium">
              Route Name
            </label>
            <input
              type="text"
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              placeholder="Enter route name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Start Point */}
          <div>
            <label className="block text-gray-600 font-medium">
              Start Point
            </label>
            <input
              type="text"
              value={startPoint}
              onChange={(e) => setStartPoint(e.target.value)}
              placeholder="Enter starting point"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          {/* End Point */}
          <div>
            <label className="block text-gray-600 font-medium">End Point</label>
            <input
              type="text"
              value={endPoint}
              onChange={(e) => setEndPoint(e.target.value)}
              placeholder="Enter ending point"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          {/* Distance */}
          <div>
            <label className="block text-gray-600 font-medium">
              Distance (km)
            </label>
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="Enter distance in kilometers"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-600 transition"
          >
            Add Route
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRoute;
