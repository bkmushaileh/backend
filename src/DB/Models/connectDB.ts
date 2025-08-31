import { connect } from "mongoose";
import { env } from "./config";

const connectDB = async () => {
  try {
    const { connection } = await connect(env.DB_URL);
    console.log(`MongoDB connected: ${connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
