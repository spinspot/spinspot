import { Router } from "express";
import { timeBlockTemplateController } from "./controller";

const timeBlockTemplateRouter = Router();

timeBlockTemplateRouter.get(
  "/",
  timeBlockTemplateController.getTimeBlockTemplates,
);
timeBlockTemplateRouter.get(
  "/:_id",
  timeBlockTemplateController.getTimeBlockTemplate,
);
timeBlockTemplateRouter.post(
  "/",
  timeBlockTemplateController.createTimeBlockTemplate,
);
timeBlockTemplateRouter.put(
  "/:_id",
  timeBlockTemplateController.updateTimeBlockTemplate,
);

export { timeBlockTemplateRouter };
