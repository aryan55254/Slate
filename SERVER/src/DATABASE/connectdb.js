import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectdb = async () => {
  try {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("Database Connected"));
  } catch (error) {
    console.log("Mongo DB connection error", error);
    process.exit(1);
  }
};
export default connectdb;
