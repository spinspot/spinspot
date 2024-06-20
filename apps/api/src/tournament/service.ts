import {
  IPopulatedTournament,
  TCreateTournamentInputDefinition,
  TGetTournamentsQueryDefinition,
  TUpdateTournamentInputDefinition,
  TUpdateTournamentParamsDefinition,
  tournamentSchema,
} from "@spin-spot/models";
import { model } from "mongoose";

const Tournament = model("Tournament", tournamentSchema);

async function createTournament(data: TCreateTournamentInputDefinition) {
  const tournament = await Tournament.create(data);
  return tournament;
}

async function getTournaments(filter: TGetTournamentsQueryDefinition = {}) {
  const tournaments = await Tournament.find(filter).populate([
    "players",
    {
      path: "teams",
      populate: {
        path: "players",
      },
    },
  ]);
  return tournaments;
}

async function getTournament(_id: TGetTournamentsQueryDefinition["_id"]) {
  const tournament = await Tournament.findById<IPopulatedTournament>(
    _id,
  ).populate([
    "players",
    {
      path: "teams",
      populate: {
        path: "players",
      },
    },
  ]);
  return tournament;
}

async function updateTournament(
  _id: TUpdateTournamentParamsDefinition["_id"],
  data: TUpdateTournamentInputDefinition,
) {
  const tournament = await Tournament.findByIdAndUpdate(_id, data, {
    new: true,
  });
  return tournament;
}

export const tournamentService = {
  createTournament,
  getTournament,
  getTournaments,
  updateTournament,
} as const;
