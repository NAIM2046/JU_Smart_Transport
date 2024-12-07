import React from "react";

const BusList = () => {
  // Sample data for buses
  const buses = [
    {
      id: 1,
      number: "Bus 101",
      type: "Double Decker",
      totalSeats: 50,
      image: "https://via.placeholder.com/200x150?text=Bus+101",
    },
    {
      id: 2,
      number: "Bus 202",
      type: "Single Decker",
      totalSeats: 40,
      image: "https://via.placeholder.com/200x150?text=Bus+202",
    },
    {
      id: 3,
      number: "Bus 303",
      type: "Single Decker",
      totalSeats: 45,
      image: "https://via.placeholder.com/200x150?text=Bus+303",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Bus List
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buses.map((bus) => (
            <div
              key={bus.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              {/* Bus Image */}
              <img
                src={bus.image}
                alt={bus.number}
                className="w-full h-40 object-cover"
              />
              {/* Bus Details */}
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {bus.number}
                </h2>
                <p className="text-gray-600">Type: {bus.type}</p>
                <p className="text-gray-600">Total Seats: {bus.totalSeats}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusList;
