import { Router } from "express";
import { authRouter } from "./auth";
import { bookingRouter } from "./booking";
import { tableRouter } from "./table";
import { timeBlockRouter } from "./time-block";
import { timeBlockTemplateRouter } from "./time-block-template";
import { userRouter } from "./user";

const router = Router();

router.use("/auth", authRouter);
router.use("/booking", bookingRouter);
router.use("/users", userRouter);
router.use("/tables", tableRouter);
router.use("/time-blocks", timeBlockRouter);
router.use("/time-block-templates", timeBlockTemplateRouter);

export { router };
