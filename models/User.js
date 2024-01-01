import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age: Number,
});

export const User = mongoose.model("User", UserSchema);
