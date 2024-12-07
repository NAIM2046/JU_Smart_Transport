import React from "react";
import Navbar from "../../components/Navbar/Navbar";

const BusSchedule = () => {
  const schedules = [
    {
      id: 1,
      routeName: "City Center to Airport",
      time: "08:00 AM - 09:00 AM",
      busType: "AC",
      dayType: "Normal Day",
    },
    {
      id: 2,
      routeName: "Downtown to Uptown",
      time: "10:00 AM - 11:30 AM",
      busType: "Non-AC",
      dayType: "Holiday",
    },
    {
      id: 3,
      routeName: "Northside to Southside",
      time: "06:00 PM - 07:00 PM",
      busType: "Sleeper",
      dayType: "Normal Day",
    },
  ];

  return (
    <div>
      <div className="mb-4">
        <Navbar></Navbar>
      </div>
      <div>
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 min-h-screen p-6">
          <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Bus Schedule
            </h1>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <th className="px-4 py-2 border border-gray-300">
                    Route Name
                  </th>
                  <th className="px-4 py-2 border border-gray-300">Time</th>
                  <th className="px-4 py-2 border border-gray-300">Bus Type</th>
                  <th className="px-4 py-2 border border-gray-300">
                    Normal Day / Holiday
                  </th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((schedule) => (
                  <tr
                    key={schedule.id}
                    className="text-center hover:bg-gray-100 transition duration-300"
                  >
                    <td className="px-4 py-2 border border-gray-300">
                      {schedule.routeName}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {schedule.time}
                    </td>
                    <td
                      className={`px-4 py-2 border border-gray-300 ${
                        schedule.busType === "AC"
                          ? "text-green-600 font-semibold"
                          : schedule.busType === "Non-AC"
                          ? "text-red-600 font-semibold"
                          : "text-blue-600 font-semibold"
                      }`}
                    >
                      {schedule.busType}
                    </td>
                    <td
                      className={`px-4 py-2 border border-gray-300 ${
                        schedule.dayType === "Holiday"
                          ? "text-red-500 font-bold"
                          : "text-gray-800 font-medium"
                      }`}
                    >
                      {schedule.dayType}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusSchedule;
