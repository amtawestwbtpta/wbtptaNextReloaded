import mongoose from "mongoose";

let memoSchema = new mongoose.Schema(
  {
    photoName: String,
    url: String,
    addedBy: String,
    type: String,
    id: String,
    title: String,
    memoText: String,
    memoNumber: String,
    cloudinaryUrl: String,
    date: Number,
  },
  {
    timestamps: true,
  }
);

const Memo =
  mongoose.models.memos || mongoose.model("memos", memoSchema, "memos");

export default Memo;
