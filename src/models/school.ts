import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema(
  {
    id: String,
    school: String,
    udise: String,
    gp: String,
    student: Number,
    pp: Number,
    i: Number,
    ii: Number,
    iii: Number,
    iv: Number,
    v: Number,
    total_student: Number,
    year: Number,
  },
  {
    timestamps: true,
  }
);

const School =
  mongoose.models.school || mongoose.model("school", schoolSchema, "school");

export default School;
