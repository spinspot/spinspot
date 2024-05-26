import { Types, isValidObjectId } from "mongoose";
import z from "zod";
import {
  baseModelDefinition,
  eventTypeDefinition,
  statusTypeDefinition,
} from "../definitions";

const eventDefinition = baseModelDefinition.extend({
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
});

export type IBooking = z.infer<typeof eventDefinition>;

export const getBookingsQueryDefinition = eventDefinition.partial();
export type TGetBookingsQueryDefinition = z.infer<
  typeof getBookingsQueryDefinition
>;

export const getBookingParamsDefinition = eventDefinition.pick({ _id: true });
export type TGetBookingParamsDefinition = z.infer<
  typeof getBookingParamsDefinition
>;

export const createBookingInputDefinition = eventDefinition.omit({ _id: true });
export type TCreateBookingInputDefinition = z.infer<
  typeof createBookingInputDefinition
>;

export const updateBookingParamsDefinition = eventDefinition.pick({
  _id: true,
});
export type TUpdateBookingParamsDefinition = z.infer<
  typeof getBookingParamsDefinition
>;

export const updateBookingInputDefinition = eventDefinition.partial();
export type TUpdateBookingInputDefinition = z.infer<
  typeof updateBookingInputDefinition
>;
