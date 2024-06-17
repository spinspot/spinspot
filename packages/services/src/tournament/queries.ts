import { ITournament, TGetTournamentParamsDefinition } from "@spin-spot/models";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export async function getTournaments() {
  const res = await api.get("/tournaments");
  const tournaments: ITournament[] = await res.json();
  return tournaments;
}

export function useTournaments() {
  return useQuery({ queryKey: ["getTournaments"], queryFn: getTournaments });
}

export async function getTournament(
  _id: TGetTournamentParamsDefinition["_id"],
) {
  const res = await api.get(`/tournaments/${encodeURIComponent(`${_id}`)}`);
  const tournament: ITournament = await res.json();
  return tournament;
}

export function useTournament(_id: TGetTournamentParamsDefinition["_id"]) {
  return useQuery({
    queryKey: ["getTournament", _id],
    queryFn: () => getTournament(_id),
  });
}
