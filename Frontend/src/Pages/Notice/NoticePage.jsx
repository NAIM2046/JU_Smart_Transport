import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Navbar from "../../components/Navbar/Navbar";

const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const AxioseSurce = useAxiosSecure();
  const [viewAll, setViewAll] = useState(false);

  useEffect(() => {
    AxioseSurce.get("/someNotices")
      .then((res) => {
        setNotices(res.data);
      })
      .catch((error) => console.error("Error fetching notices:", error));
  }, []);

  const fatchAllData = () => {
    AxioseSurce.get("/notice")
      .then((res) => {
        setNotices(res.data);
        setViewAll(true);
      })
      .catch((error) => console.error("Error fetching notices:", error));
  };

  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      {/* Header */}
      <div className="mb-4">
        <Navbar></Navbar>
      </div>
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 text-center shadow-lg">
        <h1 className="text-3xl font-bold">Notice Board</h1>
      </header>

      {/* Search Bar */}
      <div className="container mx-auto px-6 py-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      {/* Notices Section */}
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotices.map((notice) => (
            <div key={notice._id} className="bg-white rounded-xl pt-2 pb-2">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {notice.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {new Date(notice.uploadedAt).toLocaleString()}
              </p>
              {notice.filePath && (
                <a
                  href={`http://localhost:5000${notice.filePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 font-medium underline hover:text-blue-800"
                >
                  View PDF
                </a>
              )}
            </div>
          ))}
        </div>

        {/* View All Button */}
        {!viewAll && (
          <div className="text-center mt-6">
            <button
              onClick={fatchAllData}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            >
              View All Notices
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticePage;
