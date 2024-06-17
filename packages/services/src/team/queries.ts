import { ITeam, TGetTeamParamsDefinition } from "@spin-spot/models";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export async function getTeams() {
  const res = await api.get("/teams");
  const teams: ITeam[] = await res.json();
  return teams;
}

export function useTeams() {
  return useQuery({ queryKey: ["getTeams"], queryFn: getTeams });
}

export async function getTeam(_id: TGetTeamParamsDefinition["_id"]) {
  const res = await api.get(`/teams/${encodeURIComponent(`${_id}`)}`);
  const team: ITeam = await res.json();
  return team;
}

export function useTeam(_id: TGetTeamParamsDefinition["_id"]) {
  return useQuery({
    queryKey: ["getTeam", _id],
    queryFn: () => getTeam(_id),
  });
}
