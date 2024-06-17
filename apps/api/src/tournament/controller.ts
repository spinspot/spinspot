import {
  ApiError,
  createTeamInputDefinition,
  createTournamentInputDefinition,
  getTournamentParamsDefinition,
  getTournamentsQueryDefinition,
  updateTournamentInputDefinition,
  updateTournamentParamsDefinition,
} from "@spin-spot/models";
import { Request, Response } from "express";
import { tournamentService } from "./service";
import { teamService } from "@/team";

async function createTournament(req: Request, res: Response) {
  const tournamentData = createTournamentInputDefinition.parse(req.body);
  const currentTime = new Date();

  if (currentTime > tournamentData?.startTime) {
    throw new ApiError({
      status: 400,
      errors: [{ message: "Fecha invalida para crear el torneo" }],
    });
  }

  const tournament = await tournamentService.createTournament(tournamentData);
  res.status(200).json(tournament);
}

async function getTournaments(req: Request, res: Response) {
  const query = getTournamentsQueryDefinition.parse(req.query);
  const tournaments = await tournamentService.getTournaments(query);
  return res.status(200).json(tournaments);
}

async function getTournament(req: Request, res: Response) {
  const params = getTournamentParamsDefinition.parse(req.params);
  const tournament = await tournamentService.getTournament(params._id);
  return res.status(200).json(tournament);
}

async function updateTournament(req: Request, res: Response) {
  const params = updateTournamentParamsDefinition.parse(req.params);
  const input = updateTournamentInputDefinition.parse(req.body);
  const tournament = await tournamentService.updateTournament(
    params._id,
    input,
  );
  return res.status(200).json(tournament);
}

async function joinTournament(req: Request, res: Response) {
  const user = req.user;
  const params = updateTournamentParamsDefinition.parse(req.params);

  const tournament = await tournamentService.getTournament(params._id);

  if (user && tournament?.eventType === "1V1") {
    if (
      tournament.players &&
      tournament.maxPlayers &&
      tournament.players.length < tournament.maxPlayers &&
      !tournament.players.some(player => player.toString() === user._id.toString())
    ) {
      const updatePlayers = [...tournament.players, user._id];
      await tournamentService.updateTournament(params._id, {
        players: updatePlayers
      });
    } else {
      throw new ApiError({
        status: 400,
        errors: [{ message: "El jugador ya está en el torneo o se ha alcanzado el límite de participantes." }],
      });
    }
  }
  if (tournament?.eventType=="2V2"){
    const teamData = createTeamInputDefinition.parse(req.body);
    const team = await teamService.createTeam(teamData);
    
    if (
      team &&
      tournament.teams &&
      tournament.maxTeams &&
      tournament.teams.length < tournament.maxTeams &&
      !tournament.teams.some(teamArray => teamArray.toString() === team._id.toString())
    ) {
      const updateTeams = [...tournament.teams, team._id]
      await tournamentService.updateTournament(params._id, {
        teams: updateTeams
      });
    } else {
      throw new ApiError({
        status: 400,
        errors: [{ message: "El team ya está en el torneo o se ha alcanzado el límite de participantes." }],
      });
    }
  }
  return res.status(200).json(tournament);
}

export const tournamentController = {
  getTournament,
  getTournaments,
  updateTournament,
  createTournament,
  joinTournament
} as const;
