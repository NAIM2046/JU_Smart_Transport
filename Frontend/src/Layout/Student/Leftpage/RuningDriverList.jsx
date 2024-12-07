import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RunningDriverList = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const buses = [
    { id: 1, driverName: "John Doe", routeName: "Route A", busType: "Student" },
    {
      id: 2,
      driverName: "Sarah Lee",
      routeName: "Route B",
      busType: "Teacher",
    },
    { id: 3, driverName: "David Kim", routeName: "Route C", busType: "Staff" },
    {
      id: 4,
      driverName: "Emma Brown",
      routeName: "Route A",
      busType: "Student",
    },
  ];
  const navigate = useNavigate();
  // Filter buses based on search query
  const filteredBuses = buses.filter((bus) =>
    bus.routeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className=" w-auto min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Running Bus List
        </h2>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by route name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Bus List */}
        <div className="grid gap-4">
          {filteredBuses.length > 0 ? (
            filteredBuses.map((bus) => (
              <div
                key={bus.id}
                className="flex items-center justify-between bg-gradient-to-r from-blue-300 to-purple-300 rounded-lg p-4 shadow-md"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    Driver:{" "}
                    <span className="text-blue-900">{bus.driverName}</span>
                  </p>
                  <p className="text-sm text-gray-700">
                    Route: <span className="font-medium">{bus.routeName}</span>
                  </p>
                  <p className="text-sm text-gray-700">
                    Type:{" "}
                    <span
                      className={`font-medium ${
                        bus.busType === "Student"
                          ? "text-green-600"
                          : bus.busType === "Teacher"
                          ? "text-orange-600"
                          : "text-purple-600"
                      }`}
                    >
                      {bus.busType}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => {
                    navigate("/student/map");
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all"
                >
                  View Map
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">
              No buses found for the route "
              <span className="font-bold">{searchQuery}</span>"
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RunningDriverList;
