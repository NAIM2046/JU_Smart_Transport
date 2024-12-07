import React from "react";
import RuningDriverList from "./Leftpage/RuningDriverList";
import RuningDriverMap from "./Rightpage/RuningDriverMap";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Student = () => {
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>

      <div className="justify-items-center">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Student;
