import { auth } from "@/middleware";
import { Router } from "express";
import { invitationController } from "./controller";

const invitationRouter = Router();

invitationRouter.get("/:_id", invitationController.getInvitation);
invitationRouter.post("/invite", auth(), invitationController.invitePlayer);
invitationRouter.post(
  "/:_id/accept",
  auth(),
  invitationController.acceptInvitation,
);

export { invitationRouter };
