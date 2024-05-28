import { ITable, TGetTableParamsDefinition } from "@spin-spot/models";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export async function getTables() {
  const res = await api.get("/tables");
  const tables: ITable[] = await res.json();
  return tables;
}

export function useTables() {
  return useQuery({ queryKey: ["getTables"], queryFn: getTables });
}

export async function getTable(_id: TGetTableParamsDefinition["_id"]) {
  const res = await api.get("/table/" + encodeURIComponent(`${_id}`));
  const table: ITable = await res.json();
  return table;
}

export function useTable(_id: TGetTableParamsDefinition["_id"]) {
  return useQuery({ queryKey: ["getTable", _id], queryFn: () => getTable(_id) });
}


