import mongoose from "mongoose";

let slideSchema = new mongoose.Schema(
  {
    title: String,
    url: String,
    description: String,
    id: String,
    fileName: String,
    cloudinaryUrl: String,
  },
  {
    timestamps: true,
  }
);

const slide =
  mongoose.models.slides || mongoose.model("slides", slideSchema, "slides");

export default slide;
