import { Schema } from "mongoose";
import { ITable } from "./dto";

export const tableSchema = new Schema<ITable>({
  code: {
    type: String,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
