import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "../../components/loading";

const url = import.meta.env.VITE_BACKEND;

const AdminTeam = () => {
  const [teamData, setTeamData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    profileImageUrl: "",
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
      const response = await axios.get(`${url}/blog/team/read`, {
        withCredentials: true,
      });

      setLoading(false);
      if (response.status === 200) {
        setTeamData(response.data.team || []);
      }
    } catch (error) {
      setLoading(false);
      if (error.response?.status === 401) {
        navigate("/admin/login");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teamMember = {
      name: formData.name,
      role: formData.role,
      bio: formData.bio,
      profileImageUrl: formData.profileImageUrl,
    };

    try {
      setLoading(true);
      const method = editId ? "put" : "post";
      const apiUrl = editId
        ? `${url}/blog/team/update/${editId}`
        : `${url}/blog/team/create`;

      await axios({
        method,
        url: apiUrl,
        data: teamMember,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setFormData({ name: "", role: "", bio: "", profileImageUrl: "" });
      setEditId(null);
      setShowModal(false);
      setLoading(false);
      fetchData();
    } catch (error) {
      setLoading(false);
      if (error.response?.status === 401) {
        navigate("/admin/login");
      }
    }
  };

  const handleEdit = (member) => {
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio,
      profileImageUrl: member.profileImageUrl || "",
    });
    setEditId(member._id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`${url}/blog/team/delete/${deleteId}`, {
        withCredentials: true,
      });
      fetchData();
      setDeleteId(null);
      setDeleteModal(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response?.status === 401) {
        navigate("/admin/login");
      }
    }
  };

  const handleAdd = () => {
    setFormData({ name: "", role: "", bio: "", profileImageUrl: "" });
    setEditId(null);
    setShowModal(true);
  };

  return (
    <>
      <Loading isOpen={loading} />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Team Management</h1>

        {/* Add Member Button */}
        <button
          onClick={handleAdd}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
        >
          Add New Team Member
        </button>

        {/* Table of Team Members */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 mb-6">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Role</th>
                <th className="border px-4 py-2">Bio</th>
                <th className="border px-4 py-2">Profile Image</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamData.map((member) => (
                <tr key={member._id}>
                  <td className="border px-4 py-2">{member.name}</td>
                  <td className="border px-4 py-2">{member.role}</td>
                  <td className="border px-4 py-2">{member.bio}</td>
                  <td className="border px-4 py-2">
                    {member.profileImageUrl && (
                      <img
                        src={member.profileImageUrl}
                        alt={member.name}
                        className="h-16 w-16 object-cover"
                      />
                    )}
                  </td>
                  <td className="border px-4 py-2 flex flex-col gap-2">
                    <button
                      onClick={() => handleEdit(member)}
                      className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setDeleteId(member._id);
                        setDeleteModal(true);
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for Add/Edit Member */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">
                {editId ? "Edit Team Member" : "Add New Team Member"}
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
                  <label className="block text-lg font-semibold">Role</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="w-full border px-4 py-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-semibold">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    className="w-full border px-4 py-2 rounded"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-semibold">
                    Profile Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.profileImageUrl}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        profileImageUrl: e.target.value,
                      })
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

export default AdminTeam;
