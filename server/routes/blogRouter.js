import express from "express";
import Authorized from "../middlewares/authorized.js";
import {
  createBlog,
  deleteBlog,
  readBlog,
  updateBlog,
} from "../controllers/blogController.js";
const blog = express.Router();

blog.post("/admin/blog/create", Authorized, createBlog);
blog.get("/blog/read", readBlog);
blog.put("/admin/blog/update/:id", Authorized, updateBlog);
blog.delete("/admin/blog/delete/:id", Authorized, deleteBlog);
export default blog;
