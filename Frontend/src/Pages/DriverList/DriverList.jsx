import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Navbar from "../../components/Navbar/Navbar";

const DriverList = () => {
  const AxiosSecure = useAxiosSecure();
  const [drivers, setDriver] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    AxiosSecure.get("/driver")
      .then((res) => {
        console.log(res.data);
        setDriver(res.data);
      })
      .catch((error) => {
        console.error("Error fetching drivers:", error);
      });
  }, []);

  // Filter drivers based on search query
  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.username &&
      driver.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 mb-8 text-center">
          Driver List
        </h1>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
          />
        </div>

        {/* Driver List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrivers.map((driver) => (
            <div
              key={driver._id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center space-y-4 hover:scale-105 transform transition duration-300"
            >
              {/* Driver Photo */}
              <img
                src={driver.photo}
                alt={driver.username}
                className="w-24 h-24 rounded-full border-4 border-purple-500 object-cover shadow-md"
              />
              {/* Driver Details */}
              <div className="text-center">
                <h2 className="text-lg font-bold text-gray-800">
                  {driver.username}
                </h2>
                <p className="text-gray-600">
                  <span className="font-semibold text-purple-500">Age:</span>{" "}
                  {driver.age}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold text-purple-500">Phone:</span>{" "}
                  {driver.phone}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold text-purple-500">
                    Address:
                  </span>{" "}
                  {driver.address}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold text-purple-500">Email:</span>{" "}
                  {driver.email}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredDrivers.length === 0 && (
          <p className="mt-8 text-gray-600 text-center">
            No drivers found. Try searching with a different name.
          </p>
        )}
      </div>
    </div>
  );
};

export default DriverList;
