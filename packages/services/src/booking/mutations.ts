import {
    IBooking,
    TCreateBookingInputDefinition,
    TUpdateBookingInputDefinition,
    TUpdateBookingParamsDefinition,
  } from "@spin-spot/models";
  import { useMutation, useQueryClient } from "@tanstack/react-query";
  import { api } from "../api";
  import { useAuth } from "../auth";
  
  export async function createBooking(input: TCreateBookingInputDefinition) {
    const res = await api.post("/booking", { body: input });
    const booking: IBooking = await res.json();
    return booking;
  }
  
  export function useCreateBooking() {
    return useMutation({ mutationKey: ["createBooking"], mutationFn: createBooking });
  }
  
  export async function updateBooking({
    _id,
    ...input
  }: {
    _id: TUpdateBookingParamsDefinition["_id"];
  } & TUpdateBookingInputDefinition) {
    const res = await api.put("/booking/" + encodeURIComponent(`${_id}`), { body: input });
    const booking: IBooking = await res.json();
    return booking;
  }
  
  export function useUpdateBooking() {
    const queryClient = useQueryClient();
    const { user } = useAuth();
  
    return useMutation({
      mutationKey: ["updateBooking"],
      mutationFn: updateBooking,
      onSuccess(data) {
        if (data.owner === user?._id) {
          queryClient.invalidateQueries({ queryKey: ["currentBooking"] });
        }
        queryClient.invalidateQueries({ queryKey: ["getBooking", data._id] });
      },
    });
  }

  export async function cancelBooking(_id: TUpdateBookingParamsDefinition["_id"]) {
    const res = await api.post(`/booking/${encodeURIComponent(`${_id}`)}/cancel`);
    const booking: IBooking = await res.json();
    return booking;
  }
  
  export function useCancelBooking() {
    const queryClient = useQueryClient();
    const { user } = useAuth();
  
    return useMutation({
      mutationKey: ["cancelBooking"],
      mutationFn: cancelBooking,
      onSuccess(data) {
        if (data.owner === user?._id) {
          queryClient.invalidateQueries({ queryKey: ["currentBooking"] });
        }
        queryClient.invalidateQueries({ queryKey: ["getBooking", data._id] });
        queryClient.invalidateQueries({ queryKey: ["getBookings"] });
        queryClient.invalidateQueries({ queryKey: ["getTimeBlocks"] });
      },
    });
  }
  