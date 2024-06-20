import { Schema } from "mongoose";
import { ITeam } from "./dto";

export const teamSchema = new Schema<ITeam>({
  name: {
    type: String,
    required: true,
  },
  players: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
});
