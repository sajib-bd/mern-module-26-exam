import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const BlogSection = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [blogs, setBlogs] = useState(null);

  const blogsSlice = blogs
    ? location.pathname === "/"
      ? blogs.slice(0, 6)
      : blogs
    : [];

  const handleReadMore = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  useEffect(() => {
    (async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/blog/read`;
        const response = await axios(url);
        setBlogs(response.data.blog);
      } catch (error) {}
    })();
  }, []);

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Latest Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs === null ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 p-4 rounded-lg shadow animate-pulse"
              >
                <div className="w-full h-40 bg-gray-300 rounded-md mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))
          ) : blogs.length == 0 ? (
            <p className="text-xl font-semibold text-center text-gray-700  p-4 rounded-lg shadow-md">
              No blogs available at the moment.
            </p>
          ) : (
            blogsSlice.map((blog) => (
              <div key={blog._id} className="bg-white p-4 rounded-lg shadow-lg">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-40  rounded-md"
                />
                <h3 className="mt-4 text-lg font-bold">{blog.title}</h3>
                <p className="text-xs text-gray-500">By {blog.author}</p>
                <button
                  onClick={() => handleReadMore(blog)}
                  className="text-blue-500 hover:underline mt-2 inline-block"
                >
                  Read More →
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      {location.pathname === "/blogs" ? (
        ""
      ) : blogs != null ? (
        blogs.length > 6 ? (
          <div className="w-full flex justify-center mt-10">
            <Link to="/blogs">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-lg font-bold shadow-md hover:from-indigo-600 hover:to-blue-500 hover:shadow-lg transition-transform transform hover:-translate-y-1 focus:ring-4 focus:ring-blue-300">
                Read More
              </button>
            </Link>
          </div>
        ) : (
          ""
        )
      ) : (
        ""
      )}

      {/* Full-screen Modal */}
      {isModalOpen && selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 w-11/12 md:w-3/4 lg:w-1/2 h-4/5 overflow-y-auto rounded-lg relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 font-bold text-xl"
            >
              X
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedBlog.title}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              By {selectedBlog.author}
            </p>
            <div className="mb-4 w-full">
              <img
                src={selectedBlog.imageUrl}
                alt={selectedBlog.title}
                className="w-full h-auto sm:h-48 md:h-80 lg:h-[300px] rounded-md"
              />
            </div>

            <p className="text-lg text-gray-700">{selectedBlog.content}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogSection;
