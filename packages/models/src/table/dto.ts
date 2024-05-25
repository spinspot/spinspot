import z from "zod";
import { baseModelDefinition } from "../definitions";
import { userDefinition } from "../user";

const tableDefinition = baseModelDefinition.extend({
  code: z.string(),
  isActive: z.boolean(),
});

export type ITable = z.infer<typeof tableDefinition>;

export const getTablesQueryDefinition = tableDefinition.partial();
export type TGetTablesQueryDefinition = z.infer<
  typeof getTablesQueryDefinition
>;

export const getTableParamsDefinition = tableDefinition.pick({ _id: true });
export type TGetTableParamsDefinition = z.infer<
  typeof getTableParamsDefinition
>;

export const createTableInputDefinition = tableDefinition.omit({ _id: true });
export type TCreateTableInputDefinition = z.infer<
  typeof createTableInputDefinition
>;

export const updateTableParamsDefinition = tableDefinition.pick({ _id: true });
export type TUpdateTableParamsDefinition = z.infer<
  typeof getTableParamsDefinition
>;

export const updateTableInputDefinition = userDefinition.partial();
export type TUpdateTableInputDefinition = z.infer<
  typeof updateTableInputDefinition
>;
