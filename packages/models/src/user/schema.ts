import { Schema } from "mongoose";
import { IUser } from "./dto";

export const userSchema = new Schema<IUser>(
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
