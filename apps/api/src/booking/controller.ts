import {
    createBookingInputDefinition,
    getBookingParamsDefinition,
    getBookingsQueryDefinition,
    statusTimeTypeDefinition,
    updateBookingInputDefinition,
    updateBookingParamsDefinition,
} from "@spin-spot/models";
import { Request, Response } from "express";
import { bookingService } from "./service";
import { timeBlockService } from "@/timeBlock";
import { tableService } from "@/table";


async function bookingWithUser(req: Request, res: Response) {
  try{
    const user = req.user;
    const reservationData = createBookingInputDefinition.parse(req.body);
  
    const timeBlock = await timeBlockService.getTimeBlock(reservationData.timeBlock);
    
    if (!timeBlock || !timeBlock.table) {
      return res.status(400).json({ error: 'The timeBlock does not have a table associated' });
    }
  
    const table = await tableService.getTable(timeBlock.table);
  
    if (!table || !table.isActive || timeBlock.status !== statusTimeTypeDefinition.Enum.Available) {
      return res.status(400).json({ error: 'The table is not available for booking' });
    }
    const booking = await bookingService.createBooking({
      ...reservationData,
      owner: user!._id,
      table: table._id,
    });

    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the booking' });
  }
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
  const user = await bookingService.updateBooking(params._id, input);
  return res.status(200).json(user);
}

export const bookingController = {
  bookingWithUser,
  getBookings,
  getBooking,
  updateBooking
} as const;




