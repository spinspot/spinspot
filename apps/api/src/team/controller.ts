import {
  createTeamInputDefinition,
  getTeamParamsDefinition,
  getTeamsByUserIdParamsDefinition,
  getTeamsQueryDefinition,
  updateTeamInputDefinition,
  updateTeamParamsDefinition,
} from "@spin-spot/models";
import { Request, Response } from "express";
import { teamService } from "./service";

async function createTeam(req: Request, res: Response) {
  const teamData = createTeamInputDefinition.parse(req.body);
  const team = await teamService.createTeam(teamData);
  res.status(200).json(team);
}

async function getTeams(req: Request, res: Response) {
  const query = getTeamsQueryDefinition.parse(req.query);
  const teams = await teamService.getTeams(query);
  return res.status(200).json(teams);
}

async function getTeam(req: Request, res: Response) {
  const params = getTeamParamsDefinition.parse(req.params);
  const team = await teamService.getTeam(params._id);
  return res.status(200).json(team);
}

async function getTeamByUser(req: Request, res: Response) {
  const param = getTeamsByUserIdParamsDefinition.parse(req.params);
  const team = await teamService.getTeamByUserId(param.players);
  return res.status(200).json(team);
}

async function updateTeam(req: Request, res: Response) {
  const params = updateTeamParamsDefinition.parse(req.params);
  const input = updateTeamInputDefinition.parse(req.body);
  const team = await teamService.updateTeam(params._id, input);
  return res.status(200).json(team);
}

export const teamController = {
  getTeam,
  getTeams,
  createTeam,
  updateTeam,
  getTeamByUser
} as const;
