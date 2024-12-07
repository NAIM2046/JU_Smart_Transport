import React, { useState } from "react";

const AddUser = () => {
  const [activeForm, setActiveForm] = useState("AddUser"); // Default to Add User form

  // Form Components
  const AddUserForm = () => (
    <form className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Add User</h3>
      <input
        type="text"
        placeholder="Name"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
        <option value="Student">Student</option>
        <option value="Driver">Driver</option>
      </select>
      <button className="px-4 py-2 text-white bg-blue-500 rounded-lg">
        Submit
      </button>
    </form>
  );

  const AddBusForm = () => (
    <form className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Add Bus</h3>
      <input
        type="text"
        placeholder="Bus Number"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Bus Name"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button className="px-4 py-2 text-white bg-blue-500 rounded-lg">
        Submit
      </button>
    </form>
  );

  const AddRouteForm = () => (
    <form className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Add Route</h3>
      <input
        type="text"
        placeholder="Route Name"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Start Point"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="text"
        placeholder="End Point"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button className="px-4 py-2 text-white bg-blue-500 rounded-lg">
        Submit
      </button>
    </form>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-6 flex justify-center space-x-4">
        {/* Buttons to Switch Forms */}
        <button
          onClick={() => setActiveForm("AddUser")}
          className={`px-6 py-2 font-semibold rounded-lg ${
            activeForm === "AddUser"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Add User
        </button>
        <button
          onClick={() => setActiveForm("AddBus")}
          className={`px-6 py-2 font-semibold rounded-lg ${
            activeForm === "AddBus"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Add Bus
        </button>
        <button
          onClick={() => setActiveForm("AddRoute")}
          className={`px-6 py-2 font-semibold rounded-lg ${
            activeForm === "AddRoute"
              ? "bg-purple-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Add Route
        </button>
      </div>
      {/* Render Active Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {activeForm === "AddUser" && <AddUserForm />}
        {activeForm === "AddBus" && <AddBusForm />}
        {activeForm === "AddRoute" && <AddRouteForm />}
      </div>
    </div>
  );
};

export default AddUser;
