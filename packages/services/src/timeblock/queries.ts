import { ITimeBlock, TGetTimeBlockParamsDefinition } from "@spin-spot/models";
import { useQuery} from "@tanstack/react-query";
import { api } from "../api";

export async function getTimeBlocks() {
  const res = await api.get("/timeblock/all");
  const timeBlocks: ITimeBlock[] = await res.json();
  return timeBlocks;
}

export function useTimeBlocks() {
  return useQuery({ queryKey: ["getTimeBlocks"], queryFn: getTimeBlocks });
}

export async function getTimeBlock(_id: TGetTimeBlockParamsDefinition["_id"]) {
  const res = await api.get(`/timeblock/${encodeURIComponent(`${_id}`)}`);
  const timeBlock: ITimeBlock = await res.json();
  return timeBlock;
}

export function useTimeBlock(_id: TGetTimeBlockParamsDefinition["_id"]) {
  return useQuery({ queryKey: ["getTimeBlock", _id], queryFn: () => getTimeBlock(_id) });
}
