import axios from "axios";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const login = localStorage.getItem("isLogin");
  const location = useLocation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND}/admin/logout`;
      const response = await axios.post(url, {}, { withCredentials: true });
      if (response.status === 200) {
        toast.success("Logged out successfully");
        localStorage.setItem("isLogin", false);
        navigate("/admin/login");
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Blogs", path: "/blogs" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const activeClass = "text-blue-400 border-b-2 border-blue-400 pb-1";
  const defaultClass = "hover:text-blue-300";

  return (
    <>
      <nav className="bg-gray-800 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <NavLink to="/" className="text-lg font-bold">
            Lie Blog
          </NavLink>

          <ul className="hidden md:flex gap-6">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `transition duration-300 ease-in-out ${
                      isActive ? activeClass : defaultClass
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex gap-4 items-center">
            {location.pathname === "/admin/dashboard" && (
              <button
                onClick={() => setLogoutModal(true)}
                className="px-4 py-2 rounded-full bg-blue-500 font-bold hover:bg-blue-600 transition duration-300"
              >
                LOG OUT
              </button>
            )}
            <button
              className="block md:hidden focus:outline-none text-2xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-gray-700">
            <ul className="space-y-4 py-4 text-center">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `block transition duration-300 ease-in-out ${
                        isActive ? activeClass : defaultClass
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Logout Modal */}
      {logoutModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setLogoutModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={logoutHandler}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
