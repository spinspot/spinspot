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

export const signInWithGoogleInputDefinition = z.object({
  app: z.enum(["client", "admin"]),
  route: z.string(),
});
export type TSignInWithGoogleInputDefinition = z.infer<
  typeof signInWithGoogleInputDefinition
>;

export type TSignInResponse = {
  user: IUser;
  jwt: string;
};

export type JwtPayload = Pick<
  IUser,
  "_id" | "email" | "firstName" | "lastName" | "userType"
>;
