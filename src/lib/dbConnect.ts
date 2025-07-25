import mongoose from "mongoose";

type ConnectionObjected = {
  isConnected?: number;
};

const connection: ConnectionObjected = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to Database");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI || "", {});
    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to Database");
  } catch (error) {
    console.log("Database Connection Failed", error);
    process.exit(1);
  }
}

export default dbConnect;
