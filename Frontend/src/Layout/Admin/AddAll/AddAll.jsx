import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBus,
  FaRoute,
  FaCar,
} from "react-icons/fa";

const AddAll = () => {
  const navigate = useNavigate();

  const cards = [
    {
      label: "Add Student",
      icon: <FaUserGraduate size={30} />,
      path: "/admin/add-student",
    },
    {
      label: "Add Teacher",
      icon: <FaChalkboardTeacher size={30} />,
      path: "/admin/add-teacher",
    },
    {
      label: "Add Driver",
      icon: <FaCar size={30} />,
      path: "/admin/add-driver",
    },
    { label: "Add Bus", icon: <FaBus size={30} />, path: "/admin/add-bus" },
    {
      label: "Add Route",
      icon: <FaRoute size={30} />,
      path: "/admin/add-route",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Admin Actions
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map(({ label, icon, path }) => (
          <div
            key={label}
            onClick={() => navigate(path)}
            className="cursor-pointer bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-center text-center"
          >
            <div className="text-blue-500 mb-4">{icon}</div>
            <h2 className="text-lg font-semibold text-gray-700">{label}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddAll;
