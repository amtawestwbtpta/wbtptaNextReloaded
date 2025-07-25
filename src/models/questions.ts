import mongoose from "mongoose";

let questionSchema = new mongoose.Schema(
  {
    id: String,
    sl: Number,
    school: String,
    gp: String,
    udise: String,
    cl_pp_student: Number,
    cl_1_student: Number,
    cl_2_student: Number,
    cl_3_student: Number,
    cl_4_student: Number,
    cl_5_student: Number,
    payment: Number,
    paid: String,
    total_student: Number,
    total_rate: Number,
  },
  {
    timestamps: true,
  }
);

const Question =
  mongoose.models.questions ||
  mongoose.model("questions", questionSchema, "questions");

export default Question;
