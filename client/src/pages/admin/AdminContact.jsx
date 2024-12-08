import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "../../components/loading";

const url = import.meta.env.VITE_BACKEND;

const ContactMessages = () => {
  const [contactMessages, setContactMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  console.log("contactMessages");

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/blog/contact/read`, {
        withCredentials: true,
      });
      setLoading(false);
      if (response.status == 200) {
        setContactMessages(response.data.contact);
      }
    } catch (error) {
      setLoading(false);
      if (error.response?.status === 401) {
        navigate("/admin/login");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Loading isOpen={loading} />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Contact Messages</h1>

        {/* Table of Contact Messages */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Subject</th>
                <th className="border px-4 py-2">Message</th>
              </tr>
            </thead>
            <tbody>
              {contactMessages.length > 0 ? (
                contactMessages.map((message) => (
                  <tr key={message._id}>
                    <td className="border px-4 py-2">{message.name}</td>
                    <td className="border px-4 py-2">{message.email}</td>
                    <td className="border px-4 py-2">{message.subject}</td>
                    <td className="border px-4 py-2">{message.message}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="border px-4 py-2 text-center text-gray-500"
                  >
                    No messages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ContactMessages;
