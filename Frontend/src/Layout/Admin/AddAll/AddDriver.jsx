import React, { useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const AddDriver = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");
  const AxiosSecure = useAxiosSecure();
  const handleSubmit = (e) => {
    e.preventDefault();
    const driverData = { name, age, phone, id, role: "driver" };

    console.log("Submitted Driver Data:", driverData);
    AxiosSecure.post("/adminusers", driverData).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        alert("Driver added successfully!");
      }
    });

    // Reset fields
    // setName("");
    // setAge("");
    // setPhone("");
    // setId("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-6 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add Driver
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-600 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter driver name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Age */}
          <div>
            <label className="block text-gray-600 font-medium">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter driver age"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          {/* Phone */}
          <div>
            <label className="block text-gray-600 font-medium">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          {/* ID */}
          <div>
            <label className="block text-gray-600 font-medium">ID</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Enter driver ID"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Add Driver
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDriver;
