import { IBooking, TGetBookingParamsDefinition } from "@spin-spot/models";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export async function getBookings() {
  const res = await api.get("/timeblock/all");
  const timeBlocks: IBooking[] = await res.json();
  return timeBlocks;
}

export function useBookings() {
  return useQuery({ queryKey: ["getBookings"], queryFn: getBookings });
}

export async function getBooking(_id: TGetBookingParamsDefinition["_id"]) {
  const res = await api.get(`/booking/${encodeURIComponent(`${_id}`)}`);
  const booking: IBooking = await res.json();
  return booking;
}

export function useBooking(_id: TGetBookingParamsDefinition["_id"]) {
  return useQuery({
    queryKey: ["getBooking", _id],
    queryFn: () => getBooking(_id),
  });
}
