import { Schema } from "mongoose";
import { IInvitation } from "./dto";

export const invitationSchema = new Schema<IInvitation>(
  {
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    booking: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
    },
    status: {
      type: String,
      default: "PENDING",
    },
  },
  { timestamps: true },
);
