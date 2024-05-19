import z from "zod";
import { passwordDefinition } from "../definitions";
import { IUser } from "../user";

export const signInWithCredentialsInputDefinition = z.object({
  email: z.string().email(),
  password: passwordDefinition,
});
export type TSignInWithCredentialsInputDefinition = z.infer<
  typeof signInWithCredentialsInputDefinition
>;

export const signInWithGoogleQueryDefinition = z.object({
  app: z.enum(["client", "admin"]),
  route: z.string(),
});
export type TSignInWithGoogleQueryDefinition = z.infer<
  typeof signInWithGoogleQueryDefinition
>;

export type TSignInWithCredentialsResponse = {
  user: IUser;
};

export type JwtPayload = Pick<
  IUser,
  "_id" | "email" | "firstName" | "lastName" | "userType"
>;
