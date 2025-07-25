import mongoose from "mongoose";

let noticeSchema = new mongoose.Schema(
  {
    photoName: String,
    url: String,
    addedBy: String,
    type: String,
    id: String,
    title: String,
    noticeText: String,
    cloudinaryUrl: String,
    date: Number,
  },
  {
    timestamps: true,
  }
);

const Notice =
  mongoose.models.notices || mongoose.model("notices", noticeSchema, "notices");

export default Notice;
