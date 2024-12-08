import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      setStatus("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      const url = import.meta.env.VITE_BACKEND;
      const response = await axios.post(
        `${url}/blog/contact/create`,
        { name, email, subject, message },
        {
          "Content-Type": "application/json",
        }
      );
      setLoading(false);
      if (response.status == 200) {
        setStatus("Message sent successfully!");
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("Something went wrong, please try again later.");
        toast.info(response.data.message);
      }
    } catch (error) {
      setStatus("Error: " + error.message);
      toast.info(error.data.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Contact Us</h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300 ease-in-out"
        >
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-lg font-semibold mb-2 text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-lg font-semibold mb-2 text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="subject"
              className="block text-lg font-semibold mb-2 text-gray-700"
            >
              Subject
            </label>
            <select
              disabled={loading}
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            >
              <option value="" disabled>
                Select a Subject
              </option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Support">Support</option>
              <option value="Feedback">Feedback</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-lg font-semibold mb-2 text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            ></textarea>
          </div>

          {status && (
            <p
              className={`text-lg mt-4 font-semibold ${
                status.startsWith("Error") ? "text-red-500" : "text-green-500"
              }`}
            >
              {status}
            </p>
          )}

          <button
            disabled={loading}
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
