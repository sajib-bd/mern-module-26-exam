import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "../../components/loading";

const url = import.meta.env.VITE_BACKEND;

const AdminService = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/blog/service/read`, {
        withCredentials: true,
      });
      setLoading(false);
      if (response.status === 200) {
        setData(response.data.service);
        localStorage.setItem("isLogin", true);
      }
    } catch (error) {
      setLoading(false);
      if (error.status === 401) {
        localStorage.setItem("isLogin", false);
        navigate("/admin/login");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceData = {
      name: formData.name,
      description: formData.description,
      imageUrl: formData.imageUrl,
    };

    try {
      setLoading(true);
      const method = editId ? "put" : "post";
      const apiUrl = editId
        ? `${url}/blog/service/update/${editId}`
        : `${url}/blog/service/create`;

      await axios({
        method,
        url: apiUrl,
        data: serviceData,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setFormData({ name: "", description: "", imageUrl: "" });
      setEditId(null);
      setShowModal(false);
      setLoading(false);
      fetchData();
    } catch (error) {
      setLoading(false);
      if (error.status === 401) {
        localStorage.setItem("isLogin", false);
        navigate("/admin/login");
      }
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      description: item.description,
      imageUrl: item.imageUrl || "",
    });
    setEditId(item._id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`${url}/blog/service/delete/${deleteId}`, {
        withCredentials: true,
      });
      setDeleteId(null);
      setLoading(false);
      setDeleteModal(false);
      fetchData();
    } catch (error) {
      setLoading(false);
      if (error.status === 401) {
        localStorage.setItem("isLogin", false);
        navigate("/admin/login");
      }
    }
  };

  const handleAdd = () => {
    setFormData({ name: "", description: "", imageUrl: "" });
    setEditId(null);
    setShowModal(true);
  };

  useEffect(() => {
    const login = localStorage.getItem("isLogin");
    if (login === "false") {
      navigate("/admin/login");
    }
  }, [localStorage.getItem("isLogin")]);

  return (
    <>
      <Loading isOpen={loading} />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Service Dashboard</h1>

        {/* Add Service Button */}
        <button
          onClick={handleAdd}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
        >
          Add New Service
        </button>

        {/* Table of services */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 mb-6">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Image</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.description}</td>
                  <td className="border px-4 py-2">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-16 w-16 object-cover"
                      />
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setDeleteId(item._id);
                          setDeleteModal(true);
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for Add/Edit Service */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg w-[400px] sm:w-[450px] md:w-[600px] lg:w-[750px] xl:w-[900px] max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">
                {editId ? "Edit Service" : "Add New Service"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-lg font-semibold">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border px-4 py-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-semibold">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full border px-4 py-2 rounded"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-semibold">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    className="w-full border px-4 py-2 rounded"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {editId ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="ml-2 px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/*service delete modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Confirm Blog Delete</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to blog delete?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setDeleteModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
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

export default AdminService;
