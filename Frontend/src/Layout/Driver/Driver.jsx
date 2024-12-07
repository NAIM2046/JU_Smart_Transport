import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const Driver = () => {
  const [busNumber, setBusNumber] = useState("");
  const [routeName, setRouteName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const datail = {
        busNumber,
        routeName,
      };
      console.log(datail);
      navigate("/mapcontiner");
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
                <option value="Route 1">Route 1</option>
                <option value="Route 2">Route 2</option>
                <option value="Route 3">Route 3</option>
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
