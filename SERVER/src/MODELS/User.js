import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      min: 4,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      min: 4,
    },
    password: {
      type: String,
      required: true,
      min: 4,
    },
  },
  {
    timestamps: true,
    collection: "User-Data",
  }
);
//INDEXES
UserSchema.index({ username: 1 });
UserSchema.index({ fullname: "text" });
const User = mongoose.model("User", UserSchema);

export default User;
