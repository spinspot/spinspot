import { Router } from "express";
import { timeBlockController } from "./controller";

const timeBlockRouter = Router();

timeBlockRouter.get("/", timeBlockController.getTimeBlocks);
timeBlockRouter.get("/:_id", timeBlockController.getTimeBlock);
timeBlockRouter.post("/", timeBlockController.createTimeBlock);
timeBlockRouter.put("/:_id", timeBlockController.updateTimeBlock);

export { timeBlockRouter };
