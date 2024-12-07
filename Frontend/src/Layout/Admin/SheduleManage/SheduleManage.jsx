import React, { useState } from "react";

const ScheduleManage = () => {
  const [schedules, setSchedules] = useState([
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
  ]);

  const [formData, setFormData] = useState({
    id: null,
    routeName: "",
    time: "",
    busType: "AC",
    dayType: "Normal Day",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or update schedule
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setSchedules(
        schedules.map((schedule) =>
          schedule.id === formData.id ? formData : schedule
        )
      );
      setIsEditing(false);
    } else {
      setSchedules([...schedules, { ...formData, id: Date.now() }]);
    }
    setFormData({
      id: null,
      routeName: "",
      time: "",
      busType: "AC",
      dayType: "Normal Day",
    });
  };

  // Edit schedule
  const handleEdit = (id) => {
    const scheduleToEdit = schedules.find((schedule) => schedule.id === id);
    setFormData(scheduleToEdit);
    setIsEditing(true);
  };

  // Delete schedule
  const handleDelete = (id) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
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
            <input
              type="text"
              name="routeName"
              value={formData.routeName}
              onChange={handleChange}
              placeholder="Route Name"
              className="p-2 border rounded w-full"
              required
            />
            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="Time (e.g., 08:00 AM - 09:00 AM)"
              className="p-2 border rounded w-full"
              required
            />
            <select
              name="busType"
              value={formData.busType}
              onChange={handleChange}
              className="p-2 border rounded w-full"
            >
              <option value="AC">AC</option>
              <option value="Non-AC">Non-AC</option>
              <option value="Sleeper">Sleeper</option>
            </select>
            <select
              name="dayType"
              value={formData.dayType}
              onChange={handleChange}
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
                key={schedule.id}
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
                    onClick={() => handleEdit(schedule.id)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(schedule.id)}
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
