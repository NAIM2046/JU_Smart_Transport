import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const StudentManage = () => {
  const [students, setStudents] = useState([]);
  const AxiosSecure = useAxiosSecure();
  const fatchdata = () => {
    AxiosSecure.get("/students").then((res) => {
      console.log(res.data);
      if (res.data) {
        setStudents(res.data);
      }
    });
  };
  useEffect(() => {
    fatchdata();
  }, []);
  const handleDelete = (id) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (!confirmed) return;
      AxiosSecure.delete(`/student/${id}`).then((res) => {
        console.log(res.data);
        fatchdata();
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (student) => {};

  return (
    <div>
      <div className="bg-white shadow p-4 rounded-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Student Management
        </h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2 text-left">Name</th>
              <th className="border-b p-2 text-left">email</th>
              <th className="border-b p-2 text-left">ID</th>
              <th className="border-b p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td className="border-b p-2 text-left">{student.username}</td>
                <td className="border-b p-2 text-left">{student.email}</td>
                <td className="border-b p-2 text-left">{student.id}</td>
                <td className="border-b p-2 text-left">
                  <button className="text-blue-500 hover:underline">
                    Edit
                  </button>{" "}
                  |{" "}
                  <button
                    onClick={() => {
                      handleDelete(student._id);
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
  );
};

export default StudentManage;
