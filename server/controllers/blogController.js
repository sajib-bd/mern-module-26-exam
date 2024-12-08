import mongoose from "mongoose";
import Blog from "../models/blogModel.js";

export const createBlog = async (req, res) => {
  const { title, author, content, imageUrl } = req.body;

  if (!title || !author || !content || !imageUrl) {
    return res.status(400).json({
      message: "All fields are required and cannot be empty",
    });
  }

  try {
    const blog = await Blog.create({
      title,
      author,
      content,
      imageUrl,
    });
    return res.status(201).json({
      message: "Blog created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred while processing your request.",
    });
  }
};

export const readBlog = async (req, res) => {
  try {
    const blog = await Blog.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while processing your request.",
    });
  }
};

export const updateBlog = async (req, res) => {
  const objectId = new mongoose.Types.ObjectId(req.params.id);
  const body = req.body;

  try {
    const update = await Blog.findByIdAndUpdate({ _id: objectId }, body, {
      new: true,
    });
    return res.status(200).json({
      message: "Blog updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while processing your request.",
    });
  }
};

export const deleteBlog = async (req, res) => {
  const objectId = new mongoose.Types.ObjectId(req.params.id);

  try {
    const blog = await Blog.findByIdAndDelete(objectId);
    return res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while processing your request.",
    });
  }
};
