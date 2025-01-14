import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const NoticeManage = () => {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState("");
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const AxiosSecure = useAxiosSecure();
  // fetch all notice
  const fetchNotice = async () => {
    const result = await AxiosSecure.get("/notice");
    console.log(result.data);
    setNotices(result.data);
  };
  // Control form visibility
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    pdf: null,
  });

  const handleAddNotice = async (e) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("pdf", pdf);
    console.log(formData);
    AxiosSecure.post("/upload_pdf", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      console.log(res.data);
      fetchNotice();
    });
  };

  const handleEditNotice = (id) => {
    const notice = notices.find((notice) => notice.id === id);
    setFormData(notice);
    setIsEditing(true);
    setShowForm(true); // Show form for editing
  };

  const handleUpdateNotice = () => {
    setNotices(
      notices.map((notice) => (notice.id === formData.id ? formData : notice))
    );
    setFormData({ id: null, title: "", description: "", pdf: null });
    setIsEditing(false);
    setShowForm(false);

    // Hide form after updating
  };

  const deleteNotice = async (id) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this notice?"
      );
      if (!confirmed) return;

      const res = await AxiosSecure.delete(`/notices/${id}`);
      if (res.data) {
        alert("Notice deleted successfully!");
        fetchNotice();
      }

      // Refresh the notice list
    } catch (error) {
      console.error("Error deleting notice:", error);
      alert("Failed to delete notice. Please try again.");
    }
  };
  useEffect(() => {
    fetchNotice();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 p-6">
      {/* Add Notice Button */}
      <div className="max-w-4xl mx-auto text-center mb-6">
        <button
          onClick={() => {
            setIsEditing(false);
            setShowForm(!showForm); // Show the form
            setFormData({ id: null, title: "", description: "", pdf: null }); // Reset form
          }}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          {showForm ? <p>Close </p> : <p> Add Notice</p>}
        </button>
      </div>
      {/* Add/Edit Notice Form */}
      {showForm && (
        <div className=" max-w-4xl mx-auto  bg-purple-400  rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-600 mb-4">
            {isEditing ? "Edit Notice" : "Add Notice"}
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdf(e.target.files[0])}
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
      )}

      {/* Top Notices Section */}
      <div className="max-w-4xl mx-auto bg-yellow-100 rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-yellow-800 mb-4">
          Latest Notices
        </h1>
        {notices.length === 0 ? (
          <p className="text-gray-700">No notices available.</p>
        ) : (
          <ul className="space-y-4">
            {notices.slice(0, 3).map((notice) => (
              <li key={notice._id} className="p-4 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800">
                  {notice.title}
                </h3>

                {notice.filePath && (
                  <a
                    href={`http://localhost:5000${notice.filePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline text-sm mt-2 inline-block"
                  >
                    View PDF
                  </a>
                )}
              </li>
            ))}
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
                key={notice._id}
                className="flex justify-between items-start p-4 bg-gray-100 rounded-lg shadow"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {notice.title}
                  </h3>

                  {notice.filePath && (
                    <a
                      href={`http://localhost:5000${notice.filePath}`}
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
                    onClick={() => deleteNotice(notice._id)}
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
    </div>
  );
};

export default NoticeManage;
