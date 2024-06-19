import {
  TCreateTeamInputDefinition,
  TGetTeamsQueryDefinition,
  TUpdateTeamInputDefinition,
  TUpdateTeamParamsDefinition,
  teamSchema,
} from "@spin-spot/models";
import { model } from "mongoose";

const Team = model("Team", teamSchema);

async function createTeam(data: TCreateTeamInputDefinition) {
  const team = await Team.create(data);
  return team;
}

async function getTeams(filter: TGetTeamsQueryDefinition = {}) {
  const teams = await Team.find(filter).populate(["players"]);
  return teams;
}

async function getTeam(_id: TGetTeamsQueryDefinition["_id"]) {
  const team = await Team.findById(_id);
  return team;
}

async function updateTeam(
  _id: TUpdateTeamParamsDefinition["_id"],
  data: TUpdateTeamInputDefinition,
) {
  const team = await Team.findByIdAndUpdate(_id, data, { new: true });
  return team;
}

export const teamService = {
  createTeam,
  getTeam,
  getTeams,
  updateTeam,
} as const;
