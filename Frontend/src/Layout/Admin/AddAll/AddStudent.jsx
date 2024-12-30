import React, { useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [deptName, setDeptName] = useState("");
  const [batch, setBatch] = useState("");
  const [hallName, setHallName] = useState("");
  const AxiosSecure = useAxiosSecure();
  const handleSubmit = (e) => {
    e.preventDefault();
    const studentData = {
      name,
      id,
      deptName,
      batch,
      hallName,
      role: "student",
    };

    AxiosSecure.post("/adminusers", studentData).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        alert("Student added successfully!");
      }
    });
    // console.log("Submitted Student Data:", studentData);

    // Reset fields
    // setName("");
    // setId("");

    // setHallName("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-6 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add Student
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-600 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter student name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              placeholder="Enter student ID"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          {/* Dept Name */}
          <div>
            <label className="block text-gray-600 font-medium">Dept Name</label>
            <input
              type="text"
              value={deptName}
              onChange={(e) => setDeptName(e.target.value)}
              placeholder="Enter department name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          {/* Batch */}
          <div>
            <label className="block text-gray-600 font-medium">Batch</label>
            <input
              type="text"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              placeholder="Enter batch"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          {/* Hall Name */}
          <div>
            <label className="block text-gray-600 font-medium">Hall Name</label>
            <input
              type="text"
              value={hallName}
              onChange={(e) => setHallName(e.target.value)}
              placeholder="Enter hall name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
