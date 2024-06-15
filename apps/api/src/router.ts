import { Router } from "express";
import { authRouter } from "./auth";
import { bookingRouter } from "./booking";
import { tableRouter } from "./table";
import { timeBlockRouter } from "./time-block";
import { userRouter } from "./user";
import { tournamentRouter } from "./tournament";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/tables", tableRouter);
router.use("/time-blocks", timeBlockRouter);
router.use("/booking", bookingRouter);
router.use("/tournaments", tournamentRouter);

export { router };
