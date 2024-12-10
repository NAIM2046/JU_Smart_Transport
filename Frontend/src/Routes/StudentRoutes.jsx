import React from "react";
import userRole from "../Hook/userRole";
import useAuth from "../Hook/useAuth";
import { Navigate } from "react-router-dom";

const StudentRoutes = ({ children }) => {
  const [Role, isRole] = userRole();
  const { user, loading } = useAuth();
  if (loading || isRole) {
    return <progress className="progress w-56"></progress>;
  }
  if (user && Role === "student") {
    return children;
  }
  return <Navigate to="/"></Navigate>;
};

export default StudentRoutes;
