import {
  ITournamentMatch,
  TGetTournamentMatchParamsDefinition,
} from "@spin-spot/models";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export async function getTournamentMatches() {
  const res = await api.get("/tournament-matches");
  const tournamentMatches: ITournamentMatch[] = await res.json();
  return tournamentMatches;
}

export function useTournamentMatches() {
  return useQuery({
    queryKey: ["getTournamentMatches"],
    queryFn: getTournamentMatches,
  });
}

export async function getTournamentMatch(
  _id: TGetTournamentMatchParamsDefinition["_id"],
) {
  const res = await api.get(
    `/tournament-matches/${encodeURIComponent(`${_id}`)}`,
  );
  const tournamentMatch: ITournamentMatch = await res.json();
  return tournamentMatch;
}

export function useTournamentMatch(
  _id: TGetTournamentMatchParamsDefinition["_id"],
) {
  return useQuery({
    queryKey: ["getTournamentMatch", _id],
    queryFn: () => getTournamentMatch(_id),
  });
}
