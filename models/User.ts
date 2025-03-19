import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  VPA: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  branch: { type: String, required: true },
  accountNumber: { type: String, required: true, unique: true },
  money: { type: Number, required: true },
}, { timestamps: true });

const User = models.User || mongoose.model("User", userSchema);
export default User;