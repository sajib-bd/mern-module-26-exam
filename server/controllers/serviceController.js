import mongoose from "mongoose";
import Service from "../models/serviceModel.js";

export const serviceCreate = async (req, res) => {
  try {
    const { name, description, imageUrl } = req.body;
    if (!name || !description || !imageUrl) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const create = await Service.create({
      name,
      description,
      imageUrl,
    });

    return res.status(201).json({
      message: "Service created successfully",
    });
  } catch (error) {}
};

export const serviceRead = async (req, res) => {
  try {
    const service = await Service.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      service,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while processing the request.",
    });
  }
};

export const serviceUpdate = async (req, res) => {
  const objectId = new mongoose.Types.ObjectId(req.params.id);
  const body = req.body;

  try {
    const update = await Service.findByIdAndUpdate({ _id: objectId }, body, {
      new: true,
    });
    return res.status(200).json({
      message: "Service updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while processing your request.",
    });
  }
};

export const serviceDelete = async (req, res) => {
  const objectId = new mongoose.Types.ObjectId(req.params.id);

  try {
    const blog = await Service.findByIdAndDelete(objectId);
    return res.status(200).json({
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while processing your request.",
    });
  }
};
