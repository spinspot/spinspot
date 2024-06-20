import {
  IPopulatedInvitation,
  TGetInvitationParamsDefinition,
} from "@spin-spot/models";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export async function getInvitation(
  _id: TGetInvitationParamsDefinition["_id"],
) {
  const res = await api.get(`/invitations/${encodeURIComponent(`${_id}`)}`);
  const invitation: IPopulatedInvitation = await res.json();
  return invitation;
}

export function useInvitation(_id: TGetInvitationParamsDefinition["_id"]) {
  return useQuery({
    queryKey: ["getInvitation", _id],
    queryFn: () => getInvitation(_id),
  });
}
