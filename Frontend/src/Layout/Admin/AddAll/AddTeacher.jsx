import React, { useState } from "react";

const AddTeacher = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [dept, setDept] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const teacherData = { name, id, dept };
    console.log("Submitted Teacher Data:", teacherData);
    alert("Teacher added successfully!");
    // Reset fields
    setName("");
    setId("");
    setDept("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 p-6 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add Teacher
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-600 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter teacher name"
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
              placeholder="Enter teacher ID"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          {/* Dept */}
          <div>
            <label className="block text-gray-600 font-medium">
              Department
            </label>
            <input
              type="text"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              placeholder="Enter department name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-600 transition"
          >
            Add Teacher
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTeacher;
