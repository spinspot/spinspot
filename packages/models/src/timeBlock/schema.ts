import { Schema } from "mongoose";
import { ITimeBlock } from "./dto";


export const timeSchema = new Schema<ITimeBlock>(
    {
        table:{
            type: Schema.Types.ObjectId,
            ref: 'Table',
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime:{
            type: String,
            required: true
        },
        status: String,
    }
);
  