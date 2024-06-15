import { Router } from "express";
import { tournamentController } from "./controller";

const tournamentRouter = Router();

tournamentRouter.get("/", tournamentController.getTournaments);
tournamentRouter.get("/:_id", tournamentController.getTournament);
tournamentRouter.post("/", tournamentController.createTournament);
tournamentRouter.put("/:_id", tournamentController.updateTournament);

export { tournamentRouter };
