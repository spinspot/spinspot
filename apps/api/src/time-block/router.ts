import { Router } from "express";
import { timeBlockController } from "./controller";

const timeBlockRouter = Router();

timeBlockRouter.get("/all", timeBlockController.getTimeBlocks);
timeBlockRouter.get("/:_id", timeBlockController.getTimeBlock);
timeBlockRouter.post("/create-timeblock", timeBlockController.createTimeBlock);

export { timeBlockRouter };
