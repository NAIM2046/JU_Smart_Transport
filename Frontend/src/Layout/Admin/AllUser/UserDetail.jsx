import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock user details
  const user = {
    id,
    name: "John Doe",
    email: "john@example.com",
    role: "Student",
    phone: "123-456-7890",
    address: "123 Main St, Cityville",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">
          User Details
        </h1>
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="w-24 font-semibold text-gray-600">Name:</span>
            <span className="text-gray-800">{user.name}</span>
          </div>
          <div className="flex items-center">
            <span className="w-24 font-semibold text-gray-600">Email:</span>
            <span className="text-gray-800">{user.email}</span>
          </div>
          <div className="flex items-center">
            <span className="w-24 font-semibold text-gray-600">Role:</span>
            <span className="text-gray-800">{user.role}</span>
          </div>
          <div className="flex items-center">
            <span className="w-24 font-semibold text-gray-600">Phone:</span>
            <span className="text-gray-800">{user.phone}</span>
          </div>
          <div className="flex items-center">
            <span className="w-24 font-semibold text-gray-600">Address:</span>
            <span className="text-gray-800">{user.address}</span>
          </div>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Back to All Users
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
