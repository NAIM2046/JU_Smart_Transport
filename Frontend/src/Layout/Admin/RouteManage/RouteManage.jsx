import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const RouteManage = () => {
  const [routes, setRoutes] = useState([]);
  const AxiosSecure = useAxiosSecure();
  useEffect(() => {
    AxiosSecure.get("/routes").then((res) => {
      setRoutes(res.data);
    });
  }, []);
  console.log(routes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    _id: null,
    routeName: "",
    startPoint: "",
    endPointstartPoint: "",
    distance: "",
  });

  const handleOpenModal = (route) => {
    setFormData(route); // Prefill form data for editing
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setFormData({
      _id: null,
      routeName: "",
      startPoint: "",
      endPoint: "",
      distance: "",
    });
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update form data
  };

  const handleUpdateRoute = async () => {
    try {
      const updatedRoute = { ...formData }; // Create the object to send to the backend

      // Example: Replace this with your actual backend API call

      console.log(updatedRoute);

      AxiosSecure.patch("/route", updatedRoute).then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          alert("Route update successfully");
        }
        setRoutes(
          routes.map((route) =>
            route._id === formData._id ? { ...formData } : route
          )
        );
      });

      // Update the route in the UI

      handleCloseModal();
    } catch (error) {
      console.error("Error updating route:", error);
    }
  };

  const handleDeleteRoute = (id) => {
    AxiosSecure.delete(`/route/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.deletedCount > 0) {
        alert("Delete successfully route");
        setRoutes(routes.filter((route) => route._id !== id));
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Route Management
        </h1>

        {/* Routes List */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-600 mb-4">
            All Routes
          </h2>
          <ul className="space-y-4">
            {routes.map((route) => (
              <li
                key={route._id}
                className="flex justify-between items-start p-4 bg-gray-100 rounded-lg shadow"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {route.routeName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {route.startPoint} to {route.endPoint}
                  </p>
                  <p> {route.distance} Km</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleOpenModal(route)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRoute(route._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Edit Route</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Route Name</label>
                <input
                  type="text"
                  name="routeName"
                  value={formData.routeName}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Start Point</label>
                <input
                  type="text"
                  name="startPoint"
                  value={formData.startPoint}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">End Point</label>
                <input
                  type="text"
                  name="endPoint"
                  value={formData.endPoint}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Distance</label>
                <input
                  type="text"
                  name="distance"
                  value={formData.distance}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateRoute}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteManage;
