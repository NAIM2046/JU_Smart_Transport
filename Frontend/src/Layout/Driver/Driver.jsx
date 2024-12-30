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

  const navigate = useNavigate();
  const AxiosSecure = useAxiosSecure();
  const { user } = useAuth();
  useEffect(() => {
    AxiosSecure.get("/routes")
      .then((res) => {
        console.log(res.data);
        setRoutes(res.data);
      })
      .catch((err) => {
        console.error("Error fetching routes:", err);
      });
  }, []);
  console.log(routes);
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
                Bus Type Student/Stap/Teacher
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
                <option value="Stap">Stap</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Driver;
