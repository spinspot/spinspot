import { Schema } from "mongoose";
import { ITimeBlockTemplate } from "./dto";

export const timeBlockTemplateSchema = new Schema<ITimeBlockTemplate>({
  tables: [
    {
      type: Schema.Types.ObjectId,
      ref: "Table",
    },
  ],
  times: [
    {
      type: String,
      required: true,
    },
  ],
  daysOfWeek: [
    {
      type: String,
      required: true,
    },
  ],
  duration: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
