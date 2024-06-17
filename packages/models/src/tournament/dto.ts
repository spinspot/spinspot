import { Types, isValidObjectId } from "mongoose";
import z from "zod";
import {
  baseModelDefinition,
  eventTypeDefinition,
  statusTournamentTypeDefinition,
  tournamentFormatTypeDefinition,
  tournamentLevelTypeDefinition,
} from "../definitions";
import { ITeam } from "../team";
import { IUser } from "../user";

export const tournamentDefinition = baseModelDefinition.extend({
  name: z.string(),
  description: z.string(),
  owner: z.instanceof(Types.ObjectId).or(z.string().refine(isValidObjectId)),
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
  location: z.string(),
  tournamentType: tournamentLevelTypeDefinition,
  tournamentFormat: tournamentFormatTypeDefinition,
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
});

export type ITournament = z.infer<typeof tournamentDefinition>;
export type IPopulatedTournament = Omit<
  ITournament,
  "owner" | "players" | "teams"
> & {
  owner: IUser;
  players: IUser[];
  teams: ITeam[];
};

export const getTournamentsQueryDefinition = tournamentDefinition.partial();
export type TGetTournamentsQueryDefinition = z.infer<
  typeof getTournamentsQueryDefinition
>;

export const getTournamentParamsDefinition = tournamentDefinition.pick({
  _id: true,
});
export type TGetTournamentParamsDefinition = z.infer<
  typeof getTournamentParamsDefinition
>;

export const createTournamentInputDefinition = tournamentDefinition
  .omit({
    _id: true,
  })
  .refine(
    (data) => {
      if (data.eventType === "1V1") {
        if (
          data.players &&
          data.maxPlayers &&
          data.players.length < data.maxPlayers
        ) {
          return true;
        }
      }
      if (data.eventType === "2V2") {
        if (data.teams && data.maxTeams && data.teams.length < data.maxTeams) {
          return true;
        }
      }
      return true;
    },
    {
      message: "Registre los datos necesarios para el torneo",
      path: ["eventType", "teams", "players", "maxTeams", "maxPlayers"],
    },
  );
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
