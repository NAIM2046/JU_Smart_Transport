import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const ScheduleManage = () => {
  const AxiosSecure = useAxiosSecure();
  const [routeOptions, setRouteOptions] = useState([]);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    AxiosSecure.get("/routes").then((res) => {
      //console.log(res.data);
      setRouteOptions(res.data);
    });
  }, []);

  useEffect(() => {
    AxiosSecure.get("/shedules").then((res) => {
      console.log(res.data);
      if (res.data) {
        setSchedules(res.data);
      }
    });
  }, []);

  // Individual state variables for form fields
  const [id, setId] = useState(null);
  const [routeName, setRouteName] = useState("");
  const [time, setTime] = useState("");
  const [busType, setBusType] = useState("student");
  const [dayType, setDayType] = useState("Normal Day");

  const [isEditing, setIsEditing] = useState(false);

  // Add or update schedule
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const routeDetails = {
        _id: id,
        routeName,
        time,
        busType,
        dayType,
      };
      console.log(routeDetails);
      AxiosSecure.patch("/shedules", routeDetails).then((res) => {
        console.log(res.data);
      });
      setSchedules(
        schedules.map((schedule) =>
          schedule._id === id
            ? { id, routeName, time, busType, dayType }
            : schedule
        )
      );
      setIsEditing(false);
    } else {
      const routeDetails = {
        routeName,
        time,
        busType,
        dayType,
      };
      console.log(routeDetails);
      AxiosSecure.post("/shedules", routeDetails).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          alert("shedules add successfully");
          setSchedules([
            ...schedules,
            { _id: res.data.insertedId, routeName, time, busType, dayType },
          ]);
        }
      });

      console.log(schedules);
    }
    // Reset form fields
    resetForm();
  };

  const resetForm = () => {
    setId(null);
    setRouteName("");
    setTime("");
    setBusType("student");
    setDayType("Normal Day");
  };

  // Edit schedule
  const handleEdit = (id) => {
    const scheduleToEdit = schedules.find((schedule) => schedule._id === id);
    setId(scheduleToEdit._id);
    setRouteName(scheduleToEdit.routeName);
    setTime(scheduleToEdit.time);
    setBusType(scheduleToEdit.busType);
    setDayType(scheduleToEdit.dayType);
    setIsEditing(true);
  };

  // Delete schedule
  const handleDelete = (id) => {
    AxiosSecure.delete(`/shedules/${id}`).then((res) => {
      console.log(res.data);
      setSchedules(schedules.filter((schedule) => schedule._id !== id));
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Bus Schedule Management
        </h1>

        {/* Form for Add / Edit */}
        <form
          onSubmit={handleSubmit}
          className="bg-blue-100 p-4 rounded-lg shadow-md mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              className="p-2 border rounded w-full"
              required
            >
              <option value="" disabled>
                Select Route Name
              </option>
              {routeOptions.map((Route, index) => (
                <option key={index} value={Route.routeName}>
                  {Route.routeName}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Time (e.g., 08:00 AM - 09:00 AM)"
              className="p-2 border rounded w-full"
              required
            />
            <select
              value={busType}
              onChange={(e) => setBusType(e.target.value)}
              className="p-2 border rounded w-full"
            >
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Stap">Stap</option>
            </select>
            <select
              value={dayType}
              onChange={(e) => setDayType(e.target.value)}
              className="p-2 border rounded w-full"
            >
              <option value="Normal Day">Normal Day</option>
              <option value="Holiday">Holiday</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
          >
            {isEditing ? "Update Schedule" : "Add Schedule"}
          </button>
        </form>

        {/* Table of Schedules */}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-4 py-2 border border-gray-300">Route Name</th>
              <th className="px-4 py-2 border border-gray-300">Time</th>
              <th className="px-4 py-2 border border-gray-300">Bus Type</th>
              <th className="px-4 py-2 border border-gray-300">Day Type</th>
              <th className="px-4 py-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => (
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
                  {schedule.busType}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {schedule.dayType}
                </td>
                <td className="px-4 py-2 border border-gray-300 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(schedule._id)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(schedule._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleManage;
