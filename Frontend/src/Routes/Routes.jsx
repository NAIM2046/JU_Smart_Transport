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
import AddUser from "../Layout/Admin/AddAll/AddUser";
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
import PrivateRoutes from "./PrivateRoutes";
import StudentRoutes from "./StudentRoutes";
import DriverRoutes from "./DriverRoutes";
import AdminRoutes from "./AdminRoutes";
import AddAll from "../Layout/Admin/AddAll/AddAll";
import AddStudent from "../Layout/Admin/AddAll/AddStudent";
import AddTeacher from "../Layout/Admin/AddAll/AddTeacher";
import AddDriver from "../Layout/Admin/AddAll/AddDriver";
import AddBus from "../Layout/Admin/AddAll/AddBus";
import AddRoute from "../Layout/Admin/AddAll/AddRoute";

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
    element: (
      <StudentRoutes>
        <Student></Student>
      </StudentRoutes>
    ),
    children: [
      {
        path: "",
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
    element: (
      <DriverRoutes>
        <Driver></Driver>
      </DriverRoutes>
    ),
  },
  {
    path: "/mapcontiner",
    element: <MapCotiner></MapCotiner>,
  },
  {
    path: "/profile",
    element: (
      <PrivateRoutes>
        <ProfilePage></ProfilePage>
      </PrivateRoutes>
    ),
  },
  {
    path: "/buslist",
    element: (
      <PrivateRoutes>
        <BusList></BusList>
      </PrivateRoutes>
    ),
  },
  {
    path: "/driverlist",
    element: (
      <PrivateRoutes>
        <DriverList></DriverList>
      </PrivateRoutes>
    ),
  },
  {
    path: "/notice",
    element: (
      <PrivateRoutes>
        <NoticePage></NoticePage>
      </PrivateRoutes>
    ),
  },
  {
    path: "/busshedule",
    element: (
      <PrivateRoutes>
        <BusSchedule></BusSchedule>
      </PrivateRoutes>
    ),
  },
  {
    path: "/admin",
    element: (
      <AdminRoutes>
        <Admin></Admin>
      </AdminRoutes>
    ),
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
        path: "addall",
        element: <AddAll></AddAll>,
      },
      {
        path: "add-student",
        element: <AddStudent></AddStudent>,
      },
      {
        path: "add-teacher",
        element: <AddTeacher></AddTeacher>,
      },
      {
        path: "add-driver",
        element: <AddDriver></AddDriver>,
      },
      {
        path: "add-bus",
        element: <AddBus></AddBus>,
      },
      {
        path: "add-route",
        element: <AddRoute></AddRoute>,
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
