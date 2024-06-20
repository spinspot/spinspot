import z from "zod";
import {
  baseModelDefinition,
  dayOfWeekDefinition,
  objectIdDefinition,
} from "../definitions";
import { ITable } from "../table";

const timeBlockTemplateDefinition = baseModelDefinition.extend({
  tables: z.array(objectIdDefinition),
  daysOfWeek: z.array(dayOfWeekDefinition),
  times: z.array(z.string().time()).describe("Horas de inicio de los bloques"),
  duration: z
    .number()
    .int()
    .positive()
    .describe("Duración del bloque en minutos"),
  isActive: z.boolean().optional(),
});

export type ITimeBlockTemplate = z.infer<typeof timeBlockTemplateDefinition>;
export type IPopulatedTimeBlockTemplate = Omit<ITimeBlockTemplate, "tables"> & {
  tables: ITable[];
};

export const getTimeBlockTemplatesQueryDefinition = timeBlockTemplateDefinition
  .extend({
    tables: objectIdDefinition.or(z.array(objectIdDefinition)),
  })
  .partial();
export type TGetTimeBlockTemplatesQueryDefinition = z.infer<
  typeof getTimeBlockTemplatesQueryDefinition
>;

export const getTimeBlockTemplateParamsDefinition =
  timeBlockTemplateDefinition.pick({
    _id: true,
  });
export type TGetTimeBlockTemplateParamsDefinition = z.infer<
  typeof getTimeBlockTemplateParamsDefinition
>;

export const createTimeBlockTemplateInputDefinition =
  timeBlockTemplateDefinition.omit({
    _id: true,
  });
export type TCreateTimeBlockTemplateInputDefinition = z.infer<
  typeof createTimeBlockTemplateInputDefinition
>;

export const updateTimeBlockTemplateParamsDefinition =
  timeBlockTemplateDefinition.pick({
    _id: true,
  });
export type TUpdateTimeBlockTemplateParamsDefinition = z.infer<
  typeof getTimeBlockTemplateParamsDefinition
>;

export const updateTimeBlockTemplateInputDefinition =
  timeBlockTemplateDefinition.partial();
export type TUpdateTimeBlockTemplateInputDefinition = z.infer<
  typeof updateTimeBlockTemplateInputDefinition
>;
