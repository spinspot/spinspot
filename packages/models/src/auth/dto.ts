import z from "zod";
import { passwordDefinition } from "../definitions";
import { IUser } from "../user";

export const signInInputDefinition = z.object({
  email: z.string().email(),
  password: passwordDefinition,
});
export type TSignInInputDefinition = z.infer<typeof signInInputDefinition>;

export type TSignInResponseDefinition = {
  user: IUser;
  jwt: string;
};
