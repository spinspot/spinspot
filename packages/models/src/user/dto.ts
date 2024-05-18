import z from "zod";
import {
  baseModelDefinition,
  genderDefinition,
  passwordDefinition,
  userTypeDefinition,
} from "../definitions";

export const userDefinition = baseModelDefinition.extend({
  email: z.string().email(),
  password: passwordDefinition,
  firstName: z.string(),
  lastName: z.string(),
  gender: genderDefinition,
  userType: userTypeDefinition,
  isActive: z.boolean().optional(),
});
export type IUser = z.infer<typeof userDefinition>;

export const getUsersQueryDefinition = userDefinition
  .omit({ password: true })
  .partial();
export type TGetUsersQueryDefinition = z.infer<typeof getUsersQueryDefinition>;

export const getUserParamsDefinition = userDefinition.pick({ _id: true });
export type TGetUserParamsDefinition = z.infer<typeof getUserParamsDefinition>;

export const createUserInputDefinition = userDefinition.omit({ _id: true });
export type TCreateUserInputDefinition = z.infer<
  typeof createUserInputDefinition
>;

export const updateUserParamsDefinition = userDefinition.pick({ _id: true });
export type TUpdateUserParamsDefinition = z.infer<
  typeof getUserParamsDefinition
>;

export const updateUserInputDefinition = userDefinition.partial();
export type TUpdateUserInputDefinition = z.infer<
  typeof updateUserInputDefinition
>;
