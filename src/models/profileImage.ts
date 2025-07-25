import mongoose from "mongoose";

let profileImageSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    fileName: String,
    url: String,
    id: String,
    cloudinaryUrl: String,
  },
  {
    timestamps: true,
  }
);

const profileImage =
  mongoose.models.profileImage ||
  mongoose.model("profileImage", profileImageSchema, "profileImage");

export default profileImage;
