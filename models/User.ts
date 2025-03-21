import mongoose, { Schema, models } from "mongoose";

const requestSchema = new Schema({
  amount: { type: Number, required: true },
  from: { type: String, required: true }, // Requester's VPA
  to: { type: String, required: true }, // Requestee's VPA
  timestamp: { type: Date, default: Date.now },
});

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  VPA: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  branch: { type: String, required: true },
  accountNumber: { type: String, required: true },
  money: { type: Number, required: true },
  debits: [{ amount: Number, to: String, timestamp: Date }], // Track outgoing transactions
  credits: [{ amount: Number, from: String, timestamp: Date }], // Track incoming transactions
  requests: [requestSchema], // Track money requests
}, { timestamps: true });

const User = models.User || mongoose.model("User", userSchema);
export default User;