import {
  TCreateInvitationInputDefinition,
  TGetInvitationParamsDefinition,
  invitationSchema,
} from "@spin-spot/models";
import { model } from "mongoose";

const Invitation = model("Invitation", invitationSchema);

async function createInvitation(data: TCreateInvitationInputDefinition) {
  const team = await Invitation.create(data);
  return team;
}

async function getInvitation(_id: TGetInvitationParamsDefinition["_id"]) {
  const team = await Invitation.findById(_id);
  return team;
}

export const invitationService = {
  createInvitation,
  getInvitation,
} as const;
