import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Loading from "../../components/loading";

const url = import.meta.env.VITE_BACKEND;

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${url}/admin/login`,
        { email, password },
        { withCredentials: true }
      );
      setIsLoading(false);
      if (response.status == 200) {
        navigate("/admin/dashboard");
        localStorage.setItem("isLogin", true);
        toast.success("Login successful");
      }
    } catch (err) {
      setIsLoading(false);
      setError("Login failed. Please check your credentials.");
      toast.error(err.data.message);
      localStorage.setItem("isLogin", false);
    }
  };

  useEffect(() => {
    const login = localStorage.getItem("isLogin");
    if (login == "true") {
      navigate("/admin/dashboard");
    }
  }, [localStorage.getItem("isLogin")]);

  return (
    <>
      <Loading isOpen={isLoading} />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-sm p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center">Admin Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your password"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
