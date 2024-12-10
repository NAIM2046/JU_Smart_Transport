import React, { useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { LogOut } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    LogOut().then((res) => {
      navigate("/");
    });
  };
  return (
    <nav className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-white font-bold text-xl"> JU Smart Transport</div>

        {/* Hamburger Menu */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {!isOpen ? (
            <MdOutlineMenu className="text-4xl" />
          ) : (
            <IoMdClose className="text-4xl" />
          )}
        </button>

        {/* Menu Items */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-6 absolute md:relative top-24 md:top-0 right-0 mr-8 md:left-auto  md:w-auto bg-gradient-to-r md:shadow-none shadow-lg`}
        >
          <Link
            to="/"
            className="block text-white py-2 px-4 md:py-0 hover:text-yellow-300 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/driverlist"
            className="block text-white py-2 px-4 md:py-0 hover:text-yellow-300 transition duration-300"
          >
            Driver List
          </Link>
          <Link
            to="/buslist"
            className="block text-white py-2 px-4 md:py-0 hover:text-yellow-300 transition duration-300"
          >
            Bus List
          </Link>
          <Link
            to="/notice"
            className="block text-white py-2 px-4 md:py-0 hover:text-yellow-300 transition duration-300"
          >
            Notice
          </Link>
          <Link
            to="/busshedule"
            className="block text-white py-2 px-4 md:py-0 hover:text-yellow-300 transition duration-300"
          >
            Bus Schedule
          </Link>
          <Link
            to="/profile"
            className="block text-white py-2 px-4 md:py-0 hover:text-yellow-300 transition duration-300"
          >
            Profile
          </Link>
          <button onClick={handleLogout}>logOut</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
