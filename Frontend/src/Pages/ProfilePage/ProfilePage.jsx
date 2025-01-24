import React from "react";
import userRole from "../../Hook/userRole";

const ProfilePage = () => {
  const [Role, isRole] = userRole(); // Fetch user role
  console.log(Role);

  // Define profile details for each role
  const profileDetails = {
    student: {
      name: "John Doe",
      email: "john.doe@student.edu",
      batch: "2021-2025",
      department: "Computer Science",
      phone: "+123 456 7890",
      address: "123, Main Street, City",
      hall: "Golden Hall",
    },
    admin: {
      name: "Admin User",
      email: "admin@system.com",
      phone: "+987 654 3210",
      address: "Admin Office, HQ",
    },
    teacher: {
      name: "Prof. Smith",
      email: "smith@university.edu",
      department: "Computer Science",
      phone: "+112 233 4455",
      address: "45, Teacher's Residence, City",
    },
    driver: {
      name: "Driver Mike",
      email: "mike.driver@transport.com",
      phone: "+444 555 6667",
      vehicle: "Bus #12",
      route: "City Center to University",
    },
  };

  // Select details based on the role
  const details = profileDetails[Role] || {};

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
            <h2 className="text-2xl font-bold text-gray-800">
              {details.name || "Guest"}
            </h2>
            <p className="text-gray-600 mt-2">
              {details.email || "No email provided"}
            </p>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-6 space-y-4">
          {Role === "student" && (
            <>
              <div className="flex justify-center">
                <span className="font-medium text-gray-700">Batch:</span>
                <span className="text-gray-600">{details.batch}</span>
              </div>
              <div className="flex justify-center">
                <span className="font-medium text-gray-700">Department:</span>
                <span className="text-gray-600">{details.department}</span>
              </div>
              <div className="flex justify-center">
                <span className="font-medium text-gray-700">Hall Name:</span>
                <span className="text-gray-600">{details.hall}</span>
              </div>
            </>
          )}

          {(Role === "student" ||
            Role === "teacher" ||
            Role === "driver" ||
            Role === "admin") && (
            <>
              <div className="flex justify-center">
                <span className="font-medium text-gray-700">Phone Number:</span>
                <span className="text-gray-600">{details.phone}</span>
              </div>
              <div className="flex justify-center">
                <span className="font-medium text-gray-700">Address:</span>
                <span className="text-gray-600">{details.address}</span>
              </div>
            </>
          )}

          {Role === "driver" && (
            <>
              <div className="flex justify-center">
                <span className="font-medium text-gray-700">Vehicle:</span>
                <span className="text-gray-600">{details.vehicle}</span>
              </div>
              <div className="flex justify-center">
                <span className="font-medium text-gray-700">Route:</span>
                <span className="text-gray-600">{details.route}</span>
              </div>
            </>
          )}
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
