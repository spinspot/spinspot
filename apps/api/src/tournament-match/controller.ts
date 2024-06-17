import {
   createTournamentMatchInputDefinition, 
   getTournamentMatchParamsDefinition, 
   getTournamentMatchesQueryDefinition, 
   updateTournamentMatchInputDefinition, 
   updateTournamentMatchParamsDefinition, 
  } from "@spin-spot/models";
import { Request, Response } from "express";
import { tournamentMatchService } from "./service";

async function createTournamentMatch(req: Request, res: Response) {
  const tournamentMatchData = createTournamentMatchInputDefinition.parse(req.body);  
  const tournamentMatch = await tournamentMatchService.createTournamentMatch(tournamentMatchData);
  res.status(200).json(tournamentMatch);

}

async function getTournamentMatches(req: Request, res: Response) {
  const query = getTournamentMatchesQueryDefinition.parse(req.query);
  const tournamentMatches = await tournamentMatchService.getTournamentMatches(query);
  return res.status(200).json(tournamentMatches);
}

async function getTournamentMatch(req: Request, res: Response) {
  const params = getTournamentMatchParamsDefinition.parse(req.params);
  const tournamentMatch = await tournamentMatchService.getTournamentMatch(params._id);
  return res.status(200).json(tournamentMatch);
}

async function updateTournamentMatch(req: Request, res: Response) {
  const params = updateTournamentMatchParamsDefinition.parse(req.params);
  const input = updateTournamentMatchInputDefinition.parse(req.body);
  const tournamentMatch = await tournamentMatchService.updateTournamentMatch(params._id, input);
  return res.status(200).json(tournamentMatch);
}

export const tournamentMatchController = {
  createTournamentMatch,
  getTournamentMatches,
  getTournamentMatch,
  updateTournamentMatch
} as const;
