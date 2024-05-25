import { Router } from "express";
import { bookingController } from "./controller";
import { auth } from "@/middleware";

const bookingRouter = Router();

bookingRouter.get("/", bookingController.getBookings);
bookingRouter.get("/:_id", bookingController.getBooking);
bookingRouter.post("/", auth(), bookingController.bookingWithUser);
bookingRouter.put("/:_id", bookingController.updateBooking);

export { bookingRouter};