import z from "zod";
import { passwordDefinition } from "../definitions";

export const signInInputDefinition = z.object({
  email: z.string().email(),
  password: passwordDefinition,
});
