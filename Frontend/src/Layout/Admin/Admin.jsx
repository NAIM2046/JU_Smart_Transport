import React from "react";
import DashboardSummary from "./DashboardSummary";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaAd,
  FaBook,
  FaCalendar,
  FaEnvelope,
  FaHome,
  FaList,
  FaSearch,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";
import { AiOutlineNotification } from "react-icons/ai";
import { GiInterstellarPath } from "react-icons/gi";
import useAuth from "../../Hook/useAuth";

const Admin = () => {
  const { user, loading, LogOut } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    LogOut().then(() => {
      navigate("/login");
    });
  };
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <header className="flex items-center justify-between bg-white shadow p-4 rounded-md">
        <h1 className="text-2xl font-bold text-gray-700">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Logout
        </button>
      </header>

      {/* Dashboard Content */}
      <div className="flex">
        {/* dashboard side bar */}
        <div className="w-64 min-h-screen bg-orange-400">
          <ul className="menu p-4">
            {
              <>
                <li>
                  <NavLink to="/admin">
                    <FaHome></FaHome>
                    Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/stdmanage">
                    <MdManageAccounts />
                    Student Managemant
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/drivermanage">
                    <MdManageAccounts />
                    Driver Management
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/adduser">
                    <IoPersonAdd />
                    Add User
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/users">
                    <FaUsers></FaUsers>
                    All Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/notice">
                    <AiOutlineNotification />
                    Notice Management
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/route">
                    <GiInterstellarPath />
                    Route Management
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/schedule">
                    <GiInterstellarPath />
                    Schedule Management
                  </NavLink>
                </li>
              </>
            }
            {/* shared nav links */}
            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <FaHome></FaHome>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/order/salad">
                <FaSearch></FaSearch>
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink to="/order/contact">
                <FaEnvelope></FaEnvelope>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        {/* dashboard content */}
        <div className="flex-1 p-8">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Admin;
