import { Types } from "mongoose";
import z from "zod";

export const baseModelDefinition = z.object({
  _id: z.instanceof(Types.ObjectId).or(z.string()),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const genderDefinition = z.enum(["MALE", "FEMALE", "OTHER"]);
export type TGenderEnum = z.infer<typeof genderDefinition>;

export const userTypeDefinition = z.enum(["PLAYER", "ADMIN"]);
export type TUserTypeEnum = z.infer<typeof userTypeDefinition>;

export const passwordDefinition = z
  .string()
  .regex(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/, {
    message:
      "La contraseña debe incluir al menos una letra minúscula, una letra mayúscula y un número.",
  });
