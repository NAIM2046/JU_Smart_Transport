import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const AllUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); // Mock data
  const [currentPage, setCurrentPage] = useState(1);
  const AxiosSecure = useAxiosSecure();
  useEffect(() => {
    AxiosSecure.get("/reg_users").then((res) => {
      console.log(res.data);
      setUsers(res.data);
    });
  }, []);
  const totalPages = 5;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Add logic to fetch users for the new page
  };

  const viewDetails = (id) => {
    navigate(`/admin/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">
          All Users
        </h1>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-blue-500 text-white">#</th>
              <th className="py-2 px-4 bg-blue-500 text-white">Name</th>
              <th className="py-2 px-4 bg-blue-500 text-white">Email</th>
              <th className="py-2 px-4 bg-blue-500 text-white">Role</th>
              <th className="py-2 px-4 bg-blue-500 text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-blue-100 transition-colors cursor-pointer"
              >
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{user.username}</td>
                <td className="py-2 px-4 border">{user.email}</td>
                <td className="py-2 px-4 border">{user.role}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => viewDetails(user._id)}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
