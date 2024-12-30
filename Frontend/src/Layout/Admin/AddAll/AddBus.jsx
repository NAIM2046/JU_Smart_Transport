import React, { useState } from "react";

const AddBus = () => {
  const [busNumber, setBusNumber] = useState("");
  const [busName, setBusName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [route, setRoute] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const busData = { busNumber, busName, capacity, route };
    console.log("Submitted Bus Data:", busData);
    alert("Bus added successfully!");
    // Reset fields
    setBusNumber("");
    setBusName("");
    setCapacity("");
    setRoute("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 to-indigo-500 p-6 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add Bus
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Bus Number */}
          <div>
            <label className="block text-gray-600 font-medium">
              Bus Number
            </label>
            <input
              type="text"
              value={busNumber}
              onChange={(e) => setBusNumber(e.target.value)}
              placeholder="Enter bus number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Bus Name */}
          <div>
            <label className="block text-gray-600 font-medium">Bus Name</label>
            <input
              type="text"
              value={busName}
              onChange={(e) => setBusName(e.target.value)}
              placeholder="Enter bus name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          {/* Capacity */}
          <div>
            <label className="block text-gray-600 font-medium">Capacity</label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="Enter bus capacity"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          {/* Route */}
          <div>
            <label className="block text-gray-600 font-medium">Route</label>
            <input
              type="text"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              placeholder="Enter bus route"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-600 transition"
          >
            Add Bus
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBus;
