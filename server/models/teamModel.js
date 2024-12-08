import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    profileImageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Team = mongoose.model("Team", teamSchema);
export default Team;
