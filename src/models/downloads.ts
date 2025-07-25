import mongoose from "mongoose";

let downloadSchema = new mongoose.Schema(
  {
    date: Number,
    url: String,
    originalFileName: String,
    id: String,
    fileName: String,
    fileType: String,
    addedBy: String,
    cloudinaryUrl: String,
  },
  {
    timestamps: true,
  }
);

const download =
  mongoose.models.downloads ||
  mongoose.model("downloads", downloadSchema, "downloads");

export default download;
