import { Types, isValidObjectId } from "mongoose";
import z from "zod";
import {
  baseModelDefinition,
  eventTypeDefinition,
  statusTypeDefinition,
} from "../definitions";
import { IUser } from "../user";

export const bookingDefinition = baseModelDefinition.extend({
  eventType: eventTypeDefinition,
  owner: z
    .instanceof(Types.ObjectId)
    .or(z.string().refine(isValidObjectId))
    .optional(),
  table: z.instanceof(Types.ObjectId).or(z.string().refine(isValidObjectId)),
  players: z
    .array(z.instanceof(Types.ObjectId).or(z.string().refine(isValidObjectId)))
    .optional(),
  timeBlock: z
    .instanceof(Types.ObjectId)
    .or(z.string().refine(isValidObjectId)),
  status: statusTypeDefinition,
  equipment: z.boolean().optional(),
});

export type IBooking = z.infer<typeof bookingDefinition>;
export type IPopulatedBooking = Omit<IBooking, "players"> & {
  players: IUser[];
};

export const getBookingsQueryDefinition = bookingDefinition.partial();
export type TGetBookingsQueryDefinition = z.infer<
  typeof getBookingsQueryDefinition
>;

export const getBookingParamsDefinition = bookingDefinition.pick({ _id: true });
export type TGetBookingParamsDefinition = z.infer<
  typeof getBookingParamsDefinition
>;

export const createBookingInputDefinition = bookingDefinition.omit({
  _id: true,
});
export type TCreateBookingInputDefinition = z.infer<
  typeof createBookingInputDefinition
>;

export const updateBookingParamsDefinition = bookingDefinition.pick({
  _id: true,
});
export type TUpdateBookingParamsDefinition = z.infer<
  typeof getBookingParamsDefinition
>;

export const updateBookingInputDefinition = bookingDefinition.partial();
export type TUpdateBookingInputDefinition = z.infer<
  typeof updateBookingInputDefinition
>;
