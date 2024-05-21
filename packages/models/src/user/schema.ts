import { Schema } from "mongoose";
import { IUser } from "./dto";

export const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
    },
    password: String,
    googleId: String,
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    gender: String,
    userType: {
      type: String,
      default: "PLAYER",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);
