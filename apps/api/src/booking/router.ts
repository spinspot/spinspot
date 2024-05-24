import { Router } from "express";
import { bookingController } from "./controller";

const bookingRouter = Router();

bookingRouter.get("/", bookingController.getBookings);
bookingRouter.get("/:_id", bookingController.getBooking);
bookingRouter.post("/", bookingController.bookingWithUser);
bookingRouter.put("/:_id", bookingController.updateBooking);

export { bookingRouter};