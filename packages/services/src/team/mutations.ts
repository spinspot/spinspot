import { ITeam, TCreateTeamInputDefinition } from "@spin-spot/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";

export async function createTeam(input: TCreateTeamInputDefinition) {
  const res = await api.post("/teams", { body: input });
  const team: ITeam = await res.json();
  return team;
}

export function useCreateTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createTeam"],
    mutationFn: createTeam,

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["getTeams"] });
    },
  });
}

export async function updateTeam({
  _id,
  ...input
}: {
  _id: string;
} & TCreateTeamInputDefinition) {
  const res = await api.put("/teams/" + encodeURIComponent(`${_id}`), {
    body: input,
  });
  const team: ITeam = await res.json();
  return team;
}

export function useUpdateTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateTeam"],
    mutationFn: updateTeam,
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["getTeams"] });
      queryClient.invalidateQueries({ queryKey: ["getTeam", data._id] });
    },
  });
}
