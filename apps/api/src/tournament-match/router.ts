import { Router } from "express";
import { tournamentMatchController } from "./controller";

const tournamentMatchRouter = Router();

tournamentMatchRouter.get("/", tournamentMatchController.getTournamentMatches);
tournamentMatchRouter.get("/:_id", tournamentMatchController.getTournamentMatch);
tournamentMatchRouter.post("/", tournamentMatchController.createTournamentMatch);
tournamentMatchRouter.put("/:_id", tournamentMatchController.updateTournamentMatch);

export { tournamentMatchRouter };
