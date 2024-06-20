import { Schema } from "mongoose";
import mongooseUniqueValidator from "../mongoose-unique-validator";
import { ITable } from "./dto";

export const tableSchema = new Schema<ITable>(
  {
    code: {
      type: String,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);
tableSchema.plugin(mongooseUniqueValidator);
