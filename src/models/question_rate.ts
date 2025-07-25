import mongoose from "mongoose";

let question_rateSchema = new mongoose.Schema(
  {
    id: String,
    pp_rate: Number,
    i_rate: Number,
    ii_rate: Number,
    iii_rate: Number,
    iv_rate: Number,
    v_rate: Number,
    term: String,
    year: Number,
    isAccepting: Boolean,
  },
  {
    timestamps: true,
  }
);

const Question_rate =
  mongoose.models.question_rates ||
  mongoose.model("question_rate", question_rateSchema, "question_rate");

export default Question_rate;
