import { Router } from "express";
import { authRouter } from "./auth";
import { userRouter } from "./user";
import { tableRouter } from "./table";
import { timeBlockRouter } from "./timeBlock";
import { bookingRouter } from "./booking";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/table", tableRouter);
router.use("/timeblock", timeBlockRouter);
router.use("/booking", bookingRouter);

export { router };
