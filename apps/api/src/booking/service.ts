import {
  TGetBookingParamsDefinition,
  TGetBookingsQueryDefinition,
  TUpdateBookingInputDefinition,
  TUpdateBookingParamsDefinition,
  bookingSchema,
  type TCreateBookingInputDefinition,
} from "@spin-spot/models";
import { model } from "mongoose";

const Booking = model("Booking", bookingSchema);

async function getBookings(filter: TGetBookingsQueryDefinition = {}) {
  const bookings = await Booking.find(filter).populate([
    "owner",
    "players",
    "table",
    {
      path: "timeBlock",
      populate: "table",
    },
  ]);
  return bookings;
}

async function getBooking(_id: TGetBookingParamsDefinition["_id"]) {
  const booking = await Booking.findById(_id).populate([
    "owner",
    "players",
    "table",
    {
      path: "timeBlock",
      populate: "table",
    },
  ]);
  return booking;
}

async function createBooking(data: TCreateBookingInputDefinition) {
  const booking = await Booking.create(data);
  return booking;
}

async function updateBooking(
  _id: TUpdateBookingParamsDefinition["_id"],
  data: TUpdateBookingInputDefinition,
) {
  const booking = await Booking.findByIdAndUpdate(_id, data).populate([
    "owner",
    "players",
  ]);
  return booking;
}

export const bookingService = {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
} as const;
