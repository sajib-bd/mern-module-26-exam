import { useState } from "react";
import AdminBlog from "./adminBlog";
import AdminService from "./adminService";
import AdminTeam from "./adminTeam";
import ContactMessages from "./Admincontact";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState("blog");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderContent = () => {
    switch (currentPage) {
      case "blog":
        return <AdminBlog />;
      case "service":
        return <AdminService />;
      case "team":
        return <AdminTeam />;
      case "contact":
        return <ContactMessages />;
      default:
        return <div>Blog Content</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <div className="flex flex-wrap bg-gray-800 text-white p-4">
        <button
          onClick={() => handlePageChange("blog")}
          className={`px-4 py-2 text-sm font-bold ${
            currentPage === "blog"
              ? "bg-blue-500 text-white"
              : "text-gray-300 hover:bg-gray-700"
          }`}
        >
          Blog
        </button>
        <button
          onClick={() => handlePageChange("service")}
          className={`px-4 py-2 text-sm font-bold ${
            currentPage === "service"
              ? "bg-blue-500 text-white"
              : "text-gray-300 hover:bg-gray-700"
          }`}
        >
          Service
        </button>
        <button
          onClick={() => handlePageChange("team")}
          className={`px-4 py-2 text-sm font-bold ${
            currentPage === "team"
              ? "bg-blue-500 text-white"
              : "text-gray-300 hover:bg-gray-700"
          }`}
        >
          Team
        </button>
        <button
          onClick={() => handlePageChange("contact")}
          className={`px-4 py-2 text-sm font-bold ${
            currentPage === "contact"
              ? "bg-blue-500 text-white"
              : "text-gray-300 hover:bg-gray-700"
          }`}
        >
          Contact
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">{renderContent()}</div>
    </div>
  );
};

export default Dashboard;
