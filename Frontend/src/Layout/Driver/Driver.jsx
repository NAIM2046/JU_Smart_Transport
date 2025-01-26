import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";

const Driver = () => {
  const [busNumber, setBusNumber] = useState("");
  const [routeName, setRouteName] = useState("");
  const [busType, setBusType] = useState("");
  const [routes, setRoutes] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const navigate = useNavigate();
  const AxiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const fetchData = () => {
    AxiosSecure.get("/activebus").then((res) => {
      console.log(res.data);
      const userSchedule = res.data.filter(
        (schedule) => schedule.driverName === user.email
      );
      setSchedule(userSchedule);
    });
  };

  useEffect(() => {
    AxiosSecure.get("/routes")
      .then((res) => {
        console.log(res.data);
        setRoutes(res.data);
      })
      .catch((err) => {
        console.error("Error fetching routes:", err);
      });
    fetchData();
  }, []);
  console.log(routes);
  const handleStart = (item) => {
    // setBusNumber(item.busNumber);
    // setRoutes(item.routeName);
    // setBusType(item.busType);
    const datail = {
      busNumber: item.busNumber,
      routeName: item.routeName,
      busType: item.busType,
      status: "runing",
      email: user.email,
    };

    AxiosSecure.patch("/driverupdate", datail)
      .then((res) => {
        console.log(res.data);
        navigate("/mapcontiner");
      })
      .catch((error) => {
        console.error("Error updating driver:", error);
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const datail = {
        busNumber,
        routeName,
        busType,
        status: "runing",
        email: user.email,
      };
      console.log(datail);
      AxiosSecure.patch("/driverupdate", datail).then((res) => {
        console.log(res.data);
        navigate("/mapcontiner");
      });
    } catch (error) {
      console.error("Error fetching bus route:", error);
    }
  };

  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div>
        <div className="p-4">
          <h2 className="text-lg font-bold">Your Active Schedule</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {schedule.map((item) => (
              <div
                key={item._id}
                className="border border-gray-300 p-4 rounded-lg shadow-md"
              >
                <h3 className="font-semibold">Bus Number: {item.busNumber}</h3>
                <p>Route Name: {item.routeName}</p>
                <p>Bus Type: {item.busType}</p>
                <p>Time: {item.time}</p>
                <button
                  onClick={() => handleStart(item)}
                  className="bg-green-500 text-white mt-2 py-1 px-3 rounded"
                >
                  Start
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="p-4">
          <h1 className="text-lg font-bold">Bus Route Selector</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="busNumber" className="block font-medium">
                Bus Number
              </label>
              <input
                type="text"
                id="busNumber"
                value={busNumber}
                onChange={(e) => setBusNumber(e.target.value)}
                className="border border-gray-300 p-2 w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="routeName" className="block font-medium">
                Route Name
              </label>
              <select
                id="routeName"
                value={routeName}
                onChange={(e) => setRouteName(e.target.value)}
                className="border border-gray-300 p-2 w-full"
                required
              >
                <option value="" disabled>
                  Select a route
                </option>
                {routes.length > 0 ? (
                  routes.map((route) => (
                    <option key={route._id} value={route.routeName}>
                      {route.routeName}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No routes available
                  </option>
                )}
              </select>
            </div>

            <div>
              <label htmlFor="routeName" className="block font-medium">
                Bus Type Student/Staff/Teacher
              </label>
              <select
                id="routeName"
                value={busType}
                onChange={(e) => setBusType(e.target.value)}
                className="border border-gray-300 p-2 w-full"
                required
              >
                <option value="" disabled>
                  Selected bus Type
                </option>
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Staff">Staff</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Start
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Driver;
