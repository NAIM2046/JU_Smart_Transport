import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const BusSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [filter, setFilter] = useState("Student");
  const AxiosSecure = useAxiosSecure();

  useEffect(() => {
    AxiosSecure.get("/shedules")
      .then((res) => setSchedules(res.data))
      .catch((err) => console.error("Failed to fetch schedules", err));
  }, []);

  const filteredSchedules = schedules.filter(
    (schedule) => schedule.busType === filter
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <Navbar />
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 my-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Bus Schedule
        </h1>
        {/* Filter Buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          {["Student", "Teacher", "Stap"].map((type) => (
            <button
              key={type}
              className={`px-4 py-2 rounded-lg font-medium ${
                filter === type
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setFilter(type)}
              aria-label={`Filter by ${type}`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Schedules Table */}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <th className="px-4 py-2 border border-gray-300">Route Name</th>
              <th className="px-4 py-2 border border-gray-300">Time</th>
              <th className="px-4 py-2 border border-gray-300">
                Num. of Buses
              </th>
              <th className="px-4 py-2 border border-gray-300">Day Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredSchedules.length > 0 ? (
              filteredSchedules.map((schedule) => (
                <tr
                  key={schedule._id}
                  className="text-center hover:bg-gray-100 transition duration-300"
                >
                  <td className="px-4 py-2 border border-gray-300">
                    {schedule.routeName}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {schedule.time}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {schedule.Numberofbus}
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
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center text-gray-500 py-4 font-medium"
                >
                  No schedules available for {filter}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusSchedule;
