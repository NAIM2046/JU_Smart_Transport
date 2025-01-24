import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import Navbar from "../../components/Navbar/Navbar";

const ProfilePage = () => {
  const AxiosSecure = useAxiosSecure();
  const [userProfile, setUserProfile] = useState(null);
  const { user } = useAuth();

  // Fetch user profile data
  const fetchData = async () => {
    try {
      const res = await AxiosSecure.get(`/reg_user/${user.email}`);
      setUserProfile(res.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Loading state
  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="text-gray-600 text-lg">Loading profile...</div>
      </div>
    );
  }

  // Custom details for each role
  const renderRoleSpecificDetails = () => {
    switch (userProfile.role) {
      case "student":
        return (
          <div className="mt-4 text-gray-700">
            <p>Student ID: {userProfile.id || "N/A"}</p>
            <p>Department: {userProfile.dept || "N/A"}</p>
            <p>Batch: {userProfile.batch || "N/A"}</p>
          </div>
        );
      case "driver":
        return (
          <div className="mt-4 text-gray-700">
            <p>Driver ID: {userProfile.id || "N/A"}</p>
            <p>License Number: {userProfile.license || "N/A"}</p>
            <p>Assigned Route: {userProfile.route || "N/A"}</p>
          </div>
        );
      case "admin":
        return (
          <div className="mt-4 text-gray-700">
            <p>Admin ID: {userProfile.id || "N/A"}</p>
            <p>Privileges: {userProfile.privileges || "Full Access"}</p>
          </div>
        );
      default:
        return (
          <p className="text-gray-700">No additional details available.</p>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />
      <div className="flex justify-center items-center py-10 px-4">
        <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            {/* Profile Picture */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-500 bg-gray-200 flex justify-center items-center">
              <span className="text-gray-500 text-4xl font-bold">
                {userProfile.username?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            {/* Profile Details */}
            <div className="md:ml-6 mt-6 md:mt-0 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800">
                {userProfile.username || "No Username"}
              </h1>
              <p className="text-gray-600 mt-1">{userProfile.email || "N/A"}</p>
              <p className="text-blue-600 font-semibold capitalize mt-2">
                Role: {userProfile.role || "N/A"}
              </p>
              {/* Role-Specific Details */}
              {renderRoleSpecificDetails()}
            </div>
          </div>
          {/* Footer Actions */}
          <div className="mt-6 flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
