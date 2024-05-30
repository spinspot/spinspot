import { Types, isValidObjectId } from "mongoose";
import z from "zod";
import { IBooking } from "../booking";
import { baseModelDefinition, statusTimeTypeDefinition } from "../definitions";
import { ITable } from "../table";

const timeBlockDefinition = baseModelDefinition.extend({
  table: z.instanceof(Types.ObjectId).or(z.string().refine(isValidObjectId)),
  booking: z.instanceof(Types.ObjectId).or(z.string().refine(isValidObjectId)).optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  status: statusTimeTypeDefinition,
});

export type ITimeBlock = z.infer<typeof timeBlockDefinition>;
export type IPopulatedTimeBlock = Omit<ITimeBlock, "booking" | "table"> & {
  table: ITable;
  booking: IBooking;
};

export const getTimeBlocksQueryDefinition = timeBlockDefinition.partial();
export type TGetTimeBlocksQueryDefinition = z.infer<
  typeof getTimeBlocksQueryDefinition
>;

export const getTimeBlockParamsDefinition = timeBlockDefinition.pick({
  _id: true,
});
export type TGetTimeBlockParamsDefinition = z.infer<
  typeof getTimeBlockParamsDefinition
>;

export const createTimeBlockInputDefinition = timeBlockDefinition.omit({
  _id: true,
});
export type TCreateTimeBlockInputDefinition = z.infer<
  typeof createTimeBlockInputDefinition
>;

export const createTimeBlocksInputDefinition = z.array(
  timeBlockDefinition.omit({ _id: true }),
);
export type TCreateTimeBlocksInputDefinition = z.infer<
  typeof createTimeBlocksInputDefinition
>;

export const updateTimeBlockParamsDefinition = timeBlockDefinition.pick({
  _id: true,
});
export type TUpdateTimeBlockParamsDefinition = z.infer<
  typeof getTimeBlockParamsDefinition
>;

export const updateTimeBlockInputDefinition = timeBlockDefinition.partial();
export type TUpdateTimeBlockInputDefinition = z.infer<
  typeof updateTimeBlockInputDefinition
>;
