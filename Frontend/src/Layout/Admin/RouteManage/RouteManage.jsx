import React, { useState } from "react";

const RouteManage = () => {
  const [routes, setRoutes] = useState([
    {
      id: 1,
      name: "Route A",
      start: "City Center",
      end: "University",
      distance: "15 km",
    },
    {
      id: 2,
      name: "Route B",
      start: "Airport",
      end: "Downtown",
      distance: "10 km",
    },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    start: "",
    end: "",
    distance: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddRoute = () => {
    if (
      !formData.name ||
      !formData.start ||
      !formData.end ||
      !formData.distance
    )
      return;
    setRoutes([{ ...formData, id: Date.now() }, ...routes]); // Add route at the top
    setFormData({ id: null, name: "", start: "", end: "", distance: "" });
  };

  const handleEditRoute = (id) => {
    const route = routes.find((route) => route.id === id);
    setFormData(route);
    setIsEditing(true);
  };

  const handleUpdateRoute = () => {
    setRoutes(
      routes.map((route) => (route.id === formData.id ? formData : route))
    );
    setFormData({ id: null, name: "", start: "", end: "", distance: "" });
    setIsEditing(false);
  };

  const handleDeleteRoute = (id) => {
    setRoutes(routes.filter((route) => route.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 p-6">
      {/* Add Route Button */}
      <div className="max-w-4xl mx-auto text-center mb-6">
        <button
          onClick={() => {
            setIsEditing(false);
            setFormData({
              id: null,
              name: "",
              start: "",
              end: "",
              distance: "",
            });
          }}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Add Route
        </button>
      </div>

      {/* Route Management Section */}
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
                key={route.id}
                className="flex justify-between items-start p-4 bg-gray-100 rounded-lg shadow"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {route.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {route.start} to {route.end}, {route.distance}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditRoute(route.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRoute(route.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Add/Edit Route Form */}
        <div>
          <h2 className="text-lg font-semibold text-gray-600 mb-4">
            {isEditing ? "Edit Route" : "Add Route"}
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Route Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="text"
              name="start"
              value={formData.start}
              onChange={handleInputChange}
              placeholder="Start Location"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="text"
              name="end"
              value={formData.end}
              onChange={handleInputChange}
              placeholder="End Location"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="text"
              name="distance"
              value={formData.distance}
              onChange={handleInputChange}
              placeholder="Distance"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              onClick={isEditing ? handleUpdateRoute : handleAddRoute}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              {isEditing ? "Update Route" : "Add Route"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteManage;
