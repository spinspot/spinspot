import {
  TCreateTournamentMatchInputDefinition, 
  TGetTournamentMatchesQueryDefinition, 
  TUpdateTournamentMatchInputDefinition,  
  TUpdateTournamentMatchParamsDefinition,
  tournamentMatchSchema
} from "@spin-spot/models";
import { model } from "mongoose";

const TournamentMatch = model("TournamentMatch", tournamentMatchSchema);

async function createTournamentMatch(data: TCreateTournamentMatchInputDefinition) {
  const tournamentMatch = await TournamentMatch.create(data);
  return tournamentMatch;
}

async function getTournamentMatches(filter: TGetTournamentMatchesQueryDefinition = {}) {
  const tournamentMatches = await TournamentMatch.find(filter);
  return tournamentMatches;
}

async function getTournamentMatch(_id: TGetTournamentMatchesQueryDefinition["_id"]) {
  const tournamentMatch = await TournamentMatch.findById(_id);
  return tournamentMatch;
}

async function updateTournamentMatch(
  _id: TUpdateTournamentMatchParamsDefinition["_id"],
  data: TUpdateTournamentMatchInputDefinition,
) {
  const tournamentMatch = await TournamentMatch.findByIdAndUpdate(_id, data, { new: true });
  return tournamentMatch;
}

export const tournamentMatchService = {
  createTournamentMatch,
  getTournamentMatch,
  getTournamentMatches,
  updateTournamentMatch
} as const;
