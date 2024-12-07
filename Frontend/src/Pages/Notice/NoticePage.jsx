import React from "react";

const NoticePage = () => {
  // Sample Notices Data with PDF URLs
  const notices = [
    {
      id: 1,
      title: "2024-25 Academic Circular",
      description: "Important update regarding exams and academic schedule.",
      date: "Sep 26, 2024",
      color: "blue",
      pdf: "https://example.com/academic-circular.pdf", // Replace with actual PDF URL
    },
    {
      id: 2,
      title: "Hall Transfers for Students",
      description: "Updated list of students approved for hall transfers.",
      date: "Sep 22, 2024",
      color: "green",
      pdf: "https://example.com/hall-transfers.pdf", // Replace with actual PDF URL
    },
    {
      id: 3,
      title: "Emergency Student Aid",
      description:
        "Applications open for medical assistance for injured students.",
      date: "Sep 17, 2024",
      color: "red",
      pdf: "https://example.com/student-aid.pdf", // Replace with actual PDF URL
    },
  ];

  // Handle notice click
  const openPDF = (pdfUrl) => {
    window.open(pdfUrl, "_blank"); // Open the PDF in a new tab
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 text-center">
        <h1 className="text-2xl font-bold">Notice Board</h1>
      </header>

      {/* Notices Section */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className={`bg-white shadow-lg rounded-lg p-4 border-l-4 border-${notice.color}-500 cursor-pointer`}
              onClick={() => openPDF(notice.pdf)}
            >
              <h2 className={`text-lg font-bold text-${notice.color}-700`}>
                {notice.title}
              </h2>
              <p className="text-sm text-gray-600 mt-2">{notice.description}</p>
              <p className="text-xs text-gray-500 mt-2">Date: {notice.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <nav className="inline-flex">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-l">
            1
          </button>
          <button className="px-4 py-2 bg-gray-200">2</button>
          <button className="px-4 py-2 bg-gray-200">3</button>
          <button className="px-4 py-2 bg-gray-200 rounded-r">Next</button>
        </nav>
      </div>
    </div>
  );
};

export default NoticePage;
