import { createBrowserRouter } from "react-router-dom";
import SignUp from "../components/SignUp/SignUp";
import Login from "../components/Login/Login";
import Home from "../components/Home/Home";
import Student from "../Layout/Student/Student";
import Driver from "../Layout/Driver/Driver";
import Admin from "../Layout/Admin/Admin";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/student",
    element: <Student></Student>,
  },
  {
    path: "/driver",
    element: <Driver></Driver>,
  },
  {
    path: "/admin",
    element: <Admin></Admin>,
  },
]);
export default router;
