import { IBooking, TGetBookingParamsDefinition } from "@spin-spot/models";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export async function getBookings() {
  const res = await api.get("/timeblock/all");
  const timeBlocks: IBooking[] = await res.json();
  return timeBlocks;
}

export function useBookings() {
  return useQuery({ queryKey: ["getTimeBlocks"], queryFn: getBookings });
}

export async function getTimeBlock(_id: TGetBookingParamsDefinition["_id"]) {
  const res = await api.get(`/timeblock/${encodeURIComponent(`${_id}`)}`);
  const timeBlock: IBooking = await res.json();
  return timeBlock;
}

export function useTimeBlock(_id: TGetBookingParamsDefinition["_id"]) {
  return useQuery({
    queryKey: ["getTimeBlock", _id],
    queryFn: () => getTimeBlock(_id),
  });
}
