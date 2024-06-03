import { tableService } from "@/table";
import { timeBlockService } from "@/time-block";
import {
  createBookingInputDefinition,
  getBookingParamsDefinition,
  getBookingsQueryDefinition,
  updateBookingInputDefinition,
  updateBookingParamsDefinition,
} from "@spin-spot/models";
import { Request, Response } from "express";
import { bookingService } from "./service";

async function bookingWithUser(req: Request, res: Response) {
  const user = req.user;
  const reservationData = createBookingInputDefinition.parse(req.body);

  const timeBlock = await timeBlockService.getTimeBlock(
    reservationData.timeBlock,
  );

  if (user?._id?.toString() !== reservationData.owner) {
    return res
      .status(401)
      .json({ error: "You cannot create a booking for a different user" });
  }

  if (!timeBlock || !timeBlock.table || timeBlock.status !== "AVAILABLE") {
    return res.status(400).json({ error: "Time Block error while booking" });
  }

  const currentTime = new Date();
  if (currentTime > timeBlock.startTime) {
    return res.status(400).json({
      error:
        "Current time cannot be after the start time of the selected time block",
    });
  }

  const table = await tableService.getTable(timeBlock.table);

  if (!table || !table.isActive || reservationData.table !== `${table._id}`) {
    return res.status(400).json({ error: "Table error while booking" });
  }

  const uniquePlayers =
    new Set(reservationData.players?.map((player) => `${player}`)).size ===
    reservationData.players?.length;

  if (!uniquePlayers) {
    return res.status(400).json({ error: "Hay jugadores repetidos" });
  }

  const booking = await bookingService.createBooking({
    ...reservationData,
    owner: user!._id,
    table: table!._id,
  });

  await timeBlockService.updateTimeBlock(reservationData.timeBlock, {
    booking: booking._id,
  });

  await timeBlockService.updateTimeBlock(reservationData.timeBlock, {
    status: "BOOKED",
  });
  res.status(200).json(booking);
}

async function getBookings(req: Request, res: Response) {
  const query = getBookingsQueryDefinition.parse(req.query);
  const bookings = await bookingService.getBookings(query);
  return res.status(200).json(bookings);
}

async function getBooking(req: Request, res: Response) {
  const params = getBookingParamsDefinition.parse(req.params);
  const booking = await bookingService.getBooking(params._id);
  return res.status(200).json(booking);
}

async function updateBooking(req: Request, res: Response) {
  const params = updateBookingParamsDefinition.parse(req.params);
  const input = updateBookingInputDefinition.parse(req.body);
  const booking = await bookingService.updateBooking(params._id, input);
  return res.status(200).json(booking);
}

async function cancelBooking(req: Request, res: Response) {
  const params = updateBookingParamsDefinition.parse(req.params);

  const booking = await bookingService.updateBooking(params._id, {
    status: "FINISHED",
  });

  if (booking?.timeBlock) {
    await timeBlockService.updateTimeBlock(booking.timeBlock, {
      booking: null,
      status: "AVAILABLE",
    });
  } else {
    console.error("booking.timeBlock is undefined");
  }

  return res.status(200).json(booking);
}

export const bookingController = {
  bookingWithUser,
  getBookings,
  getBooking,
  updateBooking,
  cancelBooking,
} as const;
