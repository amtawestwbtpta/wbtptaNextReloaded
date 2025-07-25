import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    teachersID: String, 
    id: String, 
    tname: String,
    school: String,
    udise: Number,
    desig: String,
    circle: String,
    empid: String,
    pan: String,
    photoName: String,
    url: String,
    question: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      select: true,
    },
  },
  {
    timestamps: true,
  }
);

const User =
  mongoose.models.userteacher ||
  mongoose.model("userteacher", userSchema, "userteacher");

export default User;
