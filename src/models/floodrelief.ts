import mongoose from "mongoose";

let floodreliefSchema = new mongoose.Schema(
  {
    name: String,
    amount: Number,
    bank: String,
    id: String,
    date: String,
    sl: Number,
  },
  {
    timestamps: true,
  }
);

const FloodRelief =
  mongoose.models.floodrelief ||
  mongoose.model("floodrelief", floodreliefSchema, "floodrelief");

export default FloodRelief;
