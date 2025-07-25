import mongoose from "mongoose";

let complainSchema = new mongoose.Schema(
  {
    tname: String,
    school: String,
    sis: String,
    email: String,
    mobile: String,
    complain: String,
    status: String,
    complainTime: Number,
    id: String,
    solvedOn: String,
    remarks: String,
  },
  {
    timestamps: true,
  }
);

const Complain =
  mongoose.models.complains ||
  mongoose.model("complains", complainSchema, "complains");

export default Complain;
