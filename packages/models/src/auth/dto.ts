import z from "zod";
import { passwordDefinition } from "../definitions";
import { IUser } from "../user";

export const signInInputDefinition = z.object({
  email: z.string().email(),
  password: passwordDefinition,
});
export type TSignInInputDefinition = z.infer<typeof signInInputDefinition>;

export type TSignInResponse = {
  user: IUser;
  jwt: string;
};

export type JwtPayload = Pick<
  IUser,
  "_id" | "email" | "firstName" | "lastName" | "userType"
>;
