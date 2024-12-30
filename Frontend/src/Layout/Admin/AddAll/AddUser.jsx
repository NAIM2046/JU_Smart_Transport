import React, { useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const AddUser = () => {
  const [activeForm, setActiveForm] = useState("AddUser"); // Default to Add User form
  const AxiosSecure = useAxiosSecure();
  const handleAddUser = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const ID = form.ID.value;
    const role = form.Role.value;
    const userInfo = {
      name,
      ID,
      role,
    };
    AxiosSecure.post("/adminusers", userInfo).then((res) => {
      console.log(res.data);
    });
  };
  const handleAddBus = (event) => {
    event.preventDefault();
    const form = event.target;
    const BusNumber = form.busnumber.value;
    const busSize = form.busSize.value;
    const busInfo = {
      BusNumber,
      BusSize: busSize,
    };
    console.log(busInfo);
  };
  const handleAddRout = (event) => {
    event.preventDefault();
    const form = event.target;
    const RouteName = form.routeName.value;
    const Start = form.start.value;
    const End = form.end.value;
    const RouteInfo = {
      RouteName,
      Start,
      End,
    };
    console.log(RouteInfo);
  };
  // Form Components
  const AddUserForm = () => (
    <form onSubmit={handleAddUser} className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Add User</h3>
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        placeholder="ID"
        name="ID"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <select
        name="Role"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="student">Student</option>
        <option value="driver">Driver</option>
        <option value="teacher">Teacher</option>
      </select>
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded-lg"
      >
        Submit
      </button>
    </form>
  );

  const AddBusForm = () => (
    <form onSubmit={handleAddBus} className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Add Bus</h3>
      <input
        type="text"
        name="busnumber"
        placeholder="Bus Number"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="busSize"
        placeholder="Bus Size"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button className="px-4 py-2 text-white bg-blue-500 rounded-lg">
        Submit
      </button>
    </form>
  );

  const AddRouteForm = () => (
    <form onSubmit={handleAddRout} className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Add Route</h3>
      <input
        type="text"
        name="routeName"
        placeholder="Route Name"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="start"
        placeholder="Start Point"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="text"
        name="end"
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
