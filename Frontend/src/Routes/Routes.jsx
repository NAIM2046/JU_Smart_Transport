import { createBrowserRouter } from "react-router-dom";
import SignUp from "../components/SignUp/SignUp";
import Login from "../components/Login/Login";
import Home from "../components/Home/Home";
import Student from "../Layout/Student/Student";
import Driver from "../Layout/Driver/Driver";
import Admin from "../Layout/Admin/Admin";
import MapCotiner from "../Layout/Driver/MapCotiner";
import DashboardSummary from "../Layout/Admin/DashboardSummary";
import StudentManage from "../Layout/Admin/StudentManage/StudentManage";
import DriverMange from "../Layout/Admin/DriverMange/DriverMange";
import AddUser from "../Layout/Admin/AddUser/AddUser";
import AllUser from "../Layout/Admin/AllUser/AllUser";
import NoticeManage from "../Layout/Admin/Notice/NoticeManage";
import RouteManage from "../Layout/Admin/RouteManage/RouteManage";
import UserDetails from "../Layout/Admin/AllUser/UserDetail";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import BusList from "../Pages/BusList/BusList";
import DriverList from "../Pages/DriverList/DriverList";
import NoticePage from "../Pages/Notice/NoticePage";
import BusSchedule from "../Pages/BusShedule/BusShedule";
import ScheduleManage from "../Layout/Admin/SheduleManage/SheduleManage";
import RuningDriverList from "../Layout/Student/Leftpage/RuningDriverList";
import RuningDriverMap from "../Layout/Student/Rightpage/RuningDriverMap";

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
    children: [
      {
        path: "/student",
        element: <RuningDriverList></RuningDriverList>,
      },
      {
        path: "map",
        element: <RuningDriverMap></RuningDriverMap>,
      },
    ],
  },
  {
    path: "/driver",
    element: <Driver></Driver>,
  },
  {
    path: "/mapcontiner",
    element: <MapCotiner></MapCotiner>,
  },
  {
    path: "/profile",
    element: <ProfilePage></ProfilePage>,
  },
  {
    path: "/buslist",
    element: <BusList></BusList>,
  },
  {
    path: "/driverlist",
    element: <DriverList></DriverList>,
  },
  {
    path: "/notice",
    element: <NoticePage></NoticePage>,
  },
  {
    path: "/busshedule",
    element: <BusSchedule></BusSchedule>,
  },
  {
    path: "/admin",
    element: <Admin></Admin>,
    children: [
      {
        path: "/admin",
        element: <DashboardSummary></DashboardSummary>,
      },
      {
        path: "stdmanage",
        element: <StudentManage></StudentManage>,
      },
      {
        path: "drivermanage",
        element: <DriverMange></DriverMange>,
      },
      {
        path: "adduser",
        element: <AddUser></AddUser>,
      },
      {
        path: "users",
        element: <AllUser></AllUser>,
      },
      {
        path: ":id",
        element: <UserDetails></UserDetails>,
      },

      {
        path: "notice",
        element: <NoticeManage></NoticeManage>,
      },
      {
        path: "route",
        element: <RouteManage></RouteManage>,
      },
      {
        path: "schedule",
        element: <ScheduleManage></ScheduleManage>,
      },
    ],
  },
]);
export default router;
