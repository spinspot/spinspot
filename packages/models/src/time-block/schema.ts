import { Schema } from "mongoose";
import { ITimeBlock } from "./dto";

export const timeBlockSchema = new Schema<ITimeBlock>({
  table: {
    type: Schema.Types.ObjectId,
    ref: "Table",
  },
  booking: {
    type: Schema.Types.ObjectId,
    ref: "Booking",
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  status: String,
});
