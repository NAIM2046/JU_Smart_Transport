import React, { useState } from "react";

const NoticeManage = () => {
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Holiday Announcement",
      description: "The office will remain closed on 1st December.",
      pdf: null,
    },
    {
      id: 2,
      title: "Meeting Update",
      description: "Team meeting scheduled for 2nd December at 10 AM.",
      pdf: null,
    },
  ]); // Mock data
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    pdf: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, pdf: file });
  };

  const handleAddNotice = () => {
    if (!formData.title || !formData.description) return;
    setNotices([{ ...formData, id: Date.now() }, ...notices]); // Add to the top
    setFormData({ id: null, title: "", description: "", pdf: null });
  };

  const handleEditNotice = (id) => {
    const notice = notices.find((notice) => notice.id === id);
    setFormData(notice);
    setIsEditing(true);
  };

  const handleUpdateNotice = () => {
    setNotices(
      notices.map((notice) => (notice.id === formData.id ? formData : notice))
    );
    setFormData({ id: null, title: "", description: "", pdf: null });
    setIsEditing(false);
  };

  const handleDeleteNotice = (id) => {
    setNotices(notices.filter((notice) => notice.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 p-6">
      {/* Add Notice Button */}
      <div className="max-w-4xl mx-auto text-center mb-6">
        <button
          onClick={() => setIsEditing(false)}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Add Notice
        </button>
      </div>

      {/* Top Notices Section */}
      <div className="max-w-4xl mx-auto bg-yellow-100 rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-yellow-800 mb-4">
          Latest Notices
        </h1>
        {notices.length === 0 ? (
          <p className="text-gray-700">No notices available.</p>
        ) : (
          <ul className="space-y-4">
            {notices.slice(0, 3).map(
              (
                notice // Display the latest 3 notices
              ) => (
                <li key={notice.id} className="p-4 bg-white rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {notice.title}
                  </h3>
                  <p className="text-sm text-gray-600">{notice.description}</p>
                  {notice.pdf && (
                    <a
                      href={URL.createObjectURL(notice.pdf)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline text-sm mt-2 inline-block"
                    >
                      View PDF
                    </a>
                  )}
                </li>
              )
            )}
          </ul>
        )}
      </div>

      {/* Notice Management Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Notice Management
        </h1>

        {/* Notices List */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-600 mb-4">
            All Notices
          </h2>
          <ul className="space-y-4">
            {notices.map((notice) => (
              <li
                key={notice.id}
                className="flex justify-between items-start p-4 bg-gray-100 rounded-lg shadow"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {notice.title}
                  </h3>
                  <p className="text-sm text-gray-600">{notice.description}</p>
                  {notice.pdf && (
                    <a
                      href={URL.createObjectURL(notice.pdf)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline text-sm mt-2 inline-block"
                    >
                      View PDF
                    </a>
                  )}
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditNotice(notice.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteNotice(notice.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Add/Edit Notice Form */}
        <div>
          <h2 className="text-lg font-semibold text-gray-600 mb-4">
            {isEditing ? "Edit Notice" : "Add Notice"}
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            ></textarea>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              onClick={isEditing ? handleUpdateNotice : handleAddNotice}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              {isEditing ? "Update Notice" : "Add Notice"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeManage;
