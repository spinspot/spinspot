import { ITimeBlock, TGetTimeBlockParamsDefinition } from "@spin-spot/models";
import { useQuery} from "@tanstack/react-query";
import { api } from "../api";

export async function getTimeBlocks(params?: { tableCode?: string }) {
  const query = new URLSearchParams(params).toString();
  const res = await api.get(`/time-blocks?${query}`);
  const timeBlocks: ITimeBlock[] = await res.json();
  return timeBlocks;
}

export function useTimeBlocks(tableCode?: string) {
  return useQuery({
    queryKey: ["getTimeBlocks", tableCode],
    queryFn: () => getTimeBlocks({ tableCode }),
  });
}

export async function getTimeBlock(_id: TGetTimeBlockParamsDefinition["_id"]) {
  const res = await api.get(`/time-block/${encodeURIComponent(`${_id}`)}`);
  const timeBlock: ITimeBlock = await res.json();
  return timeBlock;
}

export function useTimeBlock(_id: TGetTimeBlockParamsDefinition["_id"]) {
  return useQuery({ queryKey: ["getTimeBlock", _id], queryFn: () => getTimeBlock(_id) });
}
