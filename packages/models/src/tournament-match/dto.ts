import { Types, isValidObjectId } from "mongoose";
import z from "zod";
import {
  baseModelDefinition,
  eventTypeDefinition,
  statusTypeDefinition,
  teamSideTypeDefinition
} from "../definitions";

export const tournamentMatchDefinition = baseModelDefinition.extend({
  tournament: z
  .instanceof(Types.ObjectId)
  .or(z.string().refine(isValidObjectId)),
  eventType: eventTypeDefinition,
  status: statusTypeDefinition,
  leftPlayer:  z
  .instanceof(Types.ObjectId)
  .or(z.string().refine(isValidObjectId)).optional(),
  rightPlayer:  z
  .instanceof(Types.ObjectId)
  .or(z.string().refine(isValidObjectId)).optional(),
  leftTeam:  z
  .instanceof(Types.ObjectId)
  .or(z.string().refine(isValidObjectId)).optional(),
  rightTeam:  z
  .instanceof(Types.ObjectId)
  .or(z.string().refine(isValidObjectId)).optional(),
  score: z.array(
    z.array(z.number()).length(2)
  ),
  winner: teamSideTypeDefinition,
  dateTime: z.coerce.date()
});

export type ITournamentMatch = z.infer<typeof tournamentMatchDefinition>;

export const getTournamentMatchesQueryDefinition = tournamentMatchDefinition.partial();
export type TGetTournamentMatchesQueryDefinition = z.infer<
  typeof getTournamentMatchesQueryDefinition
>;

export const getTournamentMatchParamsDefinition = tournamentMatchDefinition.pick({ _id: true });
export type TGetTournamentMatchParamsDefinition = z.infer<
  typeof getTournamentMatchParamsDefinition
>;

export const createTournamentMatchInputDefinition = tournamentMatchDefinition.omit({
  _id: true,
}).refine(
  (data) => {
    if (data.eventType === "1V1") {
      if(data.leftPlayer && data.rightPlayer && data.leftPlayer !== data.rightPlayer){
        return true;
      }
    } else if (data.eventType === "2V2") {
      if(data.leftTeam && data.rightTeam && data.leftTeam !== data.rightTeam){
        return true;
      }
    }
  },
  {
    message: "Registre todos los jugadores/equipos del partido y asegúrese de que no sean los mismos",
    path: ["eventType", "leftPlayer", "rightPlayer", "leftTeam", "rightTeam"],
  }
);

export type TCreateTournamentMatchInputDefinition = z.infer<
  typeof createTournamentMatchInputDefinition
>;

export const updateTournamentMatchParamsDefinition = tournamentMatchDefinition.pick({
  _id: true,
});
export type TUpdateTournamentMatchParamsDefinition = z.infer<
  typeof getTournamentMatchParamsDefinition
>;

export const updateTournamentMatchInputDefinition = tournamentMatchDefinition.partial();
export type TUpdateTournamentMatchInputDefinition = z.infer<
  typeof updateTournamentMatchInputDefinition
>;
