import {
  IInvitation,
  TAcceptInvitationParamsDefinition,
  TInvitePlayerInputDefinition,
} from "@spin-spot/models";
import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

export async function invitePlayer(input: TInvitePlayerInputDefinition) {
  const res = await api.post("/invitations/invite", { body: input });
  const invitation: IInvitation = await res.json();
  return invitation;
}

export function useInvitePlayer() {
  return useMutation({
    mutationKey: ["invitePlayer"],
    mutationFn: invitePlayer,
  });
}

export async function acceptInvitation({
  _id,
}: TAcceptInvitationParamsDefinition) {
  const res = await api.post(`/invitations/${_id}/accept`);
  const invitation: IInvitation = await res.json();
  return invitation;
}

export function useAcceptInvitation() {
  return useMutation({
    mutationKey: ["acceptInvitation"],
    mutationFn: acceptInvitation,
  });
}
