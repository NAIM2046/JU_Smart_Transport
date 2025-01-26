import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const TodayActiveBus = () => {
  const [busNumber, setBusNumber] = useState("");
  const [driverName, setDriverName] = useState("");
  const [routeName, setRouteName] = useState("");
  const [time, setTime] = useState("");
  const [busType, setBusType] = useState("");
  const [numberOfBuses, setNumberOfBuses] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [Driverlist, setDriverlist] = useState([]);
  const [Routelist, setRoutelist] = useState([]);

  const AxiosSecure = useAxiosSecure();

  // Fetch schedules, routes, and drivers
  const fetchData = () => {
    AxiosSecure.get("/activebus").then((res) => setSchedule(res.data));
  };

  useEffect(() => {
    AxiosSecure.get("/routes")
      .then((res) => setRoutelist(res.data))
      .catch((error) => console.error("Error fetching routes:", error));

    AxiosSecure.get("/driver")
      .then((res) => {
        console.log(res.data);
        setDriverlist(res.data);
      })
      .catch((error) => console.error("Error fetching drivers:", error));

    fetchData();
  }, []);

  // Reset form fields
  //   const resetForm = () => {
  //     setBusNumber("");
  //     setDriverName("");
  //     setRouteName("");
  //     setTime("");
  //     setBusType("");
  //     setNumberOfBuses("");
  //   };

  // Add schedule handler
  const handleAddSchedule = (e) => {
    e.preventDefault();
    if (
      busNumber &&
      driverName &&
      routeName &&
      time &&
      busType &&
      numberOfBuses
    ) {
      const activeSchedule = {
        busNumber,
        driverName,
        routeName,
        time,
        busType,
        numberOfBuses,
      };

      AxiosSecure.post("/activebus", activeSchedule)
        .then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            alert("Successfully added schedule.");
            fetchData();
          }
        })
        .catch((error) => console.error("Error adding schedule:", error));
    } else {
      alert("Please fill in all fields!");
    }
  };

  // Delete schedule handler
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this schedule?")) {
      AxiosSecure.delete(`/activebus/${id}`)
        .then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            alert("Successfully deleted schedule.");
            fetchData();
          }
        })
        .catch((error) => console.error("Error deleting schedule:", error));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Schedule</h1>

        {/* Form Section */}
        <form
          onSubmit={handleAddSchedule}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Bus Number
            </label>
            <input
              type="text"
              value={busNumber}
              onChange={(e) => setBusNumber(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Bus Number"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Driver Name
            </label>
            <select
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select Driver Name
              </option>
              {Driverlist.map((driver) => (
                <option key={driver._id} value={driver.email}>
                  {driver.username}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Route Name
            </label>
            <select
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select Route Name
              </option>
              {Routelist.map((route) => (
                <option key={route._id} value={route.routeName}>
                  {route.routeName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Bus Type
            </label>
            <select
              value={busType}
              onChange={(e) => setBusType(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select Bus Type
              </option>
              <option value="Student">Student</option>
              <option value="Staff">Staff</option>
              <option value="Teacher">Teacher</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Number of Buses
            </label>
            <input
              type="number"
              value={numberOfBuses}
              onChange={(e) => setNumberOfBuses(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Number of Buses"
            />
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Add Schedule
            </button>
          </div>
        </form>

        {/* Schedule List */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Active Schedule List
          </h2>
          {schedule.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 border-b">Bus Number</th>
                    <th className="px-4 py-2 border-b">Driver Name</th>
                    <th className="px-4 py-2 border-b">Route Name</th>
                    <th className="px-4 py-2 border-b">Time</th>
                    <th className="px-4 py-2 border-b">Bus Type</th>
                    <th className="px-4 py-2 border-b">Number of Buses</th>
                    <th className="px-4 py-2 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b">{item.busNumber}</td>
                      <td className="px-4 py-2 border-b">{item.driverName}</td>
                      <td className="px-4 py-2 border-b">{item.routeName}</td>
                      <td className="px-4 py-2 border-b">{item.time}</td>
                      <td className="px-4 py-2 border-b">{item.busType}</td>
                      <td className="px-4 py-2 border-b">
                        {item.numberOfBuses}
                      </td>
                      <td className="px-4 py-2 border-b">
                        <button className="text-blue-500 hover:underline mr-2">
                          Edit
                        </button>
                        <button
                          className="text-red-500"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No active schedules available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodayActiveBus;
