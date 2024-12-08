import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/home";
import Layout from "./layout/layout";
import Blog from "./pages/blog";
import Service from "./pages/service";
import About from "./pages/about";
import Contact from "./pages/contact";
import Dashboard from "./pages/admin/dashboard";
import AdminLogin from "./pages/admin/adminLogin";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  { path: "/blogs", element: <Blog /> },
  { path: "/services", element: <Service /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/admin/login", element: <AdminLogin /> },
  {
    path: "/admin/dashboard",
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
]);
const App = () => {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
