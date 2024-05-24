import { TCreateTableInputDefinition, TGetTablesQueryDefinition, tableSchema } from "@spin-spot/models";
import { model } from "mongoose";

const Table = model("Table", tableSchema);

async function getTables(filter: TGetTablesQueryDefinition = {}) {
  const tables = await Table.find(filter);
  return tables;
}

async function getTable(_id: TGetTablesQueryDefinition["_id"]) {
  const table = await Table.findById(_id);
  return table;
}

async function createTable(data: TCreateTableInputDefinition) {
  const table = await Table.create(data);
  return table;
}

export const tableService = {
  getTables,
  getTable,
  createTable
} as const;
