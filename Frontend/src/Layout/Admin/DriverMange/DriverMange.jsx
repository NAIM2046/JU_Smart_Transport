import React from "react";

const DriverMange = () => {
  return (
    <div>
      <div>
        <div className="bg-white shadow p-4 rounded-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Driver Management
          </h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2 text-left">Name</th>
                <th className="border-b p-2 text-left">Role</th>
                <th className="border-b p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b p-2 text-left">John Doe</td>
                <td className="border-b p-2 text-left">Driver</td>
                <td className="border-b p-2 text-left">
                  <button className="text-blue-500 hover:underline">
                    Edit
                  </button>{" "}
                  |{" "}
                  <button className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DriverMange;
