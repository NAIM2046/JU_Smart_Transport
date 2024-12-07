import React from "react";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
          {/* Profile Photo */}
          <div>
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-500"
            />
          </div>

          {/* Profile Details */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">John Doe</h2>
            <p className="text-gray-600 mt-2">john.doe@example.com</p>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-6 space-y-4">
          <div className="flex justify-center">
            <span className="font-medium text-gray-700">Batch:</span>
            <span className="text-gray-600">2021-2025</span>
          </div>
          <div className="flex justify-center">
            <span className="font-medium text-gray-700">Department:</span>
            <span className="text-gray-600">Computer Science</span>
          </div>
          <div className="flex justify-center">
            <span className="font-medium text-gray-700">Phone Number:</span>
            <span className="text-gray-600">+123 456 7890</span>
          </div>
          <div className="flex justify-center">
            <span className="font-medium text-gray-700">Address: </span>
            <span className="text-gray-600">123, Main Street, City</span>
          </div>
          <div className="flex justify-center">
            <span className="font-medium text-gray-700">Hall Name:</span>
            <span className="text-gray-600">Golden Hall</span>
          </div>
        </div>

        {/* Change Profile Button */}
        <div className="mt-6 text-center">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Change Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
