import { Schema } from "mongoose";
import { ITournamentMatch } from "./dto";

export const tournamentMatchSchema = new Schema<ITournamentMatch>({
  tournament: {
    type: Schema.Types.ObjectId,
    ref: "Tournament",
    required: true,
  },
  eventType: String,
  status: String,
  leftPlayer: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  rightPlayer:{
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  leftTeam:{
    type: Schema.Types.ObjectId,
    ref: "Team"
  },
  rightTeam:{
    type: Schema.Types.ObjectId,
    ref: "Team"
  },
  score:{
    type:[[Number]],
    required: true
  },
  winner: String,
  dateTime: {
    type: Date,
    required: true,
  }
});
