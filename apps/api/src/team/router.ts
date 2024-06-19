import { Router } from "express";
import { teamController } from "./controller";

const teamRouter = Router();

teamRouter.get("/", teamController.getTeams);
teamRouter.get("/:_id", teamController.getTeam);
teamRouter.post("/", teamController.createTeam);
teamRouter.put("/:_id", teamController.updateTeam);
teamRouter.get("/:_id/byUser",teamController.getTeamByUser);

export { teamRouter };
