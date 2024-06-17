import { Types, isValidObjectId } from "mongoose";
import z from "zod";
import { baseModelDefinition } from "../definitions";
import { IUser } from "../user";

export const teamDefinition = baseModelDefinition.extend({
  name: z.string(),
  players: z.array(
    z.instanceof(Types.ObjectId).or(z.string().refine(isValidObjectId)),
  ),
});

export type ITeam = z.infer<typeof teamDefinition>;
export type IPopulatedTeam = Omit<ITeam, "players"> & {
  players: IUser[];
};

export const getTeamsQueryDefinition = teamDefinition.partial();
export type TGetTeamsQueryDefinition = z.infer<typeof getTeamsQueryDefinition>;

export const getTeamParamsDefinition = teamDefinition.pick({ _id: true });
export type TGetTeamParamsDefinition = z.infer<typeof getTeamParamsDefinition>;

export const createTeamInputDefinition = teamDefinition.omit({
  _id: true,
});
export type TCreateTeamInputDefinition = z.infer<
  typeof createTeamInputDefinition
>;

export const updateTeamParamsDefinition = teamDefinition.pick({
  _id: true,
});
export type TUpdateTeamParamsDefinition = z.infer<
  typeof getTeamParamsDefinition
>;

export const updateTeamInputDefinition = teamDefinition.partial();
export type TUpdateTeamInputDefinition = z.infer<
  typeof updateTeamInputDefinition
>;
