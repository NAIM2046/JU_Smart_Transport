import React, { useState } from "react";

const DriverList = () => {
  // Sample data for drivers
  const drivers = [
    {
      id: 1,
      name: "John Smith",
      age: 35,
      phone: "+123 456 7890",
      address: "123 Main Street, City",
      photo: "https://via.placeholder.com/150?text=Driver+1",
    },
    {
      id: 2,
      name: "Jane Doe",
      age: 28,
      phone: "+987 654 3210",
      address: "456 Maple Avenue, City",
      photo: "https://via.placeholder.com/150?text=Driver+2",
    },
    {
      id: 3,
      name: "Robert Johnson",
      age: 40,
      phone: "+345 678 9012",
      address: "789 Oak Street, City",
      photo: "https://via.placeholder.com/150?text=Driver+3",
    },
  ];

  // State for search input and filtered drivers
  const [searchQuery, setSearchQuery] = useState("");

  // Filter drivers based on search query
  const filteredDrivers = drivers.filter((driver) =>
    driver.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Driver List
        </h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Driver List */}
        <ul className="bg-white shadow-lg rounded-lg divide-y divide-gray-200">
          {filteredDrivers.map((driver) => (
            <li key={driver.id} className="p-4 flex space-x-4 items-center">
              {/* Driver Photo */}
              <img
                src={driver.photo}
                alt={driver.name}
                className="w-16 h-16 rounded-full border border-gray-300"
              />
              {/* Driver Details */}
              <div className="flex space-x-5">
                <h2 className="text-lg font-bold text-gray-800">
                  {driver.name}
                </h2>
                <p className="text-gray-600">Age: {driver.age}</p>
                <p className="text-gray-600">Phone: {driver.phone}</p>
                <p className="text-gray-600">Address: {driver.address}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* No results message */}
        {filteredDrivers.length === 0 && (
          <p className="mt-4 text-gray-600 text-center">No drivers found.</p>
        )}
      </div>
    </div>
  );
};

export default DriverList;
