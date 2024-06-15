import { Types, isValidObjectId } from "mongoose";
import z from "zod";
import {
  baseModelDefinition,
  eventTypeDefinition,
  statusTournamentTypeDefinition
} from "../definitions";
import { IUser } from "../user";
import { ITeam } from "../team";

export const tournamentDefinition = baseModelDefinition.extend({
  name: z.string(),
  description: z.string(),
  owner: z
    .instanceof(Types.ObjectId)
    .or(z.string().refine(isValidObjectId)),
  players: z
    .array(z.instanceof(Types.ObjectId).or(z.string().refine(isValidObjectId)))
    .optional(),
  teams: z
    .array(z.instanceof(Types.ObjectId).or(z.string().refine(isValidObjectId)))
    .optional(),
  maxPlayers: z.number().optional(),
  maxTeams: z.number().optional(),
  prize: z.string(),
  eventType: eventTypeDefinition,
  status: statusTournamentTypeDefinition,
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
});

export type ITournament = z.infer<typeof tournamentDefinition>;
export type IPopulatedTournament = Omit<ITournament, 'players' | 'teams'> & {
  players: IUser[];
  teams: ITeam[];
};

export const getTournamentsQueryDefinition = tournamentDefinition.partial();
export type TGetTournamentsQueryDefinition = z.infer<
  typeof getTournamentsQueryDefinition
>;

export const getTournamentParamsDefinition = tournamentDefinition.pick({ _id: true });
export type TGetTournamentParamsDefinition = z.infer<
  typeof getTournamentParamsDefinition
>;

export const createTournamentInputDefinition = tournamentDefinition.omit({
  _id: true,
});
export type TCreateTournamentInputDefinition = z.infer<
  typeof createTournamentInputDefinition
>;

export const updateTournamentParamsDefinition = tournamentDefinition.pick({
  _id: true,
});
export type TUpdateTournamentParamsDefinition = z.infer<
  typeof getTournamentParamsDefinition
>;

export const updateTournamentInputDefinition = tournamentDefinition.partial();
export type TUpdateTournamentInputDefinition = z.infer<
  typeof updateTournamentInputDefinition
>;
