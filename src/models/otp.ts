import mongoose from "mongoose";

let otpSchema = new mongoose.Schema(
  {
    email: String,
    code: String,
    expiresIn: Number,
  },
  {
    timestamps: true,
  }
);

const Otp = mongoose.models.otp || mongoose.model("otp", otpSchema, "otp");

export default Otp;
