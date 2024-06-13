import { Types, isValidObjectId } from "mongoose";
import z from "zod";
import { IPopulatedBooking } from "../booking";
import {
  baseModelDefinition,
  objectIdDefinition,
  timeBlockStatusDefinition,
} from "../definitions";
import { ITable } from "../table";

const timeBlockDefinition = baseModelDefinition.extend({
  table: z.instanceof(Types.ObjectId).or(z.string().refine(isValidObjectId)),
  booking: z
    .instanceof(Types.ObjectId)
    .or(z.string().refine(isValidObjectId))
    .nullish(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  status: timeBlockStatusDefinition,
});

export type ITimeBlock = z.infer<typeof timeBlockDefinition>;
export type IPopulatedTimeBlock = Omit<ITimeBlock, "booking" | "table"> & {
  table: ITable;
  booking: IPopulatedBooking;
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
  createTimeBlockInputDefinition,
);
export type TCreateTimeBlocksInputDefinition = z.infer<
  typeof createTimeBlocksInputDefinition
>;

export const createTimeBlocksFromTemplateInputDefinition = z.object({
  timeBlockTemplate: objectIdDefinition,
  startDate: z.string().date(),
  endDate: z.string().date(),
});
export type TCreateTimeBlocksFromTemplateInputDefinition = z.infer<
  typeof createTimeBlocksFromTemplateInputDefinition
>;

export const createTimeBlocksFromActiveTemplatesInputDefinition = z.object({
  startDate: z.string().date().optional(),
  endDate: z.string().date().optional(),
});
export type TCreateTimeBlocksFromActiveTemplatesInputDefinition = z.infer<
  typeof createTimeBlocksFromActiveTemplatesInputDefinition
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
