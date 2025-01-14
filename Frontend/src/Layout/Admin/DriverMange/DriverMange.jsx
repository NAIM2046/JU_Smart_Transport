import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const DriverMange = () => {
  const [DriverList, setDriverList] = useState([]);
  const AxiosSecure = useAxiosSecure();
  const fatchData = () => {
    AxiosSecure.get("/driver").then((res) => {
      console.log(res.data);
      setDriverList(res.data);
    });
  };
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) return;
    AxiosSecure.delete(`/driver/${id}`).then((res) => {
      console.log(res.data);
      fatchData();
    });
  };
  useEffect(() => {
    fatchData();
  }, []);
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
                <th className="border-b p-2 text-left">email/phone</th>
                <th className="border-b p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {DriverList.map((driver) => (
                <tr key={driver._id}>
                  <td className="border-b p-2 text-left">{driver.username}</td>
                  <td className="border-b p-2 text-left">{driver.email}</td>
                  <td className="border-b p-2 text-left">
                    <button className="text-blue-500 hover:underline">
                      Edit
                    </button>{" "}
                    |{" "}
                    <button
                      onClick={() => {
                        handleDelete(driver._id);
                      }}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DriverMange;
