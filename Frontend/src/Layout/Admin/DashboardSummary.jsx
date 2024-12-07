import React from "react";

const DashboardSummary = () => {
  return (
    <div className="bg-white shadow p-4 rounded-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Dashboard Summary
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-100 rounded">
          <h3 className="text-lg font-semibold text-blue-800">
            Total Students
          </h3>
          <p className="text-2xl font-bold">120</p>
        </div>
        <div className="p-4 bg-green-100 rounded">
          <h3 className="text-lg font-semibold text-green-800">
            Total Drivers
          </h3>
          <p className="text-2xl font-bold">25</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded">
          <h3 className="text-lg font-semibold text-yellow-800">
            Active Buses
          </h3>
          <p className="text-2xl font-bold">8</p>
        </div>
        <div className="p-4 bg-red-100 rounded">
          <h3 className="text-lg font-semibold text-red-800">Routes</h3>
          <p className="text-2xl font-bold">15</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
