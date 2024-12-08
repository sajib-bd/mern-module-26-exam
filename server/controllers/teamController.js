import mongoose from "mongoose";
import Team from "../models/teamModel.js";

export const teamCreate = async (req, res) => {
  try {
    const { name, role, bio, profileImageUrl } = req.body;
    if (!name || !role || !bio || !profileImageUrl) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const create = await Team.create({
      name,
      role,
      bio,
      profileImageUrl,
    });

    return res.status(201).json({
      message: "Team created successfully",
    });
  } catch (error) {}
};

export const teamRead = async (req, res) => {
  try {
    const team = await Team.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      team,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while processing the request.",
    });
  }
};

export const teamUpdate = async (req, res) => {
  const objectId = new mongoose.Types.ObjectId(req.params.id);
  const body = req.body;

  try {
    const update = await Team.findByIdAndUpdate({ _id: objectId }, body, {
      new: true,
    });
    return res.status(200).json({
      message: "Team updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while processing your request.",
    });
  }
};

export const teamDelete = async (req, res) => {
  const objectId = new mongoose.Types.ObjectId(req.params.id);

  try {
    const blog = await Team.findByIdAndDelete(objectId);
    return res.status(200).json({
      message: "Team deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while processing your request.",
    });
  }
};
