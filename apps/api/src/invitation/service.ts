import {
  IPopulatedInvitation,
  TCreateInvitationInputDefinition,
  TGetInvitationParamsDefinition,
  invitationSchema,
} from "@spin-spot/models";
import { model } from "mongoose";

const Invitation = model("Invitation", invitationSchema);

async function createInvitation(data: TCreateInvitationInputDefinition) {
  const invitation = await Invitation.create(data);
  return invitation;
}

async function getInvitation(_id: TGetInvitationParamsDefinition["_id"]) {
  const invitation = await Invitation.findById<IPopulatedInvitation>(
    _id,
  ).populate([
    "from",
    {
      path: "booking",
      populate: [
        "owner",
        "players",
        "table",
        {
          path: "timeBlock",
          populate: "table",
        },
      ],
    },
  ]);
  return invitation;
}

export const invitationService = {
  createInvitation,
  getInvitation,
} as const;
