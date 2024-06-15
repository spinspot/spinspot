import { Schema } from "mongoose";
import { ITournament } from "./dto";


export const tournamentSchema = new Schema<ITournament>({
  name:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  players: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
  teams: {
    type: [Schema.Types.ObjectId],
    ref: "Team",
  },
  maxPlayers: Number,
  maxTeams: Number,
  prize: String,
  eventType: String, 
  status: String, 
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  }
});
