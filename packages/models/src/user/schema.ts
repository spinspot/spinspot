import { Schema } from "mongoose";

export const userSchema = new Schema(
  {
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    gender: String,
    userType: String,
    isActive: Boolean,
  },
  { timestamps: true },
);
